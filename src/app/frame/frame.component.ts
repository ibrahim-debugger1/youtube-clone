import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent {
  data: any;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.data = queryParams['url'];
    });
  }

  getSanitizedHtml(): SafeHtml {
    let width = '900px';
    let height = '600px';
    const updatedIframeContent = this.data
      .replace(/width=".*?"/, `width="${width}"`)
      .replace(/height=".*?"/, `height="${height}"`);
    console.log(updatedIframeContent)
    return this.sanitizer.bypassSecurityTrustHtml(updatedIframeContent);
  }
}
