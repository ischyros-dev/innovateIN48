import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerService } from '../controller/controller.service';
import { Transaction } from '../model/transaction.model';

@Component({
  templateUrl: './transfer.component.html',
  styles: [`  
  em {
      float: right; 
      color: #E05C65; 
      padding-left: 10px;
  }
  
  label {
      font-weight: bold;
  }
    
  .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
  }`]
})

export class TransferComponent {
  transferTrans: Transaction

  constructor(
    private router: Router,
    private conServ: ControllerService
  ) { }

  transfer(formValues) {
    this.conServ.transfer(formValues).subscribe(() => {
      this.router.navigate(['/dashboard'])
    })
  }

  cancel() {
    this.router.navigate(['/dashboard'])
  }

}
