import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class graphql {

  private URI = "http://localhost:8080/graphql";

  constructor(private httpClient: HttpClient) { }


  public sendGetRequestByID(id: number){
    // Add safe, URL encoded_page parameter
    return this.httpClient.get(`${this.URI}/${id}`).pipe(retry(3), catchError(this.handleError));
  }
  public sendGetRequest(){
    return this.httpClient.get(this.URI).pipe(retry(3), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
