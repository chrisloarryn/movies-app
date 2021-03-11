import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';

import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alerts/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('agilesoft', Validators.required),
    password: new FormControl('agile1234', Validators.required),
  });

  constructor(
    private api: ApiService,
    private alerts: AlertService,
    private router: Router
  ) {}

  errorStatus: boolean = false;
  errorMsj: any = '';

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
    }
    if (localStorage.getItem('refresh_token')) {
      this.router.navigate['dashboard'];
    }
  }

  onLogin(form: LoginI) {
    this.api.loginByEmail(form).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        data &&
          localStorage.setItem('token', `${dataResponse.data.payload.token}`);
        if (dataResponse.data.payload.refresh_token) {
          localStorage.setItem(
            'refresh_token',
            dataResponse.data.payload.refresh_token
          );
        }
        if (dataResponse) {
          if (dataResponse.data.payload.token) {
            this.alerts.showSuccess('Sesion Iniciada', 'OK');
            this.router.navigate(['/dashboard']);
          }
        }
      },
      (error) => {
        if (error) {
          const {
            error: { message },
          } = error;
          this.errorStatus = true;
          this.errorMsj = message;
          if (message) this.alerts.showError(message, 'Error');
        }
      }
    );
  }
}
