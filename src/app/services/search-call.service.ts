import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchCallService {
  private url = 'https://api.unsplash.com';
  private applicationId = environment.applicationId;
  searchEvent: EventEmitter<any> = new EventEmitter();
  page = 1;
  perPage = 20;

  searchResults;
  constructor(private http: Http) {
  }

  search(query: string,page) {
    let url = `${this.url}/search/photos?client_id=${this.applicationId}`;
    url += `&page=${page}&perPage=${this.perPage}&query=${query}`;

    this.searchResults= this.http.get(url)
      .pipe(map(response => response.json()));

      return this.searchResults;
  }

}
