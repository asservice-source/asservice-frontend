import { Component, OnInit, Input } from '@angular/core';
import { HomeBean } from '../../../../beans/home.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';

@Component({
  selector: 'app-management-osm-area-form',
  templateUrl: './management-osm-area-form.component.html',
  styleUrls: ['./management-osm-area-form.component.css']
})
export class ManagementOsmAreaFormComponent implements OnInit {

  @Input() bean: HomeBean;
  public inputValidate: InputValidateInfo = new InputValidateInfo();
  constructor() { }

  ngOnInit() {
  }

  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
  }

}
