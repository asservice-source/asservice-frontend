import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { OSMBean } from '../../../../beans/osm.bean';
import { ApiHTTPService } from '../../../../service/api-http.service';

@Component({
  selector: 'app-management-staff-osm-form',
  templateUrl: './management-staff-osm-form.component.html',
  styleUrls: ['./management-staff-osm-form.component.css']
})
export class ManagementStaffOsmFormComponent extends BaseComponent implements OnInit {

  @Input() bean: OSMBean;

  public api: ApiHTTPService = new ApiHTTPService();
  public prefixList: any = [{}];
  public villageList: any;
  public genderList: any;
  constructor() { 
    super();
    this.bean = new OSMBean();
    
  }

  ngOnInit() {
    this.setupGender();
    this.setupPrefix();
    this.setupVillage();
  }
  setupPrefix(){
    let _self = this;
    _self.api.post('person/prefix_list', {} , function (data) {
      console.log(data);
      if (data != null && data.status.toUpperCase() == "SUCCESS") {
        _self.prefixList = data.response;
      } else {
        console.log('error(s) => ' + data.message);
      }
    });
  }
  setupVillage(){
    let _self = this;
    this.api.api_villageList(this.getHospitalCode(),function(list){
      console.log(list);
      _self.villageList = list;
     
    });
  }
  setupGender(){
    let _self = this;
    this.api.api_GenderList(function(response){
      _self.genderList = response;
    });

  }
}
