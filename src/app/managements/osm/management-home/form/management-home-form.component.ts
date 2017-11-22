import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { HomeBean } from '../../../../beans/home.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { BaseComponent } from '../../../../base-component';
import { SimpleValidateForm } from "../../../../utils.util";
import { Service_Home } from '../../../../service/service-home';


@Component({
  selector: 'app-management-home-form',
  templateUrl: './management-home-form.component.html',
  styleUrls: ['./management-home-form.component.css']
})
export class ManagementHomeFormComponent extends BaseComponent implements OnInit {

  @Input() bean: HomeBean;
  @Input() action: string;
  @Output() success: EventEmitter<any>;
  public inputValidate: InputValidateInfo;
  public api: Service_Home;
  constructor() { 
    super();
    this.inputValidate = new InputValidateInfo();
    this.api = new Service_Home();
    this.success = new  EventEmitter<any>();
  }

  ngOnInit() {
    
  }
  bindModalForm(){
    let _self = this;
    $('#modalForm').on('show.bs.modal', function(){
      if(_self.action==_self.ass_action.ADD){
      }
      console.log(_self.action);
    });
  }
  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let simpleValidate = new SimpleValidateForm();
    this.bean.homeTypeId = '01';
    this.bean.villageId = '11';
    this.bean.osmId = '891037A9-36CF-E711-AB84-005056C00008';
    let _self = this;
    let ignores = ["holderId","name","road","soi","telephone","latitude","longitude"];
    if(_self.action == _self.ass_action.ADD){
      ignores.push('id');
    }
    let arr = simpleValidate.getObjectEmpty(_self.api.map(_self.bean), ignores);
    console.log(arr);
    if(arr.length<=0){
      _self.api.commit_save(_self.bean, function(response){
        console.log(response);
        let strAction = _self.action==_self.ass_action.ADD?'เพิ่ม':'แก้ไข';
        if(response && response.status.toString().toUpperCase()=='SUCCESS'){
          _self.message_success('','ทำการ'+strAction+'บ้านเลขที่ ' + _self.bean.homeNo + ' เรียบร้อย', function(){
          _self.success.emit({"success": true, "response": response});
          });
        }else{
          _self.message_error('','ไม่สามารถ'+strAction+'บ้านเลขที่ ' + _self.bean.homeNo + ' ได้');
        }

      });
    }

  }

}
