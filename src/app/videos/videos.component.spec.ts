import { Location } from '@angular/common';
import { VideosComponent } from './videos.component';
import { SharedDataService } from '../shared-data.service';
import { mockSharedDataService } from '../shared-data.service.mock';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { videoInfo } from '../types/videoInfo';
import { viewCount } from '../types/viewCount';
import { thumbNailUrl } from '../types/thumbNailUrl';

describe('VideosComponent', () => {
  let component: VideosComponent;
  let sharedDataServiceMock: SharedDataService;
  let locationMock: Location;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let videoInfoo: videoInfo[];
  let viewCountt: viewCount[];
  let thumbNailUrll: thumbNailUrl[];

  beforeEach(() => {
    sharedDataServiceMock = mockSharedDataService();
    locationMock = jasmine.createSpyObj('Location', ['path']);
    activatedRouteMock = {
      queryParams: of({ word: 'example' }),
    };
    component = new VideosComponent(
      sharedDataServiceMock,
      activatedRouteMock as ActivatedRoute,
      locationMock
    );

    thumbNailUrll = [
      {
        thumbNailUrl: 'https://example.com/image.jpg',
        channelId: '1234',
      },
      {
        thumbNailUrl: 'https://example.com/image1.jpg',
        channelId: '12345',
      },
    ];

    viewCountt = [
      {
        viewCount: '100',
        videoId: '123',
        embedHtml: '<iframe src="https://example.com/embedded-video"></iframe>',
      },
      {
        viewCount: '101',
        videoId: '1234',
        embedHtml:
          '<iframe src="https://example.com/embedded-video1"></iframe>',
      },
    ];

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

  describe('ngOnInit', () => {
    it('should call getRandomVideos if path is empty', () => {
      (locationMock.path as jasmine.Spy).and.returnValue('');

      component.ngOnInit();

      expect(sharedDataServiceMock.getRandomVideos).toHaveBeenCalled();
      expect(sharedDataServiceMock.getSearchedVideos).not.toHaveBeenCalled();
    });

    it('should call getSearchedVideos if path is not empty', () => {
      (locationMock.path as jasmine.Spy).and.returnValue('/some-path');

      component.ngOnInit();

      expect(sharedDataServiceMock.getSearchedVideos).toHaveBeenCalled();
      expect(sharedDataServiceMock.getRandomVideos).not.toHaveBeenCalled();
    });
  });

  describe('getRandomVideos', () => {
    it('should call changeModeAndMergeData with the correct parameters', () => {
      (sharedDataServiceMock.getRandomVideos as jasmine.Spy).and.returnValue(
        of(videoInfoo)
      );

      spyOn(component, 'changeModeAndMergeData');

      component.getRandomVideos();
      expect(component.changeModeAndMergeData).toHaveBeenCalledWith(
        videoInfoo,
        false
      );
    });
  });

  describe('getSearchedVideos', () => {
    it('should call getSearchedVideos and changeModeAndMergeData', () => {
      (sharedDataServiceMock.getSearchedVideos as jasmine.Spy).and.returnValue(
        of(videoInfoo)
      );
      spyOn(component, 'changeModeAndMergeData');

      component.getSearchedVideos();

      expect(sharedDataServiceMock.getSearchedVideos).toHaveBeenCalledWith(
        'example'
      );
      expect(component.changeModeAndMergeData).toHaveBeenCalledWith(
        videoInfoo,
        true
      );
    });
  });

  describe('changeModeAndMergeData', () => {
    it('should set search mode and merge data correctly', () => {
      const testMode = true;
      spyOn(component, 'mergeData');

      component.changeModeAndMergeData(videoInfoo, testMode);

      // Assertions
      expect(component.search).toEqual(testMode);
      expect(component.randomVideos).toEqual(videoInfoo);
      expect(component.mergeData).toHaveBeenCalled();
    });
  });

  describe('mergeData', () => {
    it('should call sharedDataService methods with correct parameters', () => {
      const expectedVideoIds = 'video123,video123,';
      const expectedChannelIds = 'channel123,channel123,';

      (sharedDataServiceMock.getVideoViewers as jasmine.Spy).and.returnValue(
        of(viewCountt)
      );

      (sharedDataServiceMock.getChanelThumbNail as jasmine.Spy).and.returnValue(
        of(thumbNailUrll)
      );
      spyOn(component, 'addCountAndIframe');
      spyOn(component, 'addChannelPic');
      component.randomVideos = videoInfoo;
      component.mergeData();

      expect(sharedDataServiceMock.getVideoViewers).toHaveBeenCalledWith(
        expectedVideoIds
      );
      expect(sharedDataServiceMock.getChanelThumbNail).toHaveBeenCalledWith(
        expectedChannelIds
      );
      expect(component.addCountAndIframe).toHaveBeenCalledWith(viewCountt);
      expect(component.addChannelPic).toHaveBeenCalledWith(thumbNailUrll);
    });
  });

  describe('addCountAndIframe', () => {
    it('should update randomVideos array with count and embedHtml based on provided data', () => {
      component.randomVideos = [
        {
          publishedAt: '2024-02-04T10:00:00Z',
          videoId: '123',
          channelId: 'channel123',
          thumbnailsUrl: 'https://example.com/image.jpg',
          videoTitle: 'Video Title',
          channelTitle: 'Channel Title',
        },
        {
          publishedAt: '2024-02-04T10:00:00Z',
          videoId: '1234',
          channelId: 'channel123',
          thumbnailsUrl: 'https://example.com/image.jpg',
          videoTitle: 'Video Title',
          channelTitle: 'Channel Title',
        },
      ];

      component.addCountAndIframe(viewCountt);

      expect(component.randomVideos).toEqual([
        {
          publishedAt: '2024-02-04T10:00:00Z',
          videoId: '123',
          channelId: 'channel123',
          thumbnailsUrl: 'https://example.com/image.jpg',
          videoTitle: 'Video Title',
          channelTitle: 'Channel Title',
          viewCount: '100',
          embedHtml:
            '<iframe src="https://example.com/embedded-video"></iframe>',
        },
        {
          publishedAt: '2024-02-04T10:00:00Z',
          videoId: '1234',
          channelId: 'channel123',
          thumbnailsUrl: 'https://example.com/image.jpg',
          videoTitle: 'Video Title',
          channelTitle: 'Channel Title',
          viewCount: '101',
          embedHtml:
            '<iframe src="https://example.com/embedded-video1"></iframe>',
        },
      ]);
    });
  });

  describe('addChannelPic', () => {
    it('should add thumbnail to randomVideos', () => {
      component.randomVideos = [
        {
          publishedAt: '2024-02-04T10:00:00Z',
          videoId: '1234',
          channelId: '1234',
          thumbnailsUrl: 'https://example.com/image.jpg',
          videoTitle: 'Video Title',
          channelTitle: 'Channel Title',
        },
        {
          publishedAt: '2024-02-04T10:00:00Z',
          videoId: '12345',
          channelId: '12345',
          thumbnailsUrl: 'https://example.com/image.jpg',
          videoTitle: 'Video Title',
          channelTitle: 'Channel Title',
        },
      ];

      component.addChannelPic(thumbNailUrll);

      expect(component.randomVideos).toEqual([
        {
          publishedAt: '2024-02-04T10:00:00Z',
          videoId: '1234',
          channelId: '1234',
          thumbnailsUrl: 'https://example.com/image.jpg',
          videoTitle: 'Video Title',
          channelTitle: 'Channel Title',
          channelPic: 'https://example.com/image.jpg',
        },
        {
          publishedAt: '2024-02-04T10:00:00Z',
          videoId: '12345',
          channelId: '12345',
          thumbnailsUrl: 'https://example.com/image.jpg',
          videoTitle: 'Video Title',
          channelTitle: 'Channel Title',
          channelPic: 'https://example.com/image1.jpg',
        },
      ]);
    });
  });
});
