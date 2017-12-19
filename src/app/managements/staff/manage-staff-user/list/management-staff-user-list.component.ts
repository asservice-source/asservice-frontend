import { Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomView_2_Component } from '../../../../action-custom-table/action-custom-view.component';
import { StaffUserBean } from '../../../../beans/staff-user.bean';
import { ApiHTTPService } from '../../../../service/api-http.service';
import { Service_UserStaffAndOSM } from '../../../../service/service-user-staff-osm';
import { ActivatedRoute } from '@angular/router';
import { HomeBean } from '../../../../beans/home.bean';

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
  public source: LocalDataSource;
  public villageList: any=[];
  public searchName: string;
  public searchVillageId: string = '';
  public isStaff: boolean= false;
  public titlePanel: string = '';
  public loading: boolean = false;
  private tempBean: StaffUserBean;

  constructor(private element: ElementRef,private activatedRoute: ActivatedRoute, private detectChange: ChangeDetectorRef) { 
    super();
    this.api = new Service_UserStaffAndOSM();
    this.bean = new StaffUserBean();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let _self = this;
      this.settings = this.getTableSetting({
         fullName: {title: this.getLabel('lbl_firstName') +' - '+this.getLabel('lbl_lastName'), filter: false},
         citizenId: {
           title: this.getLabel('lbl_citizenid')
           , filter: false
           ,type: "html"
           ,valuePrepareFunction: (cell, row) => { 
             return _self.formatCitizenId(cell);
             }
          },
         villageNo : {
           title: 'หมู่บ้าน' 
           ,filter: false
           , with: '150px'
           ,type: "html"
           ,valuePrepareFunction: (cell, row) => { 
             return 'หมู่ที่ '+ cell + ' ' + row.villageName;
             }
          },
          isActive : {
            title: 'สถานะผู้ใช้' 
            ,filter: false
            , with: '120px'
            ,type: "html"
            ,valuePrepareFunction: (cell, row) => { 

              return cell?'<div class="text-active text-center">พร้อมใช้งาน</div>':'<div class="text-inactive text-center">ปิดการใช้งาน</div>';
              }
           },
          action: {
           title: this.getLabel('lbl_action'),
           filter: false,
           sort: false,
           width: '100px',
           type: 'custom',
           renderComponent: ActionCustomView_2_Component,
           onComponentInitFunction(instance) {
              instance.edit.subscribe(row => {
                _self.tempBean = row;
                _self.bean = _self.cloneObj(row);
                _self.onModalForm(_self.ass_action.EDIT);
              });
              instance.delete.subscribe(row => {
                _self.onClickDelete(row);
              });
             instance.action.subscribe((row, cell) => {
               console.log(row);
             });
           }
         }
       });

      this.titlePanel = 'การจัดการ เจ้าหน้าที่';
      let roleName = params['roleName'];
      console.log("roleName >>> " + roleName);
      if('staff'==roleName){
        this.isStaff = true;
        this.titlePanel += " รพ.สต.";
        delete this.settings.columns.villageNo;
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
        _self.source = _self.ng2STDatasource(response);
        _self.detectChange.detectChanges();

      });
    }else{
      this.api.osm_findList(_self.searchName, _self.searchVillageId, function(response){
        _self.loading = false;
        _self.source = _self.ng2STDatasource(response);
        _self.detectChange.detectChanges();
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
  onClickDelete(row:any): any{
    let _self = this;
    console.log("= = Click Delete = =");
    console.log(row);
    if(_self.userInfo.userId==row.userId){
      _self.message_error('','ไม่สามารถลบตัวเองได้');
      return false;
    }

    _self.message_comfirm('','ต้องการลบ <b>' + row.fullName +'</b> ใช่หรือไม่',function(result){
      if(result){
        _self.loading = true;
        _self.api.commit_del(row.userId, function(response){
          _self.loading = false;
          if(response && response.status.toString().toUpperCase()=='SUCCESS'){
            _self.message_success('','ลบ <b>' + row.fullName +'</b> เรียบร้อย' , function(){
              _self.setupTable();
            });
          }else{
            _self.message_error('','ไม่สามารถลบ <b>' + row.fullName +'</b> ได้' );
          }
         });
      }
    });
  }
  onModalForm(action: string){
    if(this.ass_action.EDIT==action){

    }else if(this.ass_action.ADD==action){
      this.bean = new StaffUserBean();
      this.bean.personId = '';
      this.bean.citizenId = '';
      this.bean.firstName = '';
      this.bean.lastName = '';
      this.bean.prefixCode = '';
      this.bean.villageId = '';
      this.bean.genderId = '';
      this.bean.birthDate = '';
      this.bean.isActive = true;
    }
    this.action = action;
    console.log("CCCCCCCCCCCC . ."+this.action);
    
    this.detectChange.detectChanges();
    $('#modalForm').modal('show');
  }

  onSearch(){
    this.setupTable();
  }
  
  onCompleted(event: any){
    console.log(event);
    let _self = this;
    if(event.success){
      _self.message_success('',event.message, function(){
        _self.setupTable();
      });
    }else{
      _self.message_error('',event.message);
    }
  }

}
