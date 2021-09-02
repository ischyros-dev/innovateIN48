import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

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

import { RufThemeRollerModule } from '@ruf/theme-roller';

import { DemoAppComponent } from './demo-app.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { AuthService } from './user/auth.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    DemoAppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    RufPageHeaderModule,
    RufThemeRollerModule,
    AppRoutingModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [DemoAppComponent]
})
export class AppModule { }
