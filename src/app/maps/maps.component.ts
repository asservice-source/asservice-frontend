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

  // public autocomplete: any;
  public zoom: number = 15;
  public center = "";
  public position = "";
  public info_content = "";

  constructor(private _changeRef: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    let self = this;

    let latlng = self.getLatLong();
    if (latlng) {
      self.zoom = 15;
      self.center = latlng;
      self.position = latlng;
      self.info_content = self.info;
    } else {
      self.zoom = 5;
      self.center = "Thailand";
      self.position = "";
    }
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

  onMarkerClick({ target: marker }) {
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
    console.log('mode', self.mode);

    let m = self.mode;
    if (m == "view") {

    } else if (m == "edit") {
      self.position = event.latLng;

      let objLatLng = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      self.positionChanged.emit(objLatLng);
    }
  }

  // initialized(autocomplete: any) {
  //   this.autocomplete = autocomplete;
  // }

  // placeChanged(place) {
  //   console.log('place',place);
  //   this.center = place.geometry.location;
  //   for (let i = 0; i < place.address_components.length; i++) {
  //     let addressType = place.address_components[i].types[0];
  //     this.address[addressType] = place.address_components[i].long_name;
  //   }
  //   this._changeRef.detectChanges();
  // }

  getLatLong() {
    let self = this;

    if (self.latitude && self.longitude) {
      return self.latitude + ',' + self.longitude;
    } else {
      return "";
    }
  }

}
