import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent implements OnInit {
  data: string = '';
  iframeTag: SafeHtml= '';

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  /**
   * It subscribes to route parameters and retrieves data from the route state.
   * The received data is then sanitized and stored in the component property.
   *
   * @returns {void}
   **/
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const state = history.state;
      this.data = state?.data;
      this.iframeTag = this.getSanitizedHtml();
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
