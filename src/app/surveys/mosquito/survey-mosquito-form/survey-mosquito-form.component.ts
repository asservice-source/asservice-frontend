import { Component, OnInit, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { MosquitoBean } from '../../../beans/mosquito.bean';
import { ApiHTTPService } from '../../../service/api-http.service';

declare var $: any;
@Component({
  selector: 'app-survey-mosquito-form',
  templateUrl: './survey-mosquito-form.component.html',
  styleUrls: ['./survey-mosquito-form.component.css']
})
export class SurveyMosquitoFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() action: string;
  @Input() data: MosquitoBean;

  public isFindHome: boolean = true;
  public isShowForm: boolean = false;
  public resetFind: number = 1;
  private api: ApiHTTPService;
  public containerTypeList: any;

  public mosquitobean: MosquitoBean;

  public valSurveyTotal: any = {};
  ngAfterViewInit(): void {

  }

  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.mosquitobean = new MosquitoBean();
    this.api = new ApiHTTPService();
  }

  ngOnInit() {
    this.onModalEvent();
    this.getContainerType();
  }

  onBack() {
    this.mosquitobean = new MosquitoBean();
    this.isFindHome = true;
    this.isShowForm = false;
    if (this.ass_action.EDIT == this.action) {
      $('#find-person-md').modal('hide');
    }
  }

  onChoosePlace(bean: any): void {
    this.mosquitobean = new MosquitoBean();
    this.mosquitobean = bean;
    this.isFindHome = false;
    this.isShowForm = true;
    if(this.action == this.ass_action.ADD){
      this.setListContainerTypeDefault();
    }
  }

  onModalEvent() {
    let self = this;
    $('#find-person-md').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind + 1;
      if (self.action == self.ass_action.EDIT) {
        self.onChoosePlace(self.data);
      }
      self.changeRef.detectChanges();
    })
    $('#find-person-md').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      self.isShowForm = false;
      self.isFindHome = true;
      self.resetFind = self.resetFind + 1;
      self.changeRef.detectChanges();
    });
  }
  setListContainerTypeDefault(){
    let self = this;
    if(self.action == self.ass_action.ADD){
      self.mosquitobean.listContainerType = [];
      for(let item of  self.containerTypeList){
          let contain = {
            "containerTypeId" : item.containerTypeId,
            "totalSurvey": 0,
            "totalDetect": 0
          }
          self.mosquitobean.listContainerType.push(contain);
      }
    }
  }
  getContainerType() {
    let self = this;
    let params = {};
    this.api.post('survey_hici/container_type_list', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.containerTypeList = resp.response;
      }
    })
  }

  addSurvey(){
      let obj= {
        documentId : this.mosquitobean.documentId,
        homeId : this.mosquitobean.homeId,
        listContainerType : this.mosquitobean.listContainerType
      }
      let params = JSON.stringify(obj);
      console.log(params);
  }

  // http://192.168.1.203:8080/api-asservice-front/survey_hici/container_type_list

}
