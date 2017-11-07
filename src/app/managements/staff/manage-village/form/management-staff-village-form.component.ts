import { Component, OnInit, Input, ChangeDetectorRef ,ViewChild} from '@angular/core';
import { VillageBean } from '../../../../beans/village.bean';
import { InputValidateInfo } from "../../../../directives/inputvalidate.directive";
import { BaseComponent } from '../../../../base-component';
declare var $:any, bootbox:any;
@Component({
  selector: 'app-management-staff-village-form',
  templateUrl: './management-staff-village-form.component.html',
  styleUrls: ['./management-staff-village-form.component.css']
})

export class ManagementStaffVillageFormComponent extends BaseComponent implements OnInit {
  @Input() bean: VillageBean;
  public inputValidate: InputValidateInfo = new InputValidateInfo();
  public isError: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.bean = new VillageBean();
   }

  ngOnInit() {
    this.bindModal();
  }
  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCleck = true;

    if(this.bean.villageNo && this.bean.villageName.trim()){
       $('#modalForm').modal('hide');
        bootbox.alert('บันทึกสำเร็จสำเร็จ', function(){});
    }
  }
  validation(event: InputValidateInfo){
    if(!event.isPassed){
      //this.isError = true;
    }
  }
  bindModal(){
    let _self = this;
    $('#modalForm').on('hide.bs.modal', function(){
      _self.clearInputErrorClass();
    });
  }
}
