import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchCallService } from '../services/search-call.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as filestack from 'filestack-js';
var apikey = environment.api_key;
const client = filestack.init(apikey);
declare var jQuery: any;
@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css'],
  providers: [SearchCallService]
})
export class SearchImageComponent implements OnInit {

  query = 'car';
  @ViewChild('myModal') myModal;
  results = [];
  uploadResults;
  UploadedValues = [];


  constructor(private imageService: SearchCallService, private http: Http) { }

  ngOnInit() {
    this.search();

  }
  search() {

    this.imageService.search(this.query, 1).subscribe(resp => {
      this.results = resp.results;
      this.results.forEach(element => {
        element.upload=false;
        
      });
    });
  }

  upload(img) {
    client.storeURL(img.urls.thumb)
      .then(res => {
        if(res['url']){
          this.UploadedValues.push(res['url']);
          img.upload=true;
        }
      })
      .catch(err => {
        console.log(err)
      });
  }


}
