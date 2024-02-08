import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrameComponent } from './frame/frame.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  { path: '', component: VideosComponent },
  { path: 'search', component: VideosComponent },
  { path: 'frame', component: FrameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation : 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
