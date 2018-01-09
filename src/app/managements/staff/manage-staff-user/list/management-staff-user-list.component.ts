import { Component, OnInit, ChangeDetectorRef, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { ActionCustomView_2_Component } from '../../../../action-custom-table/action-custom-view.component';
import { StaffUserBean } from '../../../../beans/staff-user.bean';
import { Service_UserStaffAndOSM } from '../../../../api-managements/service-user-staff-osm';
import { ActivatedRoute } from '@angular/router';
import { HomeBean } from '../../../../beans/home.bean';
import { PersonalBasicBean } from '../../../../beans/personal-basic.bean';
import { Router } from '@angular/router';

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
  public datas: any;
  public villageList: any=[];
  public searchName: string;
  public searchVillageId: string = '';
  public isStaff: boolean= false;
  public titlePanel: string = '';
  public loading: boolean = false;

  constructor(private element: ElementRef,private activatedRoute: ActivatedRoute, private route: Router, private detectChange: ChangeDetectorRef) { 
    super();
    this.api = new Service_UserStaffAndOSM();
    this.bean = new StaffUserBean();
    
  }

  ngOnInit() {

    this.source = new LocalDataSource(this.datas);
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
           manage: {
            title: 'เขตรับผิดชอบ',
            filter: false,
            sort: false,
            width: '160px',
            type: 'custom',
            renderComponent: ActionCustomView_StaffManageOSMScopeComponent,
            onComponentInitFunction(instance) {
              instance.manage.subscribe(row => {
                _self.onClickManageScope(row);
              });
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
                _self.onClickEdit(row);
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

      this.titlePanel = 'จัดการเจ้าหน้าที่';
      let roleName = params['roleName'];
      if('staff'==roleName){
        this.isStaff = true;
        this.titlePanel += " รพ.สต.";
        delete this.settings.columns.villageNo;
        delete this.settings.columns.manage;
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
        _self.setDatas(response);

      });
    }else{
      this.api.osm_findList(_self.searchName, _self.searchVillageId, function(response){
        _self.loading = false;
        _self.setDatas(response);
      });
    }
    
  }
  setDatas(response){
    this.datas = response;
    this.source.load(this.datas);
    this.detectChange.detectChanges();
    this.source.refresh();
  }
  setupVillage(){
    
    let _self = this;
    this.api.api_villageList(this.getHospitalCode(),function(list){
      _self.villageList = list;
     
    });
  }
  
  onClickManageScope(row: any){
    console.log(row);
    this.route.navigate(['main/managements/osm/home','PD', row.personId]);
  }
  
  onSearch(){
    this.setupTable();
  }
  onClearFilter(){
    this.searchName = '';
    this.searchVillageId = '';
  }

  onClickAdd(){
    this.onModalForm(this.ass_action.ADD);
  }
  onClickEdit(row: any){
    let _self = this;
    _self.loading = true;
    _self.api.getUserById(row.userId, function(resp){
      _self.loading = false;
      let response = resp.response;
      if(response && resp.status.toUpperCase()=='SUCCESS'){
        _self.bean = response;
        _self.onModalForm(_self.ass_action.EDIT);
      }else{
        _self.message_servNotRespond('', resp.status + ' : ' + resp.message);
      }
    });
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
    this.detectChange.detectChanges();
    $('#modalForm').modal('show');
  }

  
  onCompleted(event: any){
    console.log(event);
    let _self = this;
    if(event.success){
      _self.message_success('',event.message, function(){
        //_self.setupTable();

        $('#btnSearch').click();

      });
    }else{
      _self.message_error('',event.message);
    }
  }

}
@Component({
  selector: 'action-custom-table-view-manage-scope',
  template: '<div style="width:100%; text-align: center;" ><button *ngIf="isActive" type="button" (click)="onManage()" class="btn btn-sm btn-primary">จัดการ</button></div>',
  styleUrls: ['./management-staff-user-list.component.css']
})
export class ActionCustomView_StaffManageOSMScopeComponent implements ViewCell, OnInit {
    @Input() value: string | number;
    @Input() rowData: any;
    @Output() manage: EventEmitter<any> = new EventEmitter();
    public isActive: boolean = true;
    ngOnInit(): void {
      this.isActive = this.rowData.isActive;
    }
    onManage(){
      this.manage.emit(this.rowData);
    }
    
}
