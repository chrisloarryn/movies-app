import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ResultsEntity } from 'src/app/models/movies';
// import {Movies} from '../../models/movies';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit {
   @Input() sliderConfig;
   @Input() movies: { imageBaseUrl: string, data: ResultsEntity[]}; // Movies;
   @Input() title: string;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
  }

  seeMovieDetails(movie: ResultsEntity): void {
    const imageBaseUrl = this.movies.imageBaseUrl;
    localStorage.setItem('movie', JSON.stringify({ ...movie, imageBaseUrl }));
    this.router.navigate(['/movie', movie.id]);
  }

  ngOnInit(): void {
  }

}
