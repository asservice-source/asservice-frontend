import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Headers } from '@angular/http';
import { NgModel } from '@angular/forms';
import { Http, Response, RequestOptions, RequestMethod } from "@angular/http";
import { FilterHeadSurveyBean } from '../../beans/filter-head-survey.bean';
import { ApiHTTPService } from '../../service/api-http.service';
import { BaseComponent } from '../../base-component';

declare var $: any;

@Component({
  selector: 'app-filter-head-survey',
  templateUrl: './filter-head-survey.component.html',
  styleUrls: ['./filter-head-survey.component.css']
})
export class FilterHeadSurveyComponent extends BaseComponent implements OnInit {

  @Input() set surveyTypeCode(surveyTypeCode: string) {
    this.typeCode = surveyTypeCode;
    console.log(this.typeCode);
  }

  @Output() notifyFilter: EventEmitter<FilterHeadSurveyBean> = new EventEmitter<FilterHeadSurveyBean>();
  @Output() changeFilter: EventEmitter<FilterHeadSurveyBean> = new EventEmitter<FilterHeadSurveyBean>();


  private api: ApiHTTPService;
  public filterBean: FilterHeadSurveyBean;
  public typeCode: string;
  public villageData: any;
  public osmData: any;
  public isDisabledOSM = true;
  public isDisabledName = true;

  public rounds: any = [{roundId:'1', title: 'ประจำเดือน พฤศจิกายน พ.ศ. 1/2560'},{roundId:'2', title: 'ประจำเดือน พฤศจิกายน พ.ศ. 2/2560'},{roundId:'3', title: 'ประจำเดือน พฤศจิกายน พ.ศ. 3/2560'}]
  public discription: any = {round: '', village: 'ทั้งหมด', osm: 'ทั้งหมด', name: ''};

  constructor(private http: Http) {
    super();
    this.api = new ApiHTTPService();
    this.filterBean = new FilterHeadSurveyBean();
    this.filterBean.roundId = '1';
    this.filterBean.villageId = '';
    this.filterBean.osmId = '';
    this.filterBean.name = '';
  } 

  ngOnInit() {
    this.setUpVillage();
    this.onSearchFilter();
    for(let item of this.rounds){
      if(item.roundId==this.filterBean.roundId){
        this.discription.round = item.title;
      }
    }
    this.onSearchFilter();
    
  }

  setUpVillage() { // Get list of village no
    let self = this;
    let params = { "hospitalCode": super.getHospitalCode() };
    this.api.post('village/village_no_list_by_hospital', params, function (resp) {
      console.log(self.villageData);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.villageData = resp.response; 
      }
    })
  }
  setUpOSM() {
    
    let self = this;
    self.filterBean.osmId='';
    self.isDisabledOSM = false;
    let params = { "id": this.filterBean.villageId};
    this.api.post('osm/osm_list_by_village', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.osmData = resp.response;
        self.isDisabledOSM = false;
        self.isDisabledName = false;
      }
    })
  }

  onChangeRound(select:any) {
    console.log(select);
    for(let item of select.options){
      if(item.value==select.value){
        this.discription.round = item.text;
      }
    }

    this.onDropdownChange();
  }

  onChangeVillage(select: any) {
    for(let item of select.options){
      if(item.value==select.value){
        this.discription.village = item.text;
      }
    }

    this.setUpOSM();
    this.onDropdownChange();
  }

  onChangeOSM(select: any) {
    for(let item of select.options){
      if(item.value==select.value){
        this.discription.osm = item.text;
      }
    }
    this.onDropdownChange();
  }

  onSearchFilter() {

    let str = '<b>รอบสำรวจ:</b> ' + this.discription.round;
    str += ' , <b>หมู่บ้าน:</b> ' + this.discription.village;
    str += ' , <b>อสม.:</b> ' + this.discription.osm;
    str += ' , <b>ชื่อ:</b> ' + this.filterBean.name;
    this.filterBean.discription = str;
    this.notifyFilter.emit(this.filterBean);

  }

  onDropdownChange() {
    this.changeFilter.emit(this.filterBean);
  }

}
