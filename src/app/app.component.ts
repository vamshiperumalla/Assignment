import { Component } from '@angular/core';

import { CharacterInfo } from './characterInfo.model';
import { Character } from './character.model';
import { MovieService } from './movie.service';
import { Movies } from './movie.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  characterInfo = null;
  movies: any = null;
  error = null;
  loading = false;

  characters: Array<Character> = [
    {
      name: "Luke Skywalker",
      url: "https://swapi.co/api/people/1/"
    },
    {
      name: "C-3PO",
      url: "https://swapi.co/api/people/2/"
    },
    {
      name: "Leia Organa",
      url: "https://swapi.co/api/people/unknown/"
    },
    {
      name: "R2-D2",
      url: "https://swapi.co/api/people/3/"
    }
  ]

  constructor(private movieService: MovieService) {}

  getCharacter(character: Character) {
    console.log('Charatcer', character);

    this.loading = true;

    this.movieService.getInfoByCharacter(character).subscribe((response: CharacterInfo) => {
      console.log('Response', response);

      this.movieService.getMoviesByCharacter(response.films).subscribe((movies: Movies) => {
        console.log('Movies', movies);

        this.loading= false;
        this.error = null;
        this.characterInfo = response;
        this.movies = movies;
      }, error => {
        this.errorHandler(error);
      });
    }, error => {
      console.log('Error', error);

      this.errorHandler(error);
    });
  }

  errorHandler(error) {
    this.loading= false;
    this.characterInfo = null;

    if(error.detail && error.detail === 'Not found')
      this.error = 'No information found about the selected character';
    else 
      this.error = 'Something has gone wrong, please try again';
  }
}