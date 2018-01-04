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
  public info_content = "";

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

    var infowindow = new google.maps.InfoWindow();
    console.log(infowindow);
  }

  onMapClick(event) {
    let self = this;

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

    self.info_content = infoDesc;
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