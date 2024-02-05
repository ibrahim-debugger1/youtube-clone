import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Location } from '@angular/common';
import { ImagesService } from '../images.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { videoInfo } from '../types/videoInfo';
import { viewCount } from '../types/viewCount';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  inputData: string = '';
  searchControl = new FormControl();
  searchedData: videoInfo[] = [];
  hideList: boolean = false;
  constructor(
    private sharedDataService: SharedDataService,
    private location: Location,
    public imagesSercive: ImagesService,
    public router: Router
  ) {}

  /**
   * This hook sets the initial state of the 'hideList' flag to false.
   * It also subscribes to changes in the 'searchControl' value with a debounce time of 300 milliseconds,
   * triggering the 'onSearch' method when the value changes.
   *
   * @returns {void} This function does not return a value directly.
   *
   **/
  ngOnInit(): void {
    this.hideList = false;
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.onSearch();
    });
  }

  /**
   * this is for a suggestion list for the user
   * If the input data is not empty, it calls the 'getSearchedVideos' method from the shared data service,
   * retrieves search results, and populates the 'searchedData' array with a maximum of 5 results.
   *
   * @returns {void} This method does not return a value directly.
   **/
  onSearch() {
    if (this.inputData != '') {
      this.hideList = false;
      this.sharedDataService
        .getSearchedVideos(this.inputData)
        .subscribe((data) => {
          this.searchedData = [];
          for (let i = 0; i < 5; i++) {
            this.searchedData.push(data[i]);
          }
        });
    } else {
      this.hideList = true;
    }
  }

  /**
   * hide the suggestion list and If the input data is not empty, it triggers the 'getSearchedVideosAndSendData' method
   * from the shared data service, which performs the search and notifies subscribers.
   *
   * @returns {void} This method does not return a value directly.
   *
   **/
  searchVidoes() {
    this.hideList = true;
    if (this.inputData != '') {
      this.router.navigate([`/search=/${this.inputData}`]);
    }
  }

  /**
   * Navigates to the home page, hides the list, and reloads the page.
   *
   * Sets the 'hideList' flag to true, updates the browser URL to the home page,
   * and triggers a page reload to ensure a fresh state.
   *
   * @returns {void} This method does not return a value directly.
   **/
  Home() {
    this.hideList = true;
    this.location.go('/');
    window.location.reload();
  }

  /**
   * get the Iframe tag from getVideoViewers using the videoId
   *
   * @param {string} videoId - The ID of the video that i want to get the Iframe of.
   *
   * @returns {void} This method does not return a value directly.
   **/
  iframe(videoId: string) {
    this.hideList = false;
    this.sharedDataService
      .getVideoViewers(videoId)
      .subscribe((data: viewCount[]) => {
        this.hideList = true;
        const dataToSend = data[0].embedHtml;
        const navigationExtras = {
          state: {
            data: dataToSend,
          },
        };
        this.router.navigate([`/frame/${videoId}`], navigationExtras);
      });
  }
}
