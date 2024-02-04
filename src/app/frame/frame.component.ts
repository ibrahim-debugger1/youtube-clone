import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent {
  data: string = '';

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.data = queryParams['url'];
    });
  }

  /**
   * Sanitizes and updates the HTML content of an iframe with custom width and height values.
   *
   * This function replaces the 'width' and 'height' attributes in the provided HTML content
   * with specified width and height values, ensuring the resulting HTML is safe for rendering.
   *
   * @returns {SafeHtml} A sanitized HTML content wrapped in the SafeHtml type.
   *
   **/
  getSanitizedHtml(): SafeHtml {
    let width = '900px';
    let height = '600px';
    const updatedIframeContent = this.data
      .replace(/width=".*?"/, `width="${width}"`)
      .replace(/height=".*?"/, `height="${height}"`);
    return this.sanitizer.bypassSecurityTrustHtml(updatedIframeContent);
  }
}
