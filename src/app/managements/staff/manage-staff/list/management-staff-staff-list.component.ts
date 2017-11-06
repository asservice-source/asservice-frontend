import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { ActionCustomViewComponent } from '../../../../action-custom-table/action-custom-view.component';
import { StaffBean } from '../../../../beans/staff.bean';
import { LocalDataSource } from 'ng2-smart-table';
declare var $: any;
@Component({
  selector: 'app-management-staff-staff-list',
  templateUrl: './management-staff-staff-list.component.html',
  styleUrls: ['./management-staff-staff-list.component.css']
})
export class ManagementStaffStaffListComponent extends BaseComponent implements OnInit {

  public settings: any;
  public bean: StaffBean;
  public staffDatas: any = [{citizenId: '1411022039443',genderCode: '001', firstName: 'มนีแมน', lastName: 'แสนรักษ์', fullName: 'นายมนีแมน แสนรักษ์', prefixCode: '001', prefixName: 'นาย'}, {citizenId: '9811022039000', genderCode: '001', firstName: 'สมศรี', lastName: 'สองห้องนะ', fullName: 'นายสมศรี สองห้องนะ', prefixCode: '002', prefixName: 'นาย'}];
  public source: LocalDataSource;
  constructor() {
    super();
    this.bean = new StaffBean();
    let _self = this;
    this.settings = this.getTabelSetting({
      fullName: {title: this.getLabel('lbl_firstName') +' - '+this.getLabel('lbl_lastName'), filter: false},
      citizenId: {
        title: this.getLabel('lbl_citizenid'),
        filter: false,
        //width: '180px',
      },
      action: {
        title: this.getLabel('lbl_action'),
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
          
          instance.view.subscribe(row => {
             
           });
           instance.edit.subscribe(row => {
            _self.bean = row;
            _self.onModalForm();
           });
           instance.delete.subscribe(row => {
            
           });
           
          instance.action.subscribe((row, cell) => {
            console.log(row);
            // if(row && row.action.toUpperCase()==_self.ass_action.EDIT){
            //   _self.staffBean = row;
            //   _self.onModalForm();
            // }
          });
        }
      }
              

  });
  }

  ngOnInit() {
    this.setUpTable();
  }

  setUpTable(){
    this.source = super.ng2STDatasource(this.staffDatas);
  }
  onClickAdd(){
    this.bean = new StaffBean();
    this.bean.prefixCode = '';
    this.bean.genderCode = '';
    this.onModalForm();
  }
  onModalForm(){
    $('#modalForm').modal('show');
  }
  
}
