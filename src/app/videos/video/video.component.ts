import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SharedDataService } from '../../shared-data.service';

import { videoInfo } from '../../types/videoInfo';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent {
  test: string = '/assets/images/test.jpg';
  numberOfViewers: number = 0;
  passedTime: string = '';
  @Input() video!: videoInfo;
  @Input() search!: boolean;
  constructor(
    public sharedDataService: SharedDataService,
    private router: Router
  ) {}
  ngOnInit() {
    this.numberOfViewers = parseInt(this.video.viewCount, 10);
  }

  /**
   * open Iframe for a specific video
   *
   * @returns {void} This function does not return a value directly.
   **/
  openIframe() {
    const dataToSend = this.video.embedHtml;

    const navigationExtras = {
      state: {
        data: dataToSend,
      },
      queryParams: { id: this.video.videoId },
    };
    this.router.navigate(['/frame'], navigationExtras);
  }
}
