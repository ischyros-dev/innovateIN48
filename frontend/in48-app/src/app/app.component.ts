import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'in48-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
  }
  
}
