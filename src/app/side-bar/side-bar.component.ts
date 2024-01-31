import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  home:string = "/assets/images/house-solid.svg";
  trend:string = "/assets/images/fire-solid.svg";
  subscription:string = "/assets/images/video-playlist-icon.png";
  library:string = "/assets/images/social_media_collection_youtube_video_media_icon_210475.png";
  history:string = "/assets/images/clock-rotate-left-solid.svg";
  your_videos:string = "/assets/images/tv-solid.svg";
  watch_later:string = "/assets/images/clock-solid.svg";
  like:string = "/assets/images/thumbs-up-regular.svg";
  down_arrow:string = "/assets/images/angle-down-solid.svg";
}
