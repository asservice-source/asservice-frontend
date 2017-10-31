import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  public staffBean: StaffBean;
  public staffDatas: any = [{citizenId: '1411022039443', firstName: 'มนีแมน', lastName: 'แสนรักษ์', fullName: 'นายมนีแมน แสนรักษ์', titleId: '1', titleName: 'นาย'}, {citizenId: '9811022039000', firstName: 'สมศรี', lastName: 'สองห้องนะ', fullName: 'นายสมศรี สองห้องนะ', titleId: '1', titleName: 'นาย'}];
  public source: LocalDataSource;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.staffBean = new StaffBean();
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
              _self.staffBean = row;
              _self.onModalForm(_self.ass_action.EDIT);
            }
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
  onModalForm(action:string){
    //this.changeRef.detectChanges();
    $('#modalForm').modal('show');
  }
  onClickAddStaff(){
    this.staffBean = new StaffBean();
    //this.changeRef.detectChanges();
    $('#modalForm').modal('show');
  }
}
