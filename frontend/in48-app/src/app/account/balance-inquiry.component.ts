import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerService } from '../controller/controller.service';

@Component({
  selector: 'balance-inquiry',
  templateUrl: './balance-inquiry.component.html',
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

export class BalanceInquiryComponent {

  constructor(
    private router: Router,
    private conServ: ControllerService
  ) { }

  inquire() {
    this.conServ.balanceInquiry().subscribe(() => {
      this.router.navigate(['/dashboard'])
    })
  }

  cancel() {
    this.router.navigate(['/dashboard'])
  }
  
}
