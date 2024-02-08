import { mockSharedDataService } from 'src/app/shared-data.service.mock';
import { SharedDataService } from 'src/app/shared-data.service';
import { ActivatedRoute } from '@angular/router';
import { FrameComponent } from './frame.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('FrameComponent', () => {
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;
  let component: FrameComponent;

  beforeEach(() => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
    sanitizerSpy = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustHtml',
    ]);
    component = new FrameComponent(activatedRouteSpy, sanitizerSpy);
  });

  describe('ngOnInit', () => {
    it('should call getSafeHtmlIframe method when query parameters change', () => {
      activatedRouteSpy.queryParams = of({});

      spyOn(component, 'getSafeHtmlIframe');
      component.ngOnInit();

      expect(component.getSafeHtmlIframe).toHaveBeenCalled();
    });
  });

  describe('getSafeHtmlIframe', () => {
    let mockState: any;
    beforeEach(() => {
      mockState = { data: '<iframe src="http://example.com"></iframe>' };
      spyOnProperty(history, 'state').and.returnValue(mockState);

      spyOn(component, 'getSanitizedHtml').and.returnValue(
        '<p>Sanitized HTML</p>'
      );
    });

    it('should set data and iframeTag correctly from history.state', () => {
      component.getSafeHtmlIframe();

      expect(component.data).toBe(mockState.data);
      expect(component.iframeTag).toBe('<p>Sanitized HTML</p>');
    });
  });

  describe('getSanitizedHtml', () => {
    let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

    beforeEach(() => {
      sanitizerSpy = jasmine.createSpyObj('DomSanitizer', [
        'bypassSecurityTrustHtml',
      ]);
      component.sanitizer = sanitizerSpy;
    });

    it('should sanitize and return updated HTML with width and height attributes', () => {
      component.data =
        '<iframe width="500" height="500" src="http://example.com"></iframe>';

      const expectedWidth = '900px';
      const expectedHeight = '600px';
      const expectedSanitizedHtml: SafeHtml = 'sanitized HTML';

      sanitizerSpy.bypassSecurityTrustHtml.and.returnValue(
        expectedSanitizedHtml
      );

      const sanitizedHtml = component.getSanitizedHtml();

      expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(
        `<iframe width="${expectedWidth}" height="${expectedHeight}" src="http://example.com"></iframe>`
      );

      expect(sanitizedHtml).toBe(expectedSanitizedHtml);
    });
  });
});
