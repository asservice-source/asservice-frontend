import { Component, OnInit, Input } from '@angular/core';
import { Marker } from '@ngui/map/dist/directives/marker';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() paramLatLng: string;
  @Input() paramInfo: string;

  public zoom: number = 15;
  public center = "16.442481, 102.808265";
  public position = "16.442481, 102.808265";
  public info_content = "";
  // public positions: any = [];

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.center = this.paramLatLng;
    this.position = this.paramLatLng;
    this.info_content = this.paramInfo;
    // alert(this.paramLatLng);
    // alert(this.paramInfo);
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

    setTimeout(function () {
      marker.nguiMapComponent.openInfoWindow('iw', marker);
    }, 2000);
  }

  onMapClick(event) {
    console.log(event.latLng);
    // this.positions = [];
    // this.positions.push(event.latLng);
    // event.target.panTo(event.latLng);
  }

}
