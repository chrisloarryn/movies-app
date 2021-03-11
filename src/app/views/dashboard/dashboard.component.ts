import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

import { ComposedResponseType, ResultsEntity } from 'src/app/models/movies';
import { AlertService } from 'src/app/services/alerts/alertas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  recent: ComposedResponseType<ResultsEntity>
  popular: any;
  sliderConfig = {
    slidesToShow: 20,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
  };

  constructor(private api: ApiService, private alerts: AlertService) {}

  ngAfterViewInit() {
    const reload = localStorage.getItem('reload');
    if (!reload) {
      localStorage.setItem('reload', 'true');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('reload-movie');
  }

  ngOnInit() {
    this.api.getAllNowPlaying().subscribe(
      (data) => {
        this.recent = data && data;
      },
      (error) => {
        this.alerts.showError(error.message, 'Error');
        // window.location.reload()
      }
    );
    this.api.getAllPopulars().subscribe(
      (data) => {
        this.popular = data && data;
      },
      (error) => {
        this.alerts.showError(error.message, 'Error');
        // window.location.reload()
      }
    );
  }
}
