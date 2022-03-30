import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigTimePage } from './config-time.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigTimePageRoutingModule {}
