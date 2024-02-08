import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { videoInfo } from '../types/videoInfo';
import { viewCount } from '../types/viewCount';
import { thumbNailUrl } from '../types/thumbNailUrl';

import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent {
  randomVideos: videoInfo[] = [];
  search: boolean = false;
  constructor(
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  /**
   * get the data from the service and merge them all in randomVideos variable
   * and the data type is videoInfo[] and the data depends on random or searchedWord
   *
   * @returns {void} This function does not return a value directly.
   **/
  ngOnInit() {
    if (!this.location.path()) {
      this.getRandomVideos();
    } else {
      this.getSearchedVideos();
    }
  }

  getRandomVideos() {
    this.sharedDataService
      .getRandomVideos()
      .subscribe((data) => this.changeModeAndMergeData(data, false));
  }

  getSearchedVideos() {
    this.route.queryParams.subscribe((params) => {
      this.sharedDataService
        .getSearchedVideos(params['word'])
        .subscribe((data) => this.changeModeAndMergeData(data, true));
    });
  }

  changeModeAndMergeData(data: videoInfo[], mode: boolean) {
    this.search = mode;
    this.randomVideos = data;
    this.mergeData();
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
      .subscribe((data: viewCount[]) => this.addCountAndIframe(data));

    this.sharedDataService
      .getChanelThumbNail(listOfChannelIds)
      .subscribe((data: thumbNailUrl[]) => this.addChannelPic(data));
  }

  addCountAndIframe(data: any) {
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
  }

  addChannelPic(data: any) {
    this.randomVideos = this.randomVideos.map((video) => {
      const viewInfo = data.find(
        (data: thumbNailUrl) => data.channelId === video.channelId
      );
      return {
        ...video,
        channelPic: viewInfo ? viewInfo.thumbNailUrl : '',
      };
    });
  }
}
