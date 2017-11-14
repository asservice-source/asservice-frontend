import { Component, OnInit, ElementRef, ChangeDetectorRef, Input} from '@angular/core';
import { PersonBean } from "../../../beans/person.bean";
import { BaseComponent } from "../../../base-component";
import { DeadBean } from '../../../beans/dead.bean';
import {IMyDpOptions} from 'mydatepicker';
declare var $: any;
@Component({
  selector: 'app-survey-died-form',
  templateUrl: './survey-died-form.component.html',
  styleUrls: ['./survey-died-form.component.css','../../../checkbox.css']
  
})
export class SurveyDiedFormComponent extends BaseComponent implements OnInit {
  @Input() action: string;
  @Input() data: DeadBean;
  public isShowForm: boolean = false;
  public isFindPersonal: boolean = true;
  public resetFind: number = 1;
  public bean: DeadBean;
  public causeList: Array<any> = [{
    causeCode: 'DIABETES',
    causeName: 'โรคเบาหวาน',
    isCause: false,
  },{
    causeCode: 'HYPERTENSION',causeName: 'โรคความดันโลหิตสูง',isCause: false,
  },{
    causeCode: 'ACCIDENT',causeName: 'อุบัติเหตุ',isCause: false,
  },{
    causeCode: 'CANCER',causeName: 'โรคมะเร็ง',isCause: true,
  },{
    causeCode: 'OTHER',causeName: 'สาเหตุอื่นๆ',isCause: false,
  }];
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.bean = new DeadBean();
   }

  ngOnInit() {
    this.onModalEvent();
  }
  
  onChangePlace(){
    
  }

  onChoosePersonal(bean:any):void {
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
    console.log(this.causeList);
  }
  onModalEvent(){
    let self = this;
    $('#modal-add-died').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind+1;
      if(self.action==self.ass_action.EDIT){
        self.onChoosePersonal(self.data);
      }

      self.changeRef.detectChanges();
    })
    $('#modal-add-died').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      self.isShowForm = false;
      self.isFindPersonal = true;
      self.resetFind = self.resetFind+1;
      self.changeRef.detectChanges();
    });
  }
}