import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthService } from './user/auth.service';
import { UserLoginComponent } from './user/login.component';
import { appRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    AuthService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
