import { Observable, of } from 'rxjs';

export function mockSharedDataService(): any {
  return {
    searchFilter: {
      next: jasmine.createSpy('next')
    },
    searchFilters$: {
      asObservable: jasmine.createSpy('asObservable').and.returnValue(of(null))
    },
    key: 'mocked-key',
    endpoint: 'mocked-endpoint',
    randomVideos: 'mocked-random-videos-url',
    videoViewersCount: 'mocked-video-viewers-url',
    channelThumbNail: 'mocked-channel-thumbnail-url',
    getRandomVideos: jasmine.createSpy('getRandomVideos').and.returnValue(of([])),
    getVideoViewers: jasmine.createSpy('getVideoViewers').and.returnValue(of([])),
    getChanelThumbNail: jasmine.createSpy('getChanelThumbNail').and.returnValue(of(null)),
    getSearchedVideosAndSendData: jasmine.createSpy('getSearchedVideosAndSendData'),
    getSearchedVideos: jasmine.createSpy('getSearchedVideos').and.returnValue(of([]))
  };
}
