import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent extends BaseComponent implements OnInit {

  @Input() mode: string;
  @Input() reset: any;
  @Input() latitude: string;
  @Input() longitude: string;
  @Input() info: string;
  @Input() defaultAddress: string;
  @Output() positionChanged = new EventEmitter<any>();

  // public autocomplete: any;
  public zoom: number = 15;
  public center = "";
  public position = "";
  public draggable = false;
  public info_content = "";
  public map: any;
  public defaultLat: string = "";
  public defaultLng: string = "";

  constructor(private _changeRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    let self = this;

    let lat = +self.latitude;
    let lng = +self.longitude;
    // let latlng = self.getLatLong();
    if (self.latitude && self.longitude) {
      let latlng = lat + ',' + lng
      self.center = latlng;
      self.position = latlng;
      self.info_content = self.info;
      if (self.map) {
        self.map.panTo({ lat: lat, lng: lng });
        self.map.setZoom(15);
      }
      self.zoom = 15;
    } else {
      // self.zoom = 15;
      // let adr = 'ตำบล' + self.userInfo.hospitalTumbolName + ' อำเภอ' + self.userInfo.hospitalAmphurName + ' จังหวัด' + self.userInfo.hospitalProvinceName + ' ' + self.userInfo.hospitalZipCode;
      // self.center = self.defaultAddress || adr;
      // self.position = "";

      self.position = "";

      // เก็บค่าไว้ในตัวแปร เมื่อมีค่าแล้วจะไม่ call api อีก
      if (!self.defaultLat && !self.defaultLng) {
        self.getLocationGooglemaps(null, function (d) {
          if (d.results) {
            self.defaultLat = d.results[0].geometry.location.lat;
            self.defaultLng = d.results[0].geometry.location.lng;
          }
        });
      }

      if (self.defaultLat && self.defaultLng) {
        self.center = self.defaultLat + ',' + self.defaultLng;
        if (self.map) {
          self.map.panTo({ lat: self.defaultLat, lng: self.defaultLng });
          self.map.setZoom(15);
        }
      } else {
        let adr = 'ตำบล' + self.userInfo.hospitalTumbolName + ' อำเภอ' + self.userInfo.hospitalAmphurName + ' จังหวัด' + self.userInfo.hospitalProvinceName + ' ' + self.userInfo.hospitalZipCode;
        self.center = adr;
        self.zoom = 15;
      }
    }
  }

  onMapReady(map) {
    let self = this;

    console.log('onMapReady -> map -> ', map);
    console.log('onMapReady -> markers -> ', map.markers);  // to get all markers as an array 

    self.map = map;
  }

  onIdle(event) {
    console.log('onIdle -> map -> ', event.target);
  }

  onMarkerInit(marker) {
    console.log('onMarkerInit -> marker -> ', marker);

    // setTimeout(function () {
    //   marker.nguiMapComponent.openInfoWindow('iw', marker);
    // }, 2000);
  }

  onMarkerClick({ target: marker }) {
    let self = this;

    console.log('onMarkerClick -> marker -> ', marker);

    if (self.info_content) {
      marker.nguiMapComponent.openInfoWindow('iw', marker);
    }
  }

  onMarkerDragEnd(event) {
    let self = this;

    console.log('onMarkerDragEnd -> event -> ', event);
    console.log('onMarkerDragEnd -> mode -> ', self.mode);

    let m = self.mode;
    if (m == "edit") {
      let tmpLat = event.latLng.lat();
      let tmpLng = event.latLng.lng();

      // self.latitude = tmpLat;
      // self.longitude = tmpLng;
      self.position = tmpLat + ',' + tmpLng;

      console.log('onMarkerDragEnd -> latlng -> ', self.position);

      let objLatLng = { lat: tmpLat, lng: tmpLng };
      self.positionChanged.emit(objLatLng);
    } else {

    }
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

    console.log('onMapClick -> event -> ', event);
    console.log('onMapClick -> mode -> ', self.mode);

    let m = self.mode;
    if (m == "edit") {
      let tmpLat = event.latLng.lat();
      let tmpLng = event.latLng.lng();

      // self.latitude = tmpLat;
      // self.longitude = tmpLng;
      self.position = tmpLat + ',' + tmpLng;

      console.log('onMapClick -> latlng -> ', self.position);

      let objLatLng = { lat: tmpLat, lng: tmpLng };
      self.positionChanged.emit(objLatLng);
    } else {

    }
  }
  
}
