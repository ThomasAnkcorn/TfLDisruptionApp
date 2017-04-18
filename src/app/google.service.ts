import { Injectable } from '@angular/core';

import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleService {

  BASEURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  Key = '&key=AIzaSyDAXOkRTBYTZWK_lM1BUclDbGn1BqFUj7c'

  constructor(private http:Http) { }

  getLatLong(place:string):Observable<string>{
    return this.http.get(this.BASEURL+place+this.Key)
            .map(this.extractData)
            .catch(this.handleError)
    
  }
  private extractData(res: Response) {
    let body = res.json();
    let location = body.results[0].geometry.location.lat+'%2C%'+body.results[0].geometry.location.lng
    return location
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}