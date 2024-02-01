import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private sharedDataService: SharedDataService,
    private location: Location,
    private router:Router
  ) {}
  ngOnInit() {}
  inputData: string = '';
  logo: string = '/assets/images/youtube-logo.jpg';
  bars: string = '/assets/images/bars-solid.svg';
  search: string = '/assets/images/magnifying-glass-solid.svg';
  video: string = '/assets/images/video-solid.svg';
  grid: string = '/assets/images/sort.png';
  bell: string = '/assets/images/bell-solid.svg';

  searchVidoes() {
    if (this.inputData != '') {
      this.sharedDataService.getSearchedVideos(this.inputData);
    }
  }
  Home() {
    this.location.go('/');
    window.location.reload();
  }
}
