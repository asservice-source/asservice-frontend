import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../service/api-http.service';
import {findHomeBean} from '../../beans/findhome.bean';

@Component({
  selector: 'app-filter-find-mosquito',
  templateUrl: './filter-find-mosquito.component.html',
  styleUrls: ['./filter-find-mosquito.component.css']
})
export class FilterFindMosquitoComponent extends BaseComponent implements OnInit {

  @Input() findHome: boolean;
  @Input() reset: any;


  public villageData : any;
  private api: ApiHTTPService;
  public isShowFind = true;
  public HomeTypeData : any;
  public HomeNameData : any;
  public isHomeDisable : boolean = true;
  public findhomebean: findHomeBean = new findHomeBean();

  constructor() {
    super();
    this.api = new ApiHTTPService();
    this.setupVillage();
    this.setupHomeType();
   }

  ngOnInit() {
    
  }

  ngOnChanges(changes): void {
    console.log("OnChanges");
    console.log(changes);
    if (changes['findHome']) {
      this.isShowFind = this.findHome;
      
    }
    // if(changes['reset']){
    //   this.filterBean.villageId = "";
    //   this.changVillageNo();
      
    // }
  }

  setupVillage() {
    let self = this;
    this.api.api_villageList(super.getHospitalCode(), function (response) {
      self.villageData = response;
    })
  }

  setupHomeType(){
    let self = this;
    let params = {};
    this.api.post('home/home_type_list_hici', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        console.log(resp.response);
        self.HomeTypeData = resp.response;
      }
    })
  }

  setupHomeName(){
    let self = this;
    let params = {
      "villageId": this.findhomebean.villageId,
      "homeTypeCode": this.findhomebean.homeTypeId
    };
    this.api.post('home/home_list_by_village_hometype', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        console.log(resp.response);
        self.HomeNameData = resp.response;
      }
    })
  }

  // changeForHomename(){
  //   this.setupHomeName();
  // }

  addHome(){
    if(this.findhomebean.homeId == "0"){

    }
    
  }

}
