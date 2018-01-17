import { Component, OnInit, Injectable } from '@angular/core';
import { RequestOptions, Headers, RequestMethod, Http, Response } from '@angular/http';
import { BaseComponent } from '../base-component';

declare var $: any
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
@Injectable()
export class ContentComponent implements OnInit {
  [x: string]: any;
  headers: any;

  public positions: any = [];
  bbb: BaseComponent;
  constructor(private http: Http) { }

  ngOnInit() {
    this.bbb = new BaseComponent();
    let x = this.bbb.getAge('1990-05-16', 'full');
    console.log('birth date',x);
  }

  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array 
  }
  onIdle(event) {
    console.log('map', event.target);
  }
  onMarkerInit(marker) {
    console.log('marker', marker);
  }
  onMapClick(event) {
    console.log(event.latLng);
    this.positions = [];
    this.positions.push(event.latLng);
    // event.target.panTo(event.latLng);
  }

}

