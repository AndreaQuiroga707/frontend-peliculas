import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  movie:Movie[]=[];
  movieSlideShow:Movie[]=[];

  constructor(private moviesSvc:MoviesService){}

  ngOnInit(): void {
    this.moviesSvc.getMovies().subscribe(movies=>{
      //console.log(movies);
      this.movieSlideShow=movies;
      this.movie=movies;
    });
  }
}