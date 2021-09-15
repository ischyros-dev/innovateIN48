import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceInquiryComponent } from './account/balance-inquiry.component';
import { DepositComponent } from './account/deposit.component';
import { TransferComponent } from './account/transfer.component';
import { WithdrawalComponent } from './account/withdrawal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './errors/page-not-found.component';
import { AccountCreationComponent } from './user/account-creation.component';
import { AuthGuardService } from './user/auth-guard.service';
import { LoginComponent } from './user/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: AccountCreationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'balance-inquiry', component: BalanceInquiryComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'withdrawal', component: WithdrawalComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '', redirectTo: '/deposit', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
