import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../../action-custom-table/action-custom-view.component';
import { OSMBean } from '../../../../beans/osm.bean';
import { ApiHTTPService } from '../../../../service/api-http.service';
declare var $:any;
@Component({
  selector: 'app-management-staff-osm-list',
  templateUrl: './management-staff-osm-list.component.html',
  styleUrls: ['./management-staff-osm-list.component.css']
})
export class ManagementStaffOsmListComponent extends BaseComponent implements OnInit {

  public api: ApiHTTPService = new ApiHTTPService();
  public settings: any;
  public bean: OSMBean;
  public datas: any = [{citizenId: '1411022039443', genderCode: '2', villageNo: '3', firstName: 'มนีแมน', lastName: 'แสนรักษ์', fullName: 'นายมนีแมน แสนรักษ์', prefixCode: '001', prefixName: 'นาย'}, {citizenId: '9811022039000', genderCode: '1', villageNo: '1', firstName: 'สมศรี', lastName: 'สองห้องนะ', fullName: 'นายสมศรี สองห้องนะ', prefixCode: '002', prefixName: 'นาย'}];
  public source: LocalDataSource;
  public villageList: any=[];
  public searchName: string;
  public searchVillageId: string = '';

  constructor() { 
    super();
    this.bean = new OSMBean();
    let _self = this;
    this.settings = this.getTableSetting({
      villageNo : { title: 'หมู่บ้าน' ,filter: false, with: '140px'},
      fullName: {title: this.getLabel('lbl_firstName') +' - '+this.getLabel('lbl_lastName'), filter: false},
      citizenId: {title: this.getLabel('lbl_citizenid'), filter: false},
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
            _self.bean = _self.cloneObj(row);
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
    this.setUpTable();
    this.setUpVillage();
  }

  setUpTable(){
    this.source = super.ng2STDatasource(this.datas);
  }
  setUpVillage(){
    
    let _self = this;
    this.api.api_villageList(this.getHospitalCode(),function(list){
      console.log(list);
      _self.villageList = list;
     
    });
  }
  onClickAdd(){
    this.bean = new OSMBean();
    this.bean.prefixCode = '';
    this.bean.villageId = '';
    this.bean.genderId = '';
    this.onModalForm();
  }
  onModalForm(){
    $('#modalForm').modal('show');
  }

  onSearch(){

  }
}
