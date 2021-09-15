import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller/controller.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private conServ: ControllerService) { }

  ngOnInit() {
    this.conServ.goToDashboard()
  }
}
