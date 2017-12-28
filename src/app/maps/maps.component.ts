import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() LatLng: string;

  public zoom: number = 11;
  public center = "16.442481, 102.808265";
  public positions: any = [];

  constructor() { }

  ngOnInit() {
  }

  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array 
    this.positions.push(this.LatLng);
    console.log('positions', this.positions);
  }

  onIdle(event) {
    console.log('map', event.target);
  }

  onMarkerInit(marker) {
    console.log('marker', marker);
  }

  onMapClick(event) {
    console.log(event.latLng);
    // this.positions = [];
    // this.positions.push(event.latLng);
    // event.target.panTo(event.latLng);
  }

}
