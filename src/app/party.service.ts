import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Participants } from './interfaces/participants';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  participantsUrl = environment.apiUrl + 'Function1';
  participant$ = new BehaviorSubject<Participants>(undefined);

  constructor(
    private http: HttpClient
  ) { }

  getParticipants(): Observable<Participants[]> {
    return this.http.get<any>((this.participantsUrl))
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getParticipant(id: string): Observable<Participants> {
    return this.http.get<any>((this.participantsUrl + '?id=' + id))
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  errorHandl(error: any): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error;
    }
    return throwError(errorMessage);
  }
}
