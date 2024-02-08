import { Component } from '@angular/core';

import { IMAGE_PATHS } from '../image-paths';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  IMAGE_PATHS = IMAGE_PATHS;
  side_btn: (keyof typeof IMAGE_PATHS)[] = [
    'home',
    'trend',
    'subscription',
    'library',
    'history',
    'your_videos',
    'watch_later',
    'like',
    'down_arrow'
  ];
  constructor() {}
}
