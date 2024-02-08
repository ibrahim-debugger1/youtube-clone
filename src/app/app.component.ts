import { Component } from '@angular/core';

import { SharedDataService } from './shared-data.service';

import { videoInfo } from './types/videoInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  randomVideo: videoInfo[] = [];
  constructor() {}
  ngOnInit() {}
}
