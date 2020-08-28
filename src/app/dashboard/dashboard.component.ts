import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.startLogin();
    if (!this.authService.loggedIn) {
      this.authService.login();
    }
    this.userData = this.authService.getData();
  }

}
