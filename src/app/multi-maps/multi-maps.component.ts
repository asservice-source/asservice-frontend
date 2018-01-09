import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-multi-maps',
  templateUrl: './multi-maps.component.html',
  styleUrls: ['./multi-maps.component.css']
})
export class MultiMapsComponent implements OnInit {

  @Input() list: any;
  @Input() reset: any;
  @Input() defaultAddress: string;

  public zoom: number = 15;
  public center = "";
  public positions: Array<MapsBean> = [];
  public info_content = "";
  public map: any;

  constructor(private _changeRef: ChangeDetectorRef) {
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
      self.positions = self.list;
      if (self.positions && self.positions.length > 0) {
        let numLat = +self.positions[0].latitude;
        let numLng = +self.positions[0].longitude;
        let latLngLiteral = { lat: numLat, lng: numLng };
        self.zoom = 12;
        self.center = numLat + "," + numLng;
        if (self.map) {
          self.map.panTo(latLngLiteral);
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
  public info: string = "";
  public latlng() {
    return this.latitude + "," + this.longitude;
  }
}