import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AuthService } from './user/auth.service';
import { UserLoginComponent } from './user/login.component';
import { appRoutes } from './routes';
import { SenseService } from './shared/sense.service';
import { HomePageComponent } from './home/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    HomePageComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],

  providers: [
    AuthService,
    SenseService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
