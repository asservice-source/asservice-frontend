import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { HomeBean } from '../../../../beans/home.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { BaseComponent } from '../../../../base-component';
import { SimpleValidateForm } from "../../../../utils.util";
import { Service_Home } from '../../../../service/service-home';
declare var $:any;
declare var modal:any;

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
  public homeTypeList: any = [];
  public disabledHomeType = false;
  public loading: boolean = false;
  constructor() { 
    super();
    this.inputValidate = new InputValidateInfo();
    this.api = new Service_Home();
    this.success = new  EventEmitter<any>();
  }

  ngOnInit() {
    this.bindModalForm();
    this.setupHomeTypeList();
  }
  bindModalForm(){
    let _self = this;
    $('#modalForm').on('show.bs.modal', function(){
      console.log('show.bs.modal >> Action:'+_self.action);
      if(_self.action == _self.ass_action.EDIT){
        if(_self.bean.homeTypeCode=='01'){
          _self.disabledHomeType=true;
        }
      }else{
        _self.disabledHomeType=false;
      }
        
    });
    $('#modalForm').on('hidden.bs.modal', function(){
      console.log('hidden.bs.modal');
      _self.inputValidate = new InputValidateInfo();
    });
  }
  setupHomeTypeList(){
    let _self = this;
    this.api.api_HomeTypeList(function(response){
      _self.homeTypeList = response;
    });
  }
  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let simpleValidate = new SimpleValidateForm();
    //this.bean.homeTypeCode = '01';
    
    this.bean.villageId = this.userInfo.villageId;
    this.bean.osmId = this.userInfo.personId; //'891037A9-36CF-E711-AB84-005056C00008';
    let _self = this;
    let ignores = ["name","road","soi","telephone","latitude","longitude"];
    if(_self.action == _self.ass_action.ADD){
      ignores.push('id');
    }
    let fields = ['homeTypeCode'];
    if(this.bean.homeTypeCode=='01'){
      fields.push('registrationId', 'homeNo');
      this.bean.name = '';
    }else{
      fields.push('homeName');
      this.bean.registrationId = '';
    }

    let arr = simpleValidate.getObjectEmpty_byFilds(_self.api.map(_self.bean), fields);
    //let arr = simpleValidate.getObjectEmpty(_self.api.map(_self.bean), ignores);
    if(arr.length<=0 && _self.bean.registrationId.trim().length==11){
      _self.api.commit_save(_self.bean, function(response){
        let strAction = _self.action==_self.ass_action.ADD?'เพิ่ม':'แก้ไข';
        if(response && response.status.toString().toUpperCase()=='SUCCESS'){
          $('#modalForm').modal('hide');
          _self.success.emit({"success": true, "message": 'ทำการ'+strAction+'บ้านเลขที่ <b>' + _self.bean.homeNo + '</b> เรียบร้อย'});
        }else{
          let msg = '';
          if(response.response){
            if(response.response.toUpperCase() == 'DUPLICATED[REGISTRATIONID]'){
              msg = 'รหัสบ้าน <b>'+_self.bean.registrationId + '</b> ซ้ำ กรุณาใส่รหัสบ้านอื่น';
            }else if(response.response.toUpperCase() == 'DUPLICATED[HOMENO]'){
              msg = 'บ้านเลขที่ <b>'+_self.bean.homeNo + '</b> ซ้ำ กรุณาใส่บ้านเลขที่อื่น';
            }else{
              msg = 'ไม่สามารถ'+strAction+'บ้านเลขที่ <b>' + _self.bean.homeNo + '</b> ได้';
            }
          } else{
            msg = 'ไม่สามารถ'+strAction+'บ้านเลขที่ <b>' + _self.bean.homeNo + '</b> ได้';
          }
         
          _self.success.emit({"success": false, "message": msg});
        }
        
      });
    }

  }

}