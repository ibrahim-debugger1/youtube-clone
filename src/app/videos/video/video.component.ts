import { Component, Input } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { videoInfo } from '../../types/videoInfo';
import { viewCount } from '../../types/viewCount';
import { thumbNailUrl } from '../../types/thumbNailUrl';
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
  constructor(public sharedDataService: SharedDataService,private router: Router) {}
  ngOnInit() {

    // this.video.embedHtml = this.video.embedHtml.replace('\\', '');
    this.numberOfViewers = parseInt(this.video.viewCount,10);
    this.timePassedFromPublishedTime(this.video.publishedAt);
  }

  timePassedFromPublishedTime(publishedTime: string) {
    let timestamp = new Date(publishedTime);
    let currentTime = new Date();

    const timeDifference = currentTime.getTime() - timestamp.getTime();

    const secondsDifference = Math.floor(timeDifference / 1000);
    const days = Math.floor(secondsDifference / (60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    const hours = Math.floor((secondsDifference % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((secondsDifference % (60 * 60)) / 60);
    const seconds = secondsDifference % 60;
    if (years) {
      this.passedTime = `${years} years ago`;
    } else if (months) {
      this.passedTime = `${months} months ago`;
    } else if (days) {
      this.passedTime = `${days} days ago`;
    } else if (hours) {
      this.passedTime = `${hours} hours ago`;
    } else if (minutes) {
      this.passedTime = `${minutes} minutes ago`;
    } else {
      this.passedTime = `${seconds} seconds ago`;
    }
  }

  openIframe(){
    this.router.navigate(['/frame'], { queryParams: { url: this.video.embedHtml } });
  }
}
