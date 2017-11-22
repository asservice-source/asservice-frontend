import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../../action-custom-table/action-custom-view.component';
import { StaffUserBean } from '../../../../beans/staff-user.bean';
import { ApiHTTPService } from '../../../../service/api-http.service';
import { Service_UserStaffAndOSM } from '../../../../service/service-user-staff-osm';
import { ActivatedRoute } from '@angular/router';
declare var $:any;
declare var bootbox:any;
@Component({
  selector: 'app-management-staff-user-list',
  templateUrl: './management-staff-user-list.component.html',
  styleUrls: ['./management-staff-user-list.component.css']
})
export class ManagementStaffUserListComponent extends BaseComponent implements OnInit {

  public api: Service_UserStaffAndOSM;
  public action: string;
  public settings: any;
  public bean: StaffUserBean;
  public datas: any = [{citizenId: '1411022039443', genderCode: '2', villageNo: '3', firstName: 'มนีแมน', lastName: 'แสนรักษ์', fullName: 'นายมนีแมน แสนรักษ์', prefixCode: '001', prefixName: 'นาย'}, {citizenId: '9811022039000', genderCode: '1', villageNo: '1', firstName: 'สมศรี', lastName: 'สองห้องนะ', fullName: 'นายสมศรี สองห้องนะ', prefixCode: '002', prefixName: 'นาย'}];
  public source: LocalDataSource;
  public villageList: any=[];
  public searchName: string;
  public searchVillageId: string = '';
  public isStaff: boolean= false;
  public titlePanel: string = '';

  constructor(private activatedRoute: ActivatedRoute) { 
    super();
    this.api = new Service_UserStaffAndOSM();
    this.bean = new StaffUserBean();
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
            _self.onModalForm(_self.ass_action.EDIT);
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
    this.activatedRoute.params.subscribe(params => {
      this.titlePanel = 'การจัดการ เจ้าหน้าที่';
      let roleName = params['roleName'];
      console.log("roleName >>> " + roleName);
      if('staff'==roleName){
        this.isStaff = true;
        this.titlePanel += " รพ.สต.";
        this.setupTable();
      }else if('osm'==roleName){
        this.isStaff = false;
        this.titlePanel += " อสม.";
        this.setupTable();
        this.setupVillage();
      }else{
        bootbox.alert('ข้อมูลไม่ถูกต้อง',function(){
          location.href = '/';
        });
      }
    });
  }

  setupTable(){
    let _self = this;
    _self.loading = true;
    if(this.isStaff){
      this.api.staff_findList(_self.searchName,  function(response){
        _self.loading = false;
        _self.datas = response;
        _self.source = _self.ng2STDatasource(_self.datas);
        
      });
    }else{
      this.api.osm_findList(_self.searchName, _self.searchVillageId, function(response){
        _self.loading = false;
        _self.datas = response;
        _self.source = _self.ng2STDatasource(_self.datas);
        
      });
    }
    
    
  }
  setupVillage(){
    
    let _self = this;
    this.api.api_villageList(this.getHospitalCode(),function(list){
      console.log(list);
      _self.villageList = list;
     
    });
  }
  onClickAdd(){
    this.onModalForm(this.ass_action.ADD);
  }
  onModalForm(action: string){
    if(this.ass_action.EDIT==action){
      this.bean.birthDate = this.getCurrentDatePickerModel(this.bean.birthDate);
    }else if(this.ass_action.ADD==action){
      this.bean = new StaffUserBean();
      this.bean.citizenId = '';
      this.bean.firstName = '';
      this.bean.lastName = '';
      this.bean.prefixCode = '';
      this.bean.villageId = '';
      this.bean.genderId = '';
      this.bean.birthDate = '';
    }
    this.action = action;
    $('#modalForm').modal('show');
  }

  onSearch(){
    this.setupTable();
  }
  
  onSuccess(event: any){
    console.log(event);
    if(event.success){
      this.setupTable();
    }
  }
}
