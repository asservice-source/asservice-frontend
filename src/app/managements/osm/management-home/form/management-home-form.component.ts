import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { HomeBean } from '../../../../beans/home.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { BaseComponent } from '../../../../base-component';
import { SimpleValidateForm } from "../../../../utils.util";
import { Service_Home } from '../../../../api-managements/service-home';
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
  public isHome: boolean;
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
    $('#modalFormHome').on('show.bs.modal', function(){
      console.log(_self.bean);
      _self.disabledHomeType=false;
      if(_self.action == _self.ass_action.EDIT){
        if(_self.bean.homeTypeCode=='01' || _self.bean.homeTypeCode=='02' || _self.bean.homeTypeCode=='03' || _self.bean.homeTypeCode=='04' || _self.bean.homeTypeCode=='05'){
          _self.disabledHomeType=true;
          _self.isHome = true;
        }else{
          _self.isHome = false;
        }
      }
        
    });
    $('#modalFormHome').on('hidden.bs.modal', function(){
      _self.inputValidate = new InputValidateInfo();
    });
  }
  setupHomeTypeList(){
    let _self = this;
    this.api.api_HomeTypeList(function(response){
      _self.homeTypeList = response;
    });
  }
  onChangeHomeTypeCode(select: any){
    this.isHome = (select.value=='01'?true:false);
    this.inputValidate = new InputValidateInfo();
  }
  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let simpleValidate = new SimpleValidateForm();
    // this.bean.villageId = this.userInfo.villageId;
    // this.bean.osmId = this.userInfo.personId;

    let _self = this;
    let fields = ['homeTypeCode'];
    if(this.isHome){
      fields.push('registrationId', 'homeNo');
      this.bean.name = '';
    }else{
      fields.push('name');
      this.bean.registrationId = '';
    }
    let arr = simpleValidate.getObjectEmpty_byFilds(_self.api.map(_self.bean), fields);
    if(_self.bean.homeTypeCode=='01' && _self.bean.registrationId.trim().length!=11){
      arr.push('registrationId');
    }
    if(arr.length<=0){
      _self.api.commit_save(_self.bean, function(response){
        let strAction = _self.action==_self.ass_action.ADD?'เพิ่ม':'แก้ไข';
        if(response && response.status.toString().toUpperCase()=='SUCCESS'){
          $('#modalFormHome').modal('hide');
          let msg = '';
          if(_self.isHome){
            msg = 'ทำการ'+strAction+'บ้านเลขที่ <b>' + _self.bean.homeNo + '</b> เรียบร้อย';
          }else{
            msg = 'ทำการ'+strAction+' <b>' + _self.bean.name + '</b> เรียบร้อย';
          }
          _self.success.emit({"success": true, "message": msg});
        }else{
          let msg = '';
          if(response.response){
            if(response.response.toUpperCase() == 'DUPLICATED[REGISTRATIONID]'){
              msg = 'รหัสบ้าน <b>'+_self.bean.registrationId + '</b> ซ้ำ กรุณาใส่รหัสบ้านอื่น';
            }else if(response.response.toUpperCase() == 'DUPLICATED[HOMENO]'){
              msg = 'บ้านเลขที่ <b>'+_self.bean.homeNo + '</b> ซ้ำ กรุณาใส่บ้านเลขที่อื่น';
            }else if(response.response == 'Duplicated[LocationName]'){
              msg = 'ชื่อสถานที่นี้ <b>'+ _self.bean.name +'</b> มีอยู่แล้ว'
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