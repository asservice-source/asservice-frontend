import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-maps',
  templateUrl: './multi-maps.component.html',
  styleUrls: ['./multi-maps.component.css']
})
export class MultiMapsComponent implements OnInit {

  public zoom: number = 15;
  public center = "16.442481, 102.808265";
  public positions: Array<MapsBean> = [];
  public info = "";

  constructor() {
    let self = this;

    let m1 = new MapsBean();
    m1.latitude = "16.442481";
    m1.longitude = "102.808265";
    m1.info = "m111111111111";

    let m2 = new MapsBean();
    m2.latitude = "16.542481";
    m2.longitude = "102.708265";
    m2.info = "m2222222222";

    self.positions.push(m1);
    self.positions.push(m2);
  }

  ngOnInit() {
    
  }

  onMapReady(map) {
    console.log('onMapReady -> map -> ', map);
    console.log('onMapReady -> markers -> ', map.markers);  // to get all markers as an array 
  }

  onMapClick(event) {
    let self = this;

    // self.positions.push(event.latLng);
    // event.target.panTo(event.latLng);
  }

  onIdle(event) {
    console.log('onIdle -> event ->', event.target);
  }

  onMarkerInit(marker) {
    console.log('onMarkerInit -> marker ->', marker);
  }

  onMarkerClick({ target: marker }, _info) {
    let self = this;

    self.info = _info;
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

}

export class MapsBean {
  public latitude: string = "";
  public longitude: string = "";
  public info: string = "";
  public latlng() {
    return this.latitude + "," + this.longitude;
  }
}