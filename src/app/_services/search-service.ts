import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class SearchService {

  constructor(private http : HttpClient){}

  getSearchResultsForToken(token: string): Observable<any> {
    return this.http.get<any>(`${environment.SERVER_URL}/search/${token}`)
      .pipe(catchError(this.handleError));
  }

  getSearchResultsForVideo(token: string): Observable<any> {
    return this.http.get<any>(`${environment.SERVER_URL}/search/video/${token}`)
      .pipe(catchError(this.handleError));
  }

  getSearchResultsForPlaylist(token: string): Observable<any> {
    return this.http.get<any>(`${environment.SERVER_URL}/search/playlist/${token}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.error.userMessage);
  }
}
