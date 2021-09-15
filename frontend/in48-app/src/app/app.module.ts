import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './user/auth.service';
import { LoginComponent } from './user/login.component';
import { AccountCreationComponent } from './user/account-creation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControllerService } from './controller/controller.service';
import { TransferComponent } from './account/transfer.component';
import { DepositComponent } from './account/deposit.component';
import { WithdrawalComponent } from './account/withdrawal.component';
import { BalanceInquiryComponent } from './account/balance-inquiry.component';
import { PageNotFoundComponent } from './errors/page-not-found.component';
import { AuthGuardService } from './user/auth-guard.service';
import { SpeechSenseService } from './shared/speech-sense.service';
import { VoiceRecoginitionService } from './shared/voice-recognition.service';
import { IconsModule } from './shared/icon.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountCreationComponent,
    DashboardComponent,
    TransferComponent,
    DepositComponent,
    WithdrawalComponent,
    BalanceInquiryComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ControllerService,
    VoiceRecoginitionService,
    SpeechSenseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
