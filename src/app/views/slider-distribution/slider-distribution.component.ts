import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PeopleResponse, ResultsEntity } from 'src/app/models/movies';
import { ApiService } from 'src/app/services/api/api.service';
// import {Movies} from '../../models/movies';

@Component({
  selector: 'app-slider-distribution',
  templateUrl: './slider-distribution.component.html',
  styleUrls: ['./slider-distribution.component.css']
})
export class SliderDistributionComponent implements OnInit, AfterViewInit {
   @Input() sliderConfig;
   @Input() movies: PeopleResponse; // Movies;
   @Input() title: string;

  constructor(private api: ApiService, private router: Router) { }

  ngAfterViewInit(): void {
  }

  seeMovieDetails(movie: ResultsEntity): void {
    localStorage.setItem('movie', JSON.stringify(movie))
  }

  ngOnInit(): void {
  }

}
