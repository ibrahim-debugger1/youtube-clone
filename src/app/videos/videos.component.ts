import { Component, Input } from '@angular/core';
import { videoInfo } from '../types/videoInfo';
import { SharedDataService } from '../shared-data.service';
import { viewCount } from '../types/viewCount';
import { thumbNailUrl } from '../types/thumbNailUrl';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent {
  randomVideos: videoInfo[] = [];
  search: boolean = false;
  constructor(private sharedDataService: SharedDataService) {}

  /**
   * get the data from the service and merge them all in randomVideos variable
   * and the data type is videoInfo[] and the data depends on random or searchedWord
   *
   * @returns {void} This function does not return a value directly.
   **/
  ngOnInit() {
    this.sharedDataService.getRandomVideos().subscribe((data) => {
      this.search = false;
      this.randomVideos = data;
      this.mergeData();
    });

    this.sharedDataService.searchFilters$.subscribe(({ searchInfo }) => {
      searchInfo.subscribe((data) => {
        this.search = true;
        this.randomVideos = data;
        this.mergeData();
      });
    });
  }

  /**
   * get all needed data and set it in the randomVideo array
   *
   * @returns {void} This function does not return a value directly.
   **/
  mergeData() {
    let listOfVideoIds = '';
    let listOfChannelIds = '';

    for (const video of this.randomVideos) {
      listOfVideoIds += video.videoId + ',';
      listOfChannelIds += video.channelId + ',';
    }

    this.sharedDataService
      .getVideoViewers(listOfVideoIds)
      .subscribe((data: any) => {
        this.randomVideos = this.randomVideos.map((video) => {
          const viewInfo = data.find(
            (data: viewCount) => data.videoId === video.videoId
          );
          return {
            ...video,
            viewCount: viewInfo ? viewInfo.viewCount : 0,
            embedHtml: viewInfo ? viewInfo.embedHtml : '',
          };
        });
      });

    this.sharedDataService
      .getChanelThumbNail(listOfChannelIds)
      .subscribe((data: any) => {
        this.randomVideos = this.randomVideos.map((video) => {
          const viewInfo = data.find(
            (data: thumbNailUrl) => data.channelId === video.channelId
          );
          return {
            ...video,
            channelPic: viewInfo ? viewInfo.thumbNailUrl : '',
          };
        });
      });
  }
}
