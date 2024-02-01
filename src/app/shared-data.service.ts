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
  key = 'AIzaSyC3mJFDoApAqbWXFpAswpAyB6sjRY0-0E0';
  randomVideos = `https://www.googleapis.com/youtube/v3/search?key=${this.key}&part=snippet&maxResults=20`;
  videoViewersCount = `https://www.googleapis.com/youtube/v3/videos?key=${this.key}&part=statistics,snippet,player&id=`;
  channelThumbNail = `https://www.googleapis.com/youtube/v3/channels?key=${this.key}&part=snippet&id=`;
  constructor(public http: HttpClient) {}

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

  getVideoViewers(videoId: string): Observable<viewCount> {
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
    this.searchFilter.next({ searchInfo });
  }
}
