import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() mode: string;
  @Input() latitude: string;
  @Input() longitude: string;
  @Input() info: string;
  @Output() positionChanged = new EventEmitter<any>();

  public zoom: number = 15;
  public center = "16.442481, 102.808265";
  public position = "16.442481, 102.808265";
  public info_content = "";
  // public positions: any = [];
  public map;

  constructor(private _changeRef: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.center = this.getLatLong();
    this.position = this.getLatLong();
    this.info_content = this.info;
  }

  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array 

    // this.positions.push(this.param_latLng);
    // console.log('positions', this.positions);
    // this.marker = { display: true, lat: 16.442481, lng: 102.808265, };

    // if (map.markers) {
    //   for (let m of map.markers) {
    //     this.marker.lat = m.getPosition().lat();
    //     this.marker.lng = m.getPosition().lng();

    //     m.nguiMapComponent.openInfoWindow('iw', m);
    //   }
    // }
  }

  onIdle(event) {
    console.log('map', event.target);
  }

  onMarkerInit(marker) {
    console.log('marker', marker);


    // setTimeout(function () {
    //   marker.nguiMapComponent.openInfoWindow('iw', marker);
    // }, 2000);
  }

  onMarkerClick({target: marker}) {
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  onPositionChanged(target) {
    // let map = target.map;
    // if (map.markers) {
    //   for (let m of map.markers) {
    //     m.nguiMapComponent.openInfoWindow('iw', m);
    //   }
    // }
  }

  onMapClick(event) {
    let self = this;

    console.log(event.latLng);
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
    console.log('mode', this.mode);

    let m = self.mode;
    if (m && m == "view") {

    } else if (m == "edit") {
      self.position = event.latLng;
      // this.positions = [];
      // this.positions.push(event.latLng);
      // event.target.panTo(event.latLng);
      let objLatLng = { lat: event.latLng.lat(), lng: event.latLng.lng() };

      self.positionChanged.emit(objLatLng);
    }
  }

  getLatLong() {
    return this.latitude + ',' + this.longitude;
  }

}
