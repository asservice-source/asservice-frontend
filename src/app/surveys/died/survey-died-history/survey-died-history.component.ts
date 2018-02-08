import { Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { BaseComponent } from "../../../base-component";
import { DeadBean } from '../../../beans/dead.bean';
import { Service_SurveyDead } from '../../../api-managements/service-survey-dead';

declare var $: any;

@Component({
  selector: 'app-survey-died-history',
  templateUrl: './survey-died-history.component.html',
  styleUrls: ['./survey-died-history.component.css','../../../checkbox.css']
  
})
export class SurveyDiedHistoryComponent extends BaseComponent implements OnInit {
  @Input() data: DeadBean;
  public bean: DeadBean;
  public api: Service_SurveyDead;
  public placeName: string;
  public cancerName: string;
 
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.api = new Service_SurveyDead();
    this.bean = new DeadBean();
   }

  ngOnInit() {
    this.bindModal();

  }


  bindModal(){
    
    let _self = this;
    $('#modal-history-died').on('show.bs.modal', function (e) {
      _self.bean = _self.data;
      _self.setDataDisplay();
      let dateObj = _self.convertDateTimeSQL_to_DisplayDateTime(_self.bean.deathDate);
      _self.bean.mDateDead = dateObj.date;
      _self.bean.mHours = dateObj.time.hours;
      _self.bean.mMins = dateObj.time.minutes;
      if(_self.bean.causeOther && !_self.isEmpty(_self.bean.causeOther)){
        _self.bean.isCauseOther = true;
      }else{
        _self.bean.isCauseOther = false;
      }
    })
    $('#modal-history-died').on('hidden.bs.modal', function () {
      
    });
  }

  setDataDisplay(){
    console.log(this.bean);
      let _self = this;
      this.api.api_CancerList(function(response){
        if(response){
          for(let item of response){
            if(''+item.id== ''+_self.bean.cancerTypeId){
              _self.cancerName = item.name;
            }
          }
        }
      });

      this.api.api_DeathPlaceList(function(response){
        if(response){
          for(let item of response){
            if(''+item.code == ''+_self.bean.deathPlaceCode){
              _self.placeName = item.name;
            }
          }
        }
      });
 
  }
}