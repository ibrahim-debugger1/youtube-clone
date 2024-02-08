import { SharedDataService } from './shared-data.service';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { videoInfo } from './types/videoInfo';

describe('SharedDataService', () => {
  let service: SharedDataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let videoInfoo: videoInfo[];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SharedDataService(httpClientSpy as any);
    videoInfoo = [
      {
        publishedAt: '2024-02-04T10:00:00Z',
        videoId: 'video123',
        channelId: 'channel123',
        thumbnailsUrl: 'https://example.com/image.jpg',
        videoTitle: 'Video Title',
        channelTitle: 'Channel Title',
        viewCount: '100',
        channelPic: 'https://example.com/image.jpg',
        embedHtml: '<iframe src="https://example.com/embedded-video"></iframe>',
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRandomVideos', () => {
    it('should return random videos', () => {
      const mockResponse = {
        items: [
          {
            snippet: {
              publishedAt: '2024-02-04T10:00:00Z',
              thumbnails: { high: { url: 'https://example.com/image.jpg' } },
              title: 'Video Title',
              channelId: 'channel123',
              channelTitle: 'Channel Title',
            },
            id: { videoId: 'video123' },
          },
        ],
      };

      httpClientSpy.get.and.returnValue(of(mockResponse));

      service.getRandomVideos().subscribe((videos) => {
        expect(videos.length).toBe(1);
        expect(videos[0].publishedAt).toBe('2024-02-04T10:00:00Z');
        expect(videos[0].videoId).toBe('video123');
        expect(videos[0].channelId).toBe('channel123');
        expect(videos[0].thumbnailsUrl).toBe('https://example.com/image.jpg');
        expect(videos[0].videoTitle).toBe('Video Title');
        expect(videos[0].channelTitle).toBe('Channel Title');
      });
    });
  });

  describe('getVideoViewers', () => {
    it('should return video viewers and Iframe', () => {
      const videoId = 'video123';
      const mockResponse = {
        items: [
          {
            statistics: { viewCount: '100' },
            id: 'video123',
            player: {
              embedHtml:
                '<iframe src="https://example.com/embedded-video"></iframe>',
            },
          },
        ],
      };

      httpClientSpy.get.and.returnValue(of(mockResponse));

      service.getVideoViewers(videoId).subscribe((viewers) => {
        expect(viewers.length).toBe(1);
        expect(viewers[0].viewCount).toBe('100');
        expect(viewers[0].videoId).toBe('video123');
        expect(viewers[0].embedHtml).toBe(
          '<iframe src="https://example.com/embedded-video"></iframe>'
        );
      });

      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe(
        `${service.videoViewersCount}${videoId}`
      );
    });
  });

  describe('getChanelThumbNail', () => {
    it('should return channel thumbnail URL', () => {
      const channelId = 'channel123';
      const mockResponse = {
        items: [
          {
            snippet: {
              thumbnails: {
                high: { url: 'https://example.com/channel-thumbnail.jpg' },
              },
            },
            id: 'channel123',
          },
        ],
      };

      httpClientSpy.get.and.returnValue(of(mockResponse));

      service.getChanelThumbNail(channelId).subscribe((thumbnail) => {
        expect(thumbnail.length).toBe(1);
        expect(thumbnail[0].thumbNailUrl).toBe(
          'https://example.com/channel-thumbnail.jpg'
        );
        expect(thumbnail[0].channelId).toBe('channel123');
      });

      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe(
        `${service.channelThumbNail}${channelId}`
      );
    });
  });

  describe('getSearchedVideosAndSendData', () => {
    it('should send search information through searchFilter', () => {
      const searchWord = 'example';
      const searchInfoMock: Observable<videoInfo[]> = of(videoInfoo);
      let mockGetSearchedVidoes: any;

      mockGetSearchedVidoes = spyOn(service, 'getSearchedVideos');
      mockGetSearchedVidoes.and.returnValue(searchInfoMock);

      service.getSearchedVideosAndSendData(searchWord);

      service.searchFilters$.subscribe(({ searchInfo }) => {
        expect(searchInfo).toBe(searchInfoMock);
      });
    });

    it('should call getSearchedVideos method with the correct parameter', () => {
      const searchWord = 'example';
      spyOn(service, 'getSearchedVideosAndSendData');

      service.getSearchedVideosAndSendData(searchWord);

      expect(service.getSearchedVideosAndSendData).toHaveBeenCalledWith(
        searchWord
      );
    });
  });

  describe('getSearchedVideos', () => {
    it('should fetch searched videos based on search word', () => {
      const searchWord = 'example';
      const mockResponse = {
        items: [
          {
            snippet: {
              publishedAt: '2024-01-01',
              channelId: 'channelId1',
              thumbnails: { high: { url: 'thumbnailUrl1' } },
              title: 'Video Title 1',
              channelTitle: 'Channel Title 1',
            },
            id: { videoId: 'videoId1' },
          },
          {
            snippet: {
              publishedAt: '2024-01-02',
              channelId: 'channelId2',
              thumbnails: { high: { url: 'thumbnailUrl2' } },
              title: 'Video Title 2',
              channelTitle: 'Channel Title 2',
            },
            id: { videoId: 'videoId2' },
          },
        ],
      };

      httpClientSpy.get.and.returnValue(of(mockResponse));

      service.getSearchedVideos(searchWord).subscribe((videos) => {
        expect(videos.length).toBe(2);
        expect(videos[0].publishedAt).toBe('2024-01-01');
        expect(videos[0].videoId).toBe('videoId1');
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service.randomVideos}&q=${searchWord}`
      );
    });
  });
});
