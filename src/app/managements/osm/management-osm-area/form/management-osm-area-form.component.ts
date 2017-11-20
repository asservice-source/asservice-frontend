import { Component, OnInit, Input } from '@angular/core';
import { HomeBean } from '../../../../beans/home.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { BaseComponent } from '../../../../base-component';

@Component({
  selector: 'app-management-osm-area-form',
  templateUrl: './management-osm-area-form.component.html',
  styleUrls: ['./management-osm-area-form.component.css']
})
export class ManagementOsmAreaFormComponent extends BaseComponent implements OnInit {

  @Input() bean: HomeBean;
  public inputValidate: InputValidateInfo = new InputValidateInfo();
  constructor() { 
    super();
  }

  ngOnInit() {
  }

  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;

    if(!this.isEmpty(this.bean.homeRegisterID) && !this.isEmpty(this.bean.homeNo)){
      
    }

  }

}
