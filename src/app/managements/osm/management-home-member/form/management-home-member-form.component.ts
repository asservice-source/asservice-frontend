import { Component, OnInit, Input} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { PersonalBasicBean } from '../../../../beans/personal-basic.bean';


declare var $:any;
@Component({
  selector: 'app-management-home-member-form',
  templateUrl: './management-home-member-form.component.html',
  styleUrls: ['./management-home-member-form.component.css']
})
export class ManagementHomeMemberFormComponent extends BaseComponent implements OnInit {


  @Input() bean: PersonalBasicBean;
  constructor() { 
    super();
    this.bean = new PersonalBasicBean();
  }

  ngOnInit() {

  }

  onGenderChange(){

  }
  
}