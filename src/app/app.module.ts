import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { VideoComponent } from './videos/video/video.component';
import { SharedDataService } from './shared-data.service';
import { HttpClientModule } from '@angular/common/http';
import { VideosComponent } from './videos/videos.component';
import { NumberFormatPipe } from './number-format.pipe';
import { FormsModule } from '@angular/forms';
import { FrameComponent } from './frame/frame.component';
import { RouterModule,Routes } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    VideoComponent,
    VideosComponent,
    NumberFormatPipe,
    FrameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
