import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../service/api-http.service';
import {findHomeBean} from '../../beans/findhome.bean';
import { HomeBean } from '../../beans/home.bean';

declare var $: any;

@Component({
  selector: 'app-filter-find-mosquito',
  templateUrl: './filter-find-mosquito.component.html',
  styleUrls: ['./filter-find-mosquito.component.css']
})
export class FilterFindMosquitoComponent extends BaseComponent implements OnInit {

  @Input() findHome: boolean;
  @Input() reset: any;
  @Output() choosePlace: EventEmitter<HomeBean> = new EventEmitter<HomeBean>();

  public villageData : any;
  private api: ApiHTTPService;
  public isShowFind = true;
  public HomeTypeData : any;
  public HomeNameData : any;
  public isHomeDisable : boolean = true;
  public findhomebean: findHomeBean = new findHomeBean();
  public homeBean : HomeBean;

  constructor() {
    super();
    this.api = new ApiHTTPService();
    this.homeBean = new HomeBean();
    this.isHomeDisable = true;
    this.setupVillage();
    this.setupHomeType();
   }

  ngOnInit() {
    
  }

  ngOnChanges(changes): void {
    // console.log("OnChanges");
    // console.log(changes);
    if (changes['findHome']) {
      this.isShowFind = this.findHome;
      
    }
    if(changes['reset']){
      this.findhomebean.villageId = "";
      this.searchPlace();
      
    }
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

  searchPlace(){
    this.setupHomeName();
  }

  unlock(){
    this.isHomeDisable = false;
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

getHomeDetail(){
  let self = this;
  let params ={
    "homeId" : this.findhomebean.homeId
  }
  this.api.post('home/home_info', params, function (resp) {
    if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
      console.log(resp.response);
      self.homeBean = resp.response;
    }
  })
}  

  onChoosePlace(homeBean : HomeBean){
    this.getHomeDetail();
    console.log(homeBean);

    this.isShowFind = false;
    this.choosePlace.emit(homeBean);
  }

  // changeForHomename(){
  //   this.setupHomeName();
  // }

  addHome(){
    if(this.findhomebean.homeId == "0"){

    }
    
  }

}
