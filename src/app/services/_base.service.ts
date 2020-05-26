import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';

@Injectable()
export class BaseService<T> {

  public ApiUrl: string;
  protected http: Http;
  public httpClient: HttpClient;

  constructor(@Inject(String) private urlEndPoint: string) {
    this.ApiUrl = environment.ApiUrl;
  }

  create(item: T) {
    try {
      const body = JSON.stringify(item);
      const headerOptions = new Headers({ 'Content-Type': 'application/json' });
      const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
      return this.http.post(this.ApiUrl + this.urlEndPoint, body, requestOptions).map(x => x.json()
        , catchError(this.handleError));

    } catch (error) {
      return Observable.throw(error);
    }
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return this.handleError(errorMessage);
  }

  update(item: T) {
    try {
      const body = JSON.stringify(item);
      console.log(body)
      const headerOptions = new Headers({ 'Content-Type': 'application/json' });
      const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
      return this.http.put(this.ApiUrl + this.urlEndPoint, body, requestOptions).map(res => res.json());
    } catch (error) {
      return this.handleError(error);
    }
  }

  public getById(id: string): Observable<T> {
    return this.http
      .get(this.ApiUrl + this.urlEndPoint + '/getId/' + id)
      .map(res => {
        return res.json();
      });
  }

  public list() {
    return this.http
      .get(this.ApiUrl + this.urlEndPoint)
      .map(res => {
        return res.json();
      });
  }

  public delet(id: string) {
    try {
      const requestOptions = new RequestOptions({ method: RequestMethod.Delete });
      return this.http.delete(this.ApiUrl + this.urlEndPoint + "/" + id, requestOptions).map(res => res.json());
    } catch (error) {
      return this.handleError(error);
    }
  }

}