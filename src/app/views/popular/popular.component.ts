import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ComposedResponseType, ResultsEntity } from 'src/app/models/movies';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
// import {Movies} from '../../models/movies';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
})
export class PopularComponent implements OnInit, AfterViewInit {
  // @Input() sliderConfig;
  @Input() movies: ComposedResponseType<ResultsEntity>;
  @Input() title: string;

  constructor(public api: ApiService, private router: Router) {}

  ngAfterViewInit(): void {}

  seeMovieDetails(movie: ResultsEntity): void {
    const imageBaseUrl = this.movies.imageBaseUrl;
    localStorage.setItem('movie', JSON.stringify({ ...movie, imageBaseUrl }));
    this.router.navigate(['/movie', movie.id]);
  }

  ngOnInit(): void {}
}
