import { Component, Input } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { videoInfo } from '../../types/videoInfo';
import { Router } from '@angular/router';

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
    this.router.navigate(['/frame'], {
      queryParams: { url: this.video.embedHtml },
    });
  }
}
