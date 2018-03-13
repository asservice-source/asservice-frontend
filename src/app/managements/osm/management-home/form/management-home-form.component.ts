import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef} from '@angular/core';
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
  @Input() type: string;
  @Output() success: EventEmitter<any>;
  @Output() cancel: EventEmitter<any>;
  public inputValidate: InputValidateInfo;
  public api: Service_Home;
  public osmList: any = [];
  public homeTypeList: any = [];
  public homeList: any = [];
  public isDisabledHomeType: boolean = false;
  public isDisabledOsm: boolean;
  public loading: boolean = false;
  public isHome: boolean;
  public isShowSelectHome: boolean = false;
  public isEdit: boolean;
  public param_reset: number = 1;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.inputValidate = new InputValidateInfo();
    this.api = new Service_Home();
    this.success = new  EventEmitter<any>();
    this.cancel = new EventEmitter<any>();
  }

  ngOnInit() {
    this.bindModalForm();
    this.setupOsmList();
    this.setupHomeTypeList();
  }
  bindModalForm(){
    let _self = this;
    $('#modalFormHome').on('show.bs.modal', function(){
      console.log(_self.bean);
      _self.isShowSelectHome = false;
      _self.setupOsmList();
      _self.setupHomeTypeList();
      _self.isDisabledHomeType=false;
      if(_self.bean.osmId){
        _self.isDisabledOsm = true;
      }else{
        _self.bean.osmId = '';
        _self.isDisabledOsm = false;
      }
      if(_self.action == _self.ass_action.EDIT){
        _self.isEdit = true;
        if(_self.isHomeType(_self.bean.homeTypeCode)){
          _self.isDisabledHomeType=true;
          _self.isHome = true;
        }else{
          _self.isHome = false;
        }
      }else{
        _self.isEdit = false;
      }
      _self.param_reset +=1;
      _self.changeRef.detectChanges();
    });
    $('#modalFormHome').on('hidden.bs.modal', function(){
      _self.inputValidate = new InputValidateInfo();
    });
  }
  setupOsmList(){
    let _self = this;
    this.api.api_OsmList(_self.bean.villageId ,function(response){
      _self.osmList = response;
    });
  }
  setupHomeTypeList(){
    let _self = this;
    this.api.api_HomeTypeList(function(response){

      if(_self.type == 'MOS'){
        _self.homeTypeList = [];
        for(let item of response){

          if(item.code == '01'){
            continue;
          }
          _self.homeTypeList.push(item);
        }

      }else{
        _self.homeTypeList = response;
      }

    });
  }
  resetForm(){
    this.bean.registrationId = '';
    this.bean.homeId = '';
    this.bean.homeNo = '';
    this.bean.name = '';
    this.bean.road = '';
    this.bean.soi = '';
    this.bean.telephone = '';
    this.bean.latitude = '';
    this.bean.longitude = '';
  }
  onClickSelectHome(): void{
    if(this.isEdit){
      return;
    }
    let _self = this;
    if(this.isShowSelectHome && this.bean.homeId){
      this.message_comfirm('','ยกเลิกบ้านเลขที่ที่ดึงมา ใช่หรือไม่?', function(isConfirm){
        if(!isConfirm){
          return;
        }else{
          _self.isShowSelectHome = !_self.isShowSelectHome;
          _self.resetForm();
        }
      });
    }else{
      this.isShowSelectHome = !this.isShowSelectHome;
      this.resetForm();
      if(this.isShowSelectHome){
        _self.loading = true;
        _self.api.getHomeWithoutOSM(_self.bean.villageId, function(response){
          _self.loading = false;
          _self.homeList = response;
          _self.changeRef.detectChanges();
        })
      }
    }
  }
  onChangeHomeNo(){
    console.log(this.bean)
    if(this.bean.homeId){
      for(let item of this.homeList){
        if(this.bean.homeId==item.homeId){
          this.bean.homeTypeCode = item.homeTypeCode;
          this.bean.registrationId = item.registrationId;
          this.bean.homeNo = item.homeNo;
          this.bean.name = item.name;
          this.bean.road = item.road;
          this.bean.soi = item.soi;
          this.bean.telephone = item.telephone;
          this.bean.latitude = item.latitude;
          this.bean.longitude = item.longitude;
        }
      }
    }else{
      this.resetForm();
    }

  }
  onChangeHomeTypeCode(select: any){
    this.bean.homeId='';
    this.bean.homeNo = '';
    if(this.isHomeType(select.value)){
      this.isHome = true;
    }else{
      this.isHome = false;
      this.isShowSelectHome = false;
    }

    this.inputValidate = new InputValidateInfo();
  }
  onMapChange(event: any){
    if(event){
      this.bean.latitude = event.lat;
      this.bean.longitude = event.lng;
    }
    console.log(event);
  }
  onCancel(){
    this.cancel.emit("CANCEL");
  }
  onSave(){
    // if(1){
    //   console.log(this.bean);
    // return;
    // }


    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let simpleValidate = new SimpleValidateForm();
    let _self = this;
    let fields = ['osmId', 'homeTypeCode'];
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
