import { Component, OnInit, Input, ChangeDetectorRef ,ViewChild, EventEmitter, Output} from '@angular/core';
import { VillageBean } from '../../../../beans/village.bean';
import { InputValidateInfo } from "../../../../directives/inputvalidate.directive";
import { BaseComponent } from '../../../../base-component';
import { ApiHTTPService } from '../../../../service/api-http.service';
declare var $:any, bootbox:any;
@Component({
  selector: 'app-management-staff-village-form',
  templateUrl: './management-staff-village-form.component.html',
  styleUrls: ['./management-staff-village-form.component.css']
})

export class ManagementStaffVillageFormComponent extends BaseComponent implements OnInit {
  @Input() bean: VillageBean;
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
  public inputValidate: InputValidateInfo = new InputValidateInfo();
  public isError: boolean = false;
  public api: ApiHTTPService = new ApiHTTPService();
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.bean = new VillageBean();
   }

  ngOnInit() {
    this.bindModal();
  }
  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let _self = this;
    if(this.bean.villageNo && this.bean.villageName.trim()){
      let params = {};
      params["hospitalCode"] =  this.getHospitalCode();
      params["createdBy"] =  this.getUserFullname();
      params["villageNo"] =  this.bean.villageNo;
      params["villageName"] = this.bean.villageName.trim();
      params = JSON.stringify(params);
      console.log(params);
      this.api.api_villageAdd(params, function(response){
        if(response && "SUCCESS"==response.status.toUpperCase()){
          $('#modalForm').modal('hide');
          bootbox.alert('บันทึกสำเร็จสำเร็จ', function(){
            console.log(response);
            _self.onAdd.emit(response);
          });
        }else{
          bootbox.alert('บันทึกไม่สำเร็จสำเร็จ', function(){
            console.log(response);
          });
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
