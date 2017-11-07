import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../../action-custom-table/action-custom-view.component';
import { VillageBean } from '../../../../beans/village.bean';
declare var $:any;
@Component({
  selector: 'app-management-staff-village-list',
  templateUrl: './management-staff-village-list.component.html',
  styleUrls: ['./management-staff-village-list.component.css']
})
export class ManagementStaffVillageListComponent extends BaseComponent implements OnInit {
  public settings: any;
  public source: LocalDataSource;
  public bean: VillageBean;
  public datas: any = [{villageId:'1', villageNo: 1, villageName: 'บ้านหนองหลุบ'}];
  
  constructor() {
    super();
    this.bean = new VillageBean();
    let _self = this;
    this.settings = this.getTabelSetting({
      villageNo: {
        title: 'หมู่ที่' ,
        filter: false,
         width: '80px',
      },
      villageName: {
        title: 'ชื่อหมู่บ้าน',
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
          });
        }
      }
              

    });
   }

  ngOnInit() {
    this.source = super.ng2STDatasource(this.datas);
  }

  onModalForm(){
    this.bean = new VillageBean();
    $('#modalForm').modal('show');
  }
  onClickAdd(){
    this.onModalForm();
  }
}
