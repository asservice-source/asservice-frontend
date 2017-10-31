import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { StaffBean } from '../../../../beans/staff.bean';

@Component({
  selector: 'app-management-staff-staff-form',
  templateUrl: './management-staff-staff-form.component.html',
  styleUrls: ['./management-staff-staff-form.component.css']
})
export class ManagementStaffStaffFormComponent extends BaseComponent implements OnInit {

  @Input() dataBean: StaffBean;

  public staffBean: StaffBean;
  
  constructor() {
    super();
    this.staffBean = new StaffBean();
    this.dataBean = new StaffBean();
   }

  ngOnInit() {

  }

}
