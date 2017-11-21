import { Component, OnInit, Input } from '@angular/core';
import { HomeBean } from '../../../../beans/home.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { BaseComponent } from '../../../../base-component';
import { SimpleValidateForm } from "../../../../utils.util";

@Component({
  selector: 'app-management-osm-area-form',
  templateUrl: './management-osm-area-form.component.html',
  styleUrls: ['./management-osm-area-form.component.css']
})
export class ManagementOsmAreaFormComponent extends BaseComponent implements OnInit {

  @Input() bean: HomeBean;
  @Input() action: string;
  public inputValidate: InputValidateInfo;
  constructor() { 
    super();
    

    this.inputValidate = new InputValidateInfo();
    
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
    let arr = simpleValidate.getObjectEmpty(this.bean, ["road","soi","telephone","latitude","longitude"]);
    console.log(arr);
    if(arr.length<=0){
        //TODO Call API
    }

  }

}
