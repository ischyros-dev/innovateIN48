import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerService } from '../controller/controller.service';
import { AppUser } from '../model/user.model';

@Component({
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss']
})
export class AccountCreationComponent {
  newUser: AppUser
  isDirty: boolean = true

  constructor(
    private router: Router,
    private conServ: ControllerService
  ) { }

  createAccount(formValues) {
    this.conServ.createAccount(formValues).subscribe(() => {
      this.isDirty = false
      this.router.navigate(['/login'])
    })
  }

  cancel() {
    this.router.navigate(['/login'])
  }

}

export function checkDirtyState(component: AccountCreationComponent) {
  if(component.isDirty) {
    return window.confirm('You have unsaved data. Do you really want to cancel?')
  }
  return true
}
