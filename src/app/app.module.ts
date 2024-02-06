import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { VideoComponent } from './videos/video/video.component';
import { VideosComponent } from './videos/videos.component';
import { FrameComponent } from './frame/frame.component';

import { NumberFormatPipe } from './number-format.pipe';
import { DateDifferencePipe } from './date-difference.pipe';

import { SharedDataService } from './shared-data.service';

import { AppRoutingModule } from './app-routing.module';

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
