import { Component, OnInit, Input, ChangeDetectorRef ,ViewChild} from '@angular/core';
import { VillageBean } from '../../../../beans/village.bean';
import { InputValidateInfo } from "../../../../directives/inputvalidate.directive";
declare var $:any, bootbox:any;
@Component({
  selector: 'app-management-staff-village-form',
  templateUrl: './management-staff-village-form.component.html',
  styleUrls: ['./management-staff-village-form.component.css']
})

export class ManagementStaffVillageFormComponent implements OnInit {
  @Input() bean: VillageBean;
  public isValidate: boolean = false;
  public inputValidate: InputValidateInfo = new InputValidateInfo();
  public isError: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
    this.bean = new VillageBean();
   }

  ngOnInit() {
    this.bindModal();
  }
  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCleck = true;
    if(!this.isError){
      bootbox.alert('OK');
    }
  }
  validation(event: InputValidateInfo){
    if(!event.isPassed){
      this.isError = true;
    }
  }
  bindModal(){
    let _self = this;
    $('#modalForm').on('hide.bs.modal', function(){
      _self.inputValidate = new InputValidateInfo();
    });
    
  }
}
