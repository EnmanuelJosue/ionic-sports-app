import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigTimePageRoutingModule } from './config-time-routing.module';

import { ConfigTimePage } from './config-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigTimePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfigTimePage]
})
export class ConfigTimePageModule {}
