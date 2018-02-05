import { Component, OnInit, Input, ChangeDetectorRef ,ViewChild, EventEmitter, Output} from '@angular/core';
import { VillageBean } from '../../../../beans/village.bean';
import { InputValidateInfo } from "../../../../directives/inputvalidate.directive";
import { BaseComponent } from '../../../../base-component';
import { Service_Village } from '../../../../api-managements/service-village';
declare var $:any, bootbox:any;
@Component({
  selector: 'app-management-staff-village-form',
  templateUrl: './management-staff-village-form.component.html',
  styleUrls: ['./management-staff-village-form.component.css']
})

export class ManagementStaffVillageFormComponent extends BaseComponent implements OnInit {
  @Input() bean: VillageBean;
  @Input() action: string;
  @Output() onAdd: EventEmitter<any>;
  public inputValidate: InputValidateInfo;
  public isError: boolean = false;
  public api: Service_Village;
  public loading: boolean = false;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.bean = new VillageBean();
    this.onAdd = new EventEmitter<any>();
    this.api = new Service_Village();
    this.inputValidate = new InputValidateInfo();
   }

  ngOnInit() {
    this.bindModal();
  }
  onSave(){
     let _self = this;
    if(this.bean.villageNo==0){
      this.bean.villageNo = null;
      setTimeout(function(){
        _self.inputValidate = new InputValidateInfo();
        _self.inputValidate.isCheck = true;
      },200);
      return;
    }
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    this.bean.villageNo = (+this.bean.villageNo);
    if(+this.bean.villageNo && this.bean.villageName && this.bean.villageName.trim().length>0){
      _self.loading = true;
      this.api.commit_save(this.bean, function(response){
        _self.loading = false;
        if(response.status && "SUCCESS"==response.status.toUpperCase()){
          $('#modalForm').modal('hide');
          let message = _self.action==_self.ass_action.ADD?'เพิ่มหมู่บ้าน':'แก้ไขหมู่บ้าน';
          message += " : หมู่ที่ " + _self.bean.villageNo + " บ้าน" + _self.bean.villageName;
          _self.onAdd.emit({"success": true, "message": message});

        }else{                                                     
          if(response.response=='Duplicated[VillageNO]'){
            _self.message_error('','หมู่ที่ <b>'+ _self.bean.villageNo + ' ' + _self.bean.villageName +'</b> ซ้ำ กรุณาใส่หมู่ที่อื่น');
          }else{
            _self.message_error('', response.message);
          }
        }
      });
       
    }
  }
  validation(event: InputValidateInfo){
    
  }
  bindModal(){
    let _self = this;
    $('#modalForm').on('hide.bs.modal', function(){
      //clear input and label error
      _self.inputValidate = new InputValidateInfo();
    });
  }
}
