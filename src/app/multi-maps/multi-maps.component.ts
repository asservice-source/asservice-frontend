import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base-component';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-multi-maps',
  templateUrl: './multi-maps.component.html',
  styleUrls: ['./multi-maps.component.css']
})
export class MultiMapsComponent extends BaseComponent implements OnInit {

  @Input() list: any;
  @Input() reset: any;
  @Input() defaultAddress: string;

  public zoom: number = 15;
  public center = "";
  public listMaps: Array<MapsBean> = [];
  public info_content = "";
  public map: any;
  public defaultLat: string = "";
  public defaultLng: string = "";

  constructor(private _changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    // let m1 = new MapsBean();
    // m1.latitude = "16.442481";
    // m1.longitude = "102.808265";
    // m1.info = "m111111111111";

    // let m2 = new MapsBean();
    // m2.latitude = "16.542481";
    // m2.longitude = "102.708265";
    // m2.info = "m2222222222";

    // self.positions.push(m1);
    // self.positions.push(m2);
  }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    let self = this;

    if (changes['reset']) {
      self.listMaps = self.list;
      if (self.listMaps && self.listMaps.length > 0) {
        for(let map of self.listMaps) {
          map.locations.push({ lat: +map.latitude, lng: +map.longitude });
        }

        // ตั้งค่าการ default center ของ maps เป็นค่าแรกของ list
        let numLat = +self.listMaps[0].latitude;
        let numLng = +self.listMaps[0].longitude;

        self.zoom = 12;
        self.center = numLat + "," + numLng;
        if (self.map) {
          self.map.panTo({ lat: numLat, lng: numLng });
          self.map.setZoom(12);
        }
      } else {
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
  }

  onMapReady(map) {
    let self = this;

    console.log('onMapReady -> map -> ', map);
    console.log('onMapReady -> markers -> ', map.markers);  // to get all markers as an array

    self.map = map;
  }

  onMapClick(event) {
    let self = this;

    console.log('onMapClick -> map ->', event.target);

    // self.positions.push(event.latLng);
    // event.target.panTo(event.latLng);
  }

  onIdle(event) {
    console.log('onIdle -> map ->', event.target);
  }

  onMarkerInit(marker) {
    console.log('onMarkerInit -> marker ->', marker);
  }

  onMarkerClick({ target: marker }, infoDesc) {
    console.log('onMarkerClick -> marker ->', marker);

    let self = this;

    if (infoDesc) {
      self.info_content = infoDesc;
      marker.nguiMapComponent.openInfoWindow('iw', marker);
    }
  }

}

export class MapsBean {
  public latitude: string = "";
  public longitude: string = "";
  public locations: any[] = [];
  public info: string = "";
}