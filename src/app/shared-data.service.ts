import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { videoInfo } from './types/videoInfo';
import { viewCount } from './types/viewCount';
import { thumbNailUrl } from './types/thumbNailUrl';

import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  searchFilter = new Subject<{
    searchInfo: Observable<any>;
  }>();
  searchFilters$ = this.searchFilter.asObservable();
  key = environment.key;
  endpoint = environment.endpoint;
  randomVideos = `${this.endpoint}/search?key=${this.key}&part=snippet&maxResults=20`;
  videoViewersCount = `${this.endpoint}/videos?key=${this.key}&part=statistics,snippet,player&id=`;
  channelThumbNail = `${this.endpoint}/channels?key=${this.key}&part=snippet&id=`;
  constructor(public http: HttpClient) {}

  /**
   * Represents a service method to fetch random videos from a youtube API.
   *
   * @returns {Observable<videoInfo[]>} An observable of video information.
   *
   **/
  getRandomVideos(): Observable<videoInfo[]> {
    return this.http.get<videoInfo[]>(`${this.randomVideos}`).pipe(
      map((data: any) => {
        return data['items'].map((video: any) => ({
          publishedAt: video.snippet.publishedAt,
          videoId: video.id.videoId,
          channelId: video.snippet.channelId,
          thumbnailsUrl: video.snippet.thumbnails.high.url,
          videoTitle: video.snippet.title,
          channelTitle: video.snippet.channelTitle,
        }));
      })
    );
  }

  /**
   * Fetches information about number of viewers of a certain video.
   *
   * @param {string} videoId - The ID of the video or videos that i want to know the number of viewers on them .
   *
   * @returns {Observable<viewCount[]>} An observable of viewer count information and videoId and iframe for that video.
   **/
  getVideoViewers(videoId: string): Observable<viewCount[]> {
    return this.http.get<viewCount>(`${this.videoViewersCount}${videoId}`).pipe(
      map((data: any) =>
        data['items'].map((info: any) => ({
          viewCount: info.statistics.viewCount,
          videoId: info.id,
          embedHtml: info.player.embedHtml,
        }))
      )
    );
  }

  /**
   * Fetches the thumbnail URL for a specific YouTube channel.
   *
   * @param {string} channelId - The ID of the YouTube channel for which the thumbnail URL is requested.
   *
   * @returns {Observable<thumbNailUrl>} An observable of the channel's thumbnail url and the channelId.
   **/
  getChanelThumbNail(channelId: string): Observable<thumbNailUrl[]> {
    return this.http
      .get<thumbNailUrl>(`${this.channelThumbNail}${channelId}`)
      .pipe(
        map((data: any) =>
          data['items'].map((info: any) => ({
            thumbNailUrl: info.snippet.thumbnails.high.url,
            channelId: info.id,
          }))
        )
      );
  }

  /**
   * Performs a search for videos based on a given search word and sends the search information using an Observable.
   *
   * @param {string} searchWord - The search term used to find videos.
   *
   * @returns {void} This function does not return a value directly. It sends the search information using an Observable.
   **/
  getSearchedVideosAndSendData(searchWord: string) {
    const searchInfo = this.getSearchedVideos(searchWord);
    this.searchFilter.next({ searchInfo });
  }

  /**
   * Retrieves information about videos based on a provided search term.
   *
   * @param {string} searchWord - The search term used to find videos.
   *
   * @returns {Observable<videoInfo[]>} An observable of video information based on the search term.
   **/
  getSearchedVideos(searchWord: string) {
    const searchUrl = `${this.randomVideos}&q=${searchWord}`;
    const searchInfo = this.http.get<videoInfo[]>(`${searchUrl}`).pipe(
      map((data: any) => {
        return data['items'].map((video: any) => ({
          publishedAt: video.snippet.publishedAt,
          videoId: video.id.videoId,
          channelId: video.snippet.channelId,
          thumbnailsUrl: video.snippet.thumbnails.high.url,
          videoTitle: video.snippet.title,
          channelTitle: video.snippet.channelTitle,
        }));
      })
    );
    return searchInfo;
  }
}
