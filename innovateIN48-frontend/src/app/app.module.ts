import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  RufAppCanvasModule,
  RufLayoutModule,
  RufBannerModule,
  RufFooterModule,
  RufIconModule,
  RufMenubarModule,
  RufNavbarModule,
  RufPageHeaderModule
} from '@ruf/shell';

import { DemoAppComponent } from './demo-app.component';
import { NavBarComponent } from './nav/nav-bar.component';

@NgModule({
  declarations: [
    DemoAppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FlexLayoutModule,
    RufAppCanvasModule,
    RufLayoutModule,
    RufBannerModule,
    RufFooterModule,
    RufIconModule,
    RufMenubarModule,
    RufNavbarModule,
    RufPageHeaderModule
  ],
  providers: [],
  bootstrap: [DemoAppComponent]
})
export class AppModule { }
