import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';

@Component({
  selector: 'app-management-staff-staff',
  templateUrl: './management-staff-staff.component.html',
  styleUrls: ['./management-staff-staff.component.css']
})
export class ManagementStaffStaffComponent extends BaseComponent implements OnInit {

  public settings: any;
  constructor() {
    super();
    let _self = this;
    this.settings = this.getTabelSetting({
      name: {title:'ชื่อ - สกุล'},
      action: {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
          /*
          instance.view.subscribe(row => {
             self.doClick(row);
           });
           instance.edit.subscribe(row => {
             self.doClick(row);
           });
           instance.delete.subscribe(row => {
             self.doClick(row);
           });
           */
          instance.action.subscribe((row, cell) => {
            console.log(row);
            if(row && row.action.toUpperCase()==_self.ass_action.EDIT){
             // _self.diedBean = row;
             // _self.onModalForm(_self.ass_action.EDIT);
            }
          });
        }
      }
              

  });
  }

  ngOnInit() {
  }

}
