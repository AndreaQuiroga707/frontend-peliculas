import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, MoviesResponse } from '../interfaces/movies.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private serverURL:string='https://api.themoviedb.org/3';
  private moviePage=1;

  constructor(private http:HttpClient) { }

  get params(){
    return{
      api_key:'e7db8543da2cfb00f19a21693e073baa',
      language:'es-ES',
      page:this.moviePage.toString()
    }
  }

  getMovies():Observable<Movie[]>{
    return this.http.get<MoviesResponse>(`${this.serverURL}/movie/now_playing`,{params:this.params}).pipe(
      map((res)=>res.results)
    );
  }
}
