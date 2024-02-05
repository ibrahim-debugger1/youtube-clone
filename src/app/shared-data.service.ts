import { Injectable } from '@angular/core';
import { Observable, count } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { videoInfo } from './types/videoInfo';
import { map, tap } from 'rxjs/operators';
import { viewCount } from './types/viewCount';
import { thumbNailUrl } from './types/thumbNailUrl';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  searchFilter = new Subject<{
    searchInfo: Observable<any>;
  }>();
  searchFilters$ = this.searchFilter.asObservable();
  key = 'AIzaSyBeF7wF_x5jQ68a8pioJvB3WCNhUihKUc4';
  randomVideos = `https://www.googleapis.com/youtube/v3/search?key=${this.key}&part=snippet&maxResults=20`;
  videoViewersCount = `https://www.googleapis.com/youtube/v3/videos?key=${this.key}&part=statistics,snippet,player&id=`;
  channelThumbNail = `https://www.googleapis.com/youtube/v3/channels?key=${this.key}&part=snippet&id=`;
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
  getChanelThumbNail(channelId: string): Observable<thumbNailUrl> {
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
