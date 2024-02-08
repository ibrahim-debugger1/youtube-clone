import { HeaderComponent } from './header.component';
import { mockSharedDataService } from 'src/app/shared-data.service.mock';
import { SharedDataService } from 'src/app/shared-data.service';
import { Route, Router } from '@angular/router';
import { videoInfo } from 'src/app/types/videoInfo';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { debounceTime, of, share } from 'rxjs';
import { viewCount } from '../types/viewCount';

describe('HeaderComponent', () => {
  let sharedDataServiceMock: SharedDataService;
  let route: Router;
  let component: HeaderComponent;
  let videoInfoo: videoInfo[];
  let locationMock: Location;
  let viewCountt: viewCount[];

  beforeEach(() => {
    locationMock = jasmine.createSpyObj('Location', ['back']);
    sharedDataServiceMock = mockSharedDataService();
    component = new HeaderComponent(sharedDataServiceMock, locationMock, route);
    component.searchControl = new FormControl();

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
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'onSearch');
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date());
    });
    afterEach(() => {
      jasmine.clock().uninstall();
    });
    it('should initialize hideList to false and set up valueChanges subscription', () => {
      component.ngOnInit();

      expect(component.hideList).toBeFalse();
      expect(component.searchControl.valueChanges).toBeTruthy();
      expect(component.onSearch).not.toHaveBeenCalled();
    });

    it('should call onSearch method after debounce time', () => {
      component.ngOnInit();

      component.searchControl.setValue('test');
      jasmine.clock().tick(500);

      expect(component.onSearch).toHaveBeenCalled();
    });

    it('should NOT call onSearch method before debounce time', () => {
      component.ngOnInit();

      component.searchControl.setValue('test');
      jasmine.clock().tick(499);

      expect(component.onSearch).not.toHaveBeenCalled();
    });
  });

  describe('onSearch', () => {
    beforeEach(() => {
      component.searchQuery = 'test';
    });

    it('should set hideList to false and call getSearchedVideos when searchQuery is not empty', () => {
      component.searchQuery = 'test';

      (sharedDataServiceMock.getSearchedVideos as jasmine.Spy).and.returnValue(
        of(videoInfoo)
      );
      spyOn(component, 'fillSuggestionList');

      component.onSearch();

      expect(component.hideList).toBeFalse();
      expect(sharedDataServiceMock.getSearchedVideos).toHaveBeenCalledWith(
        'test'
      );
      expect(component.fillSuggestionList).toHaveBeenCalledWith(videoInfoo);
    });

    it('should set hideList to true when searchQuery is empty', () => {
      component.searchQuery = '';

      component.onSearch();

      expect(component.hideList).toBeTrue();
      expect(sharedDataServiceMock.getSearchedVideos).not.toHaveBeenCalled();
    });
  });

  describe('fillSuggestionList', () => {
    it('should fill searchedData with all items when provided data has less than 5 items', () => {
      component.fillSuggestionList(videoInfoo);

      expect(component.searchedData.length).toBe(videoInfoo.length);

      for (let i = 0; i < videoInfoo.length; i++) {
        expect(component.searchedData[i]).toEqual(videoInfoo[i]);
      }
    });
  });

  describe('searchVideos', () => {
    let routerSpy: Router;

    beforeEach(() => {
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);
      component.router = routerSpy;
    });

    it('should set hideList to true and navigate to /search with query parameter when searchQuery is not empty', () => {
      component.searchQuery = 'test';

      component.searchVideos();

      expect(component.hideList).toBeTrue();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/search'], {
        queryParams: { word: 'test' },
      });
    });

    it('should not navigate when searchQuery is empty', () => {
      component.searchQuery = '';

      component.searchVideos();

      expect(component.hideList).toBeTrue();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Home', () => {
    let routerSpy: Router;

    beforeEach(() => {
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);
      component.router = routerSpy;
    });
    it('should set hideList to true, navigate to home, and reload window', () => {
      component.Home();

      expect(component.hideList).toBeTrue();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
    });
  });

  describe('iframe', () => {
    it('should set hideList to false and call sharedDataService.getVideoViewers with correct videoId', () => {
      const videoId = 'testVideoId';

      (sharedDataServiceMock.getVideoViewers as jasmine.Spy).and.returnValue(
        of(viewCountt)
      );
      spyOn(component, 'openIframe');

      component.iframe(videoId);

      expect(component.hideList).toBeFalse(); // hideList should be set to false
      expect(sharedDataServiceMock.getVideoViewers).toHaveBeenCalledWith(
        videoId
      );
      expect(component.openIframe).toHaveBeenCalledWith(viewCountt, videoId);
    });
  });

  describe('openIframe', () => {
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);
      component.router = routerSpy;
    });
    it('should set hideList to true and navigate to frame with proper state and queryParams', () => {
      const mockData: viewCount[] = [
        { embedHtml: '<iframe src="example.com"></iframe>' },
      ];
      const videoId = 'testVideoId';

      component.openIframe(mockData, videoId);

      expect(component.hideList).toBeTrue();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['frame'], {
        state: { data: mockData[0].embedHtml },
        queryParams: { id: videoId },
      });
    });
  });
});
