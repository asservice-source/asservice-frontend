import { Component, OnInit, ElementRef, ChangeDetectorRef, Input} from '@angular/core';
import { PersonBean } from "../../../beans/person.bean";
import { BaseComponent } from "../../../base-component";
import { DeadBean } from '../../../beans/dead.bean';
import {IMyDpOptions} from 'mydatepicker';
import { Service_SurveyDead } from '../../../service/service-survey-dead';
declare var $: any;
@Component({
  selector: 'app-survey-died-form',
  templateUrl: './survey-died-form.component.html',
  styleUrls: ['./survey-died-form.component.css','../../../checkbox.css']
  
})
export class SurveyDiedFormComponent extends BaseComponent implements OnInit {
  @Input() action: string;
  @Input() data: DeadBean;
  public apiDead : Service_SurveyDead;
  public isShowForm: boolean = false;
  public isFindPersonal: boolean = true;
  public resetFind: number = 1;
  public bean: DeadBean;
  public isCauseOther: boolean = false;
  public cancerList: Array<any>;
  
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.bean = new DeadBean();
    this.apiDead = new Service_SurveyDead();
    this.cancerList = new Array<any>();
   }

  ngOnInit() {
    this.onModalEvent();
    this.setupCancerList();
  }
  
  setupCancerList(){
    let _self = this;
    this.apiDead.apiHTTPService.api_CancerList(function(response){
      _self.cancerList = response;
    });
  }

  onChangePlace(){
    
  }

  onChoosePersonal(bean: DeadBean):void {
    this.bean = bean;
    if(!this.bean.dateDead){
      
    }
    this.isFindPersonal = false;
    this.isShowForm = true;
  }
  onBack(){
    this.bean = new DeadBean();
    this.isFindPersonal = true;
    this.isShowForm = false;
    if(this.ass_action.EDIT == this.action){
      $('#modal-add-died').modal('hide');
    }
  }
  onSave(){
    console.log("Saving");
    console.log(this.bean);
  }
  onModalEvent(){
    let _self = this;
    $('#modal-add-died').on('show.bs.modal', function (e) {
      _self.resetFind = _self.resetFind+1;
      if(_self.action==_self.ass_action.EDIT){
        if(!_self.isEmpty(_self.data.causeOther)){
          _self.isCauseOther = true;
        }else{
          _self.isCauseOther = false;
        }
        _self.onChoosePersonal(_self.data);
       
      }
      _self.changeRef.detectChanges();
    })
    $('#modal-add-died').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      _self.isShowForm = false;
      _self.isFindPersonal = true;
      _self.resetFind = _self.resetFind+1;
      _self.changeRef.detectChanges();
    });
  }
}