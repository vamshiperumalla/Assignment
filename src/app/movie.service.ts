import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { Character } from './character.model';
import { CharacterInfo } from './characterInfo.model';
import { Movies } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getInfoByCharacter(character: Character) {
    return this.http.get<CharacterInfo>(character.url).pipe(catchError(this.handleError));
  }

  getMoviesByCharacter(urlArray: Array<string>) {
    let calls = [];

    urlArray.forEach(url => {
      calls.push(this.http.get<Movies>(url));
    });

    return forkJoin(...calls).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(error.error);
    } else {
      return throwError(error.error);
    }
  }
}
