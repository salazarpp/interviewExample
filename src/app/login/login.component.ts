import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.authService.getData()) {
      this.router.navigate(['home']);
    }
  }

  login(): void {
    this.authService.startLogin();
    if (!this.authService.loggedIn) {
      this.authService.login();
    }
  }

}
