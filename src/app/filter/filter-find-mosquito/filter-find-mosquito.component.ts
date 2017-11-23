import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../service/api-http.service';

@Component({
  selector: 'app-filter-find-mosquito',
  templateUrl: './filter-find-mosquito.component.html',
  styleUrls: ['./filter-find-mosquito.component.css']
})
export class FilterFindMosquitoComponent extends BaseComponent implements OnInit {


  public villageData : any;
  private api: ApiHTTPService;
  public isShowFind = true;
  public HomeTypeData : any;

  constructor() {
    super();
    this.api = new ApiHTTPService();
    this.setupVillage();
    this.setupHomeType();
   }

  ngOnInit() {
    
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

}
