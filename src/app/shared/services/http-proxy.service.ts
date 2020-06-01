import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_api_url = environment.base_api_url;
@Injectable({
  providedIn: 'root',
})
export class HttpProxyService {
  constructor(private http: HttpClient) {}

  /**
   * Performs a request with `get` http method.
   * @param url the url
   * @param options the request options
   * @returns Observable
   */
  get(url: string, options?): Observable<any> {
    return this.http
      .get(base_api_url + url, this.requestOptions(options))
      .pipe(catchError((err) => this.catchAuthError(err)));
  }

  /**
   * Request options.
   * @param method the method
   * @returns RequestOptionsArgs
   */
  private requestOptions(options) {
    let tmpOptions = options;
    if (!tmpOptions) {
      tmpOptions = {};
    }

    let headers;
    if (tmpOptions.headers) {
      headers = tmpOptions.headers;
    } else {
      headers = new HttpHeaders();
    }

    if (!options || !options.isFile) {
      headers = headers.append('Content-Type', 'application/json');
    }
    tmpOptions.headers = headers;
    return tmpOptions;
  }

  /**
   * catches the auth error
   * @param error the error response
   */
  catchAuthError(error): Observable<Response> {
    // Note: we use alert here just for proof of concept
    // we should have UI service that show nice message
    if (error && error.error && error.error.message) {
      alert(error.error.message);
    } else if (error && error.message) {
      alert(error.message);
    } else {
      alert(JSON.stringify(error));
    }
    return throwError(error);
  }
}
