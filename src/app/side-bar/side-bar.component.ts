import { Component } from '@angular/core';
import { ImagesService } from '../images.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  constructor(public imagesService: ImagesService){}
}
