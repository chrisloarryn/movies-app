import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ResultsEntity, PeopleResponse } from 'src/app/models/movies';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AlertService } from 'src/app/services/alerts/alertas.service';
// import {Movies} from '../../models/movies';

interface MovieItemI extends ResultsEntity {
  imageBaseUrl: string;
}
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, AfterViewInit, OnDestroy {
  movie: MovieItemI;
  title: string;
  people: PeopleResponse; // Movies;
  sliderConfig = {
    slidesToShow: 20,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
  };
  constructor(
    public api: ApiService,
    private alerts: AlertService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    const reload = localStorage.getItem('reload-movie');
    if (!reload) {
      localStorage.setItem('reload-movie', 'true');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('reload-movie');
  }

  ngOnInit(): void {
    const movie = JSON.parse(localStorage.getItem('movie'));
    const token = localStorage.getItem('token');
    if (!movie || !token) this.router.navigate(['/login']);
    this.title = movie.title;
    this.movie = movie as MovieItemI;
    this.api.getAllDistributions(movie.id).subscribe(
      (data: PeopleResponse) => {
        this.people = data && data;
      },
      (error) => {
        this.alerts.showError(error.message, 'Error');
      }
    );
  }
}
