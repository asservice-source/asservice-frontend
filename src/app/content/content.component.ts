import { Component, OnInit, Injectable } from '@angular/core';
import { RequestOptions, Headers, RequestMethod, Http ,Response} from '@angular/http';

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
  public pos = '16.442481, 102.808265';
 
  constructor(private http: Http) { }

  ngOnInit() {
    
  }

  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array 
  }
  onIdle(event) {
    console.log('map', event.target);
  }
  onMarkerInit(marker) {
    this.pos = marker;
    console.log('marker', marker);
  }
  onMapClick(event) {
    this.pos = event.latLng;
    // this.positions.push(event.latLng);
    // event.target.panTo(event.latLng);
  }

}

