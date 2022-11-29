import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // express api
  REST_API: string = 'http://localhost:8000/api';

  //header
  httpHeader = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.REST_API}`);
  }

  getDataById(id: any): Observable<any> {
    let api_url = `${this.REST_API}/read-book/${id}`;
    return this.http.get(api_url, { headers: this.httpHeader })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handlerError)
      )
  }

  addData(data: Book): Observable<any> {
    let api_url = `${this.REST_API}/add-book`;
    return this.http.post(api_url, data)
      .pipe(
        catchError(this.handlerError)
      )
  }

  updateData(id: any, data: any): Observable<any> {
    let api_url = `${this.REST_API}/update-book/${id}`;
    return this.http.put(api_url, data, { headers: this.httpHeader })
      .pipe(
        catchError(this.handlerError)
      )
  }

  deleteData(id: any): Observable<any> {
    let api_url = `${this.REST_API}/delete-book/${id}`;
    return this.http.delete(api_url, { headers: this.httpHeader })
      .pipe(
        catchError(this.handlerError)
      )
  }

  handlerError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client error
      errorMessage = error.error.message;
    } else {
      // server error
      errorMessage = `Error: ${error.status}\nMessage:${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
