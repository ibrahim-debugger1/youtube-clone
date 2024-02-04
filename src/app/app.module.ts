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
import { FrameComponent } from './frame/frame.component';
import { RouterModule, Routes } from '@angular/router';
import { DateDifferencePipe } from './date-difference.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    VideoComponent,
    VideosComponent,
    NumberFormatPipe,
    FrameComponent,
    DateDifferencePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
