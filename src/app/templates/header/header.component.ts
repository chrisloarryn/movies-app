import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeI, OmitPasswordMe } from 'src/app/models/me.interface';
import { Movies } from 'src/app/models/movies';
import { ResponseI, ResponseRefreshedI } from 'src/app/models/response.interface';
import { AlertService } from 'src/app/services/alerts/alertas.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  me: MeI
  initials: string
  constructor(private movies: ApiService, private router: Router, private alerts: AlertService) { }

  logout(): void {
    localStorage.clear()
    this.alerts.showSuccess('Sesion cerrada', 'OK')
    this.router.navigate(['/login'])
  }

  getInitials(): string {
    return 'AB'
  }

  ngOnInit(): void {
    this.movies.getMeData().subscribe((data: ResponseI) => {
      this.me = data.data as unknown as MeI
      if (this.me) this.initials = `${this.me.firstName[0]}${this.me.lastName[0]}`
      localStorage.setItem('user', JSON.stringify(data.data))
    }, error => {
      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken && error.message === 'jwt expired') {
        this.alerts.showSuccess('renovada la sesion', 'Actualizacion')
        localStorage.clear()
        return this.router.navigate(['/login'])
      }
      console.log('renewing token', error)
      this.movies.renewToken(refreshToken).subscribe((data: ResponseRefreshedI) => {
        localStorage.removeItem('refresh_token')
        localStorage.setItem('token', data.data.payload.token)
        window.location.reload()
      }, error => {
        localStorage.clear()
        this.router.navigate(['/login'])
        console.log('error renewing', error)
        // redirect to '/'
      })
    })
    //console.log(data)
  }

}
