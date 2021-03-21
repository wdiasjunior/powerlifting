import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiProvider {
  // http://localhost:
  //  192.168.1.8
  // url = 'http://localhost:3000/';
  // url = 'http://192.168.1.8:3000/';
  url = '/assets/db/';

  constructor(public http: HttpClient,) {

  }

  get(fileName: any){
    return this.http
      .get(this.url + fileName + '.json')
      .pipe(
        map((res: any) => {
          console.log(res.program);
          return res.program;
        }),
      );
  }

}
