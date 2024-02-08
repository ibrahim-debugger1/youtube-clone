import { VideoComponent } from './video.component';
import { mockSharedDataService } from 'src/app/shared-data.service.mock';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SharedDataService } from 'src/app/shared-data.service';
import { Router } from '@angular/router';
import { videoInfo } from 'src/app/types/videoInfo';

describe('VideoComponent', () => {
  let sharedDataServiceMock: SharedDataService;
  let route: Router;
  let component: VideoComponent;
  let videoInfoo: videoInfo;

  beforeEach(() => {
    sharedDataServiceMock = mockSharedDataService();
    component = new VideoComponent(sharedDataServiceMock, route);
    videoInfoo = {
      publishedAt: '2024-02-04T10:00:00Z',
      videoId: 'video123',
      channelId: 'channel123',
      thumbnailsUrl: 'https://example.com/image.jpg',
      videoTitle: 'Video Title',
      channelTitle: 'Channel Title',
      viewCount: '100',
      channelPic: 'https://example.com/image.jpg',
      embedHtml: '<iframe src="https://example.com/embedded-video"></iframe>',
    };
  });

  describe('ngOnInit', () => {
    it('should parse the viewCount and assign it to numberOfViewers', () => {
      component.video = videoInfoo;

      component.ngOnInit();

      expect(component.numberOfViewers).toBe(100);
    });

    it('should handle empty viewCount by assigning 0 to numberOfViewers', () => {
      videoInfoo.viewCount = '';
      component.video = videoInfoo;

      component.ngOnInit();

      expect(component.numberOfViewers).toBe(0);
    });

    it('should handle invalid viewCount by assigning 0 to numberOfViewers', () => {
      videoInfoo.viewCount = 'abs';
      component.video = videoInfoo;

      component.ngOnInit();

      expect(component.numberOfViewers).toBe(0);
    });
  });

  describe('openIframe', () => {
    let routerSpy: Router;

    beforeEach(() => {
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);
      component.router = routerSpy;
      component.video = videoInfoo;
    });

    it('should navigate to /frame with proper state and queryParams', () => {
      const expectedDataToSend = component.video.embedHtml;
      const expectedNavigationExtras = {
        state: {
          data: expectedDataToSend,
        },
        queryParams: { id: component.video.videoId },
      };

      component.openIframe();

      expect(routerSpy.navigate).toHaveBeenCalledWith(
        ['/frame'],
        expectedNavigationExtras
      );
    });
  });
});
