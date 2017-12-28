import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HomeBean } from '../../../../beans/home.bean';
import { BaseComponent } from '../../../../base-component';
import { ApiHTTPService } from '../../../../service/api-http.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewMapsComponent } from '../../../../action-custom-table/action-custom-view.component';
import { Service_Home } from '../../../../service/service-home';
import { ViewCell } from 'ng2-smart-table';

declare var $:any;
@Component({
  selector: 'app-management-home',
  templateUrl: './management-home.component.html',
  styleUrls: ['./management-home.component.css']
})
export class ManagementHomeComponent extends BaseComponent implements OnInit {

  public bean: HomeBean;
  public action: string;
  public api: Service_Home;
  public settings: any;
  public source: LocalDataSource;
  public loading: boolean = false;
  public isStaff: boolean = false;
  public findVillageId: string;
  public findOsmId: string;
  public findTypeCode: string;
  public findName: string = '';
  public homeTypeList: any =  [];

  constructor(private router: Router, private changeRef: ChangeDetectorRef) { 
    super();
    this.isStaff = this.isStaffRole(this.userInfo.userId);
    this.bean = new HomeBean();
    this.api = new Service_Home();
    if(!this.isStaff){
      this.findVillageId = this.userInfo.villageId;
      this.findOsmId = this.userInfo.personId;
    }
    this.findTypeCode = '';
    this.settingColumn();
  }

  ngOnInit() {
    
    this.setupHomeTypeList();
    this.setupTable();
  }
  setupTable(){    
    let _self = this;
    _self.loading = true;
    this.api.getList(this.findVillageId, this.findOsmId, this.findTypeCode, this.findName, function(response){
      _self.source = _self.ng2STDatasource(response);
      _self.loading = false;
      _self.changeRef.detectChanges();
    });
  }
  setupHomeTypeList(){
    let _self = this;
    _self.loading=true;
    _self.api.api_HomeTypeList(function(list){
      _self.loading=false;
      _self.homeTypeList = list
      _self.changeRef.detectChanges();
    });
  }
  onModalForm(action:string){
    this.action = action;
    this.changeRef.detectChanges();
    $('#modalForm').modal('show');
  }
  onAdd(){

    this.bean = new HomeBean();
    this.bean.homeId = "";
    this.bean.registrationId = "";
    this.bean.homeNo = "";
    this.bean.soi = "";
    this.bean.road = "";
    this.bean.latitude = "";
    this.bean.longitude = "";
    this.bean.homeTypeCode = "";
    this.onModalForm(this.ass_action.ADD);
  }
  onEdit(homeId: any){
    let _self = this;
    _self.loading = true;
    this.api.getHomeByID(homeId, function(resp){
      _self.loading = false;
      let response = resp.response;
      if(response && resp.status.toUpperCase()=='SUCCESS'){
        _self.bean = response;
        _self.changeRef.detectChanges();
        _self.onModalForm(_self.ass_action.EDIT);
      }
    });
    
  }
  onViewMaps(row: any){
    $('#modalMaps').modal('show');
  }
  onDelelteHome(row: any){
    let _self = this;
    let msg = 'ต้องการลบ';
    let msgType = '';
    let type = row.homeTypeCode;
    if(type=='01' || type=='02' || type=='03' || type=='04' || type=='05'){
      msg += 'บ้านเลขที่ ';
      msgType = '<b>'+ row.homeNo +'</b>';
      
    }else{
      msgType = ' <b>'+ row.name +'</b>';
    }
    msg += msgType + ' ใช่หรือไม่';

    _self.message_comfirm('', msg, function(result){
      if(result){
        _self.loading = true;
        _self.api.commit_del(row.homeId, function(resp){
          _self.loading = false;
          _self.changeRef.detectChanges();
          let response = resp.response;
          if(response && resp.status.toUpperCase() == 'SUCCESS'){
            _self.message_success('','ลบ '+msgType+' เรียบร้อย', function(){
              _self.setupTable();
            });
          }else{
            _self.message_error('','ไม่สามารถลบ'+msgType);
          }
        });
      }
      
    });
    
  }
  onComplete(event:any){
    console.log(event);
    let _self = this;
    if(event.success){
      _self.message_success('', event.message, function(){
        _self.setupTable();
      })
     
    }else{
      _self.message_error('', event.message);
    }
    
  }

  onMemberManage(row: any){
    let type = row.homeTypeCode;
    if(type=='01' || type=='02' || type=='03' || type=='04' || type=='05'){
      this.router.navigate(['main/managements/osm/home/member',row.homeId]);
    }else{
      return;
    }
    
  }
  onSearchFilter(){
    this.setupTable();
  }
  onClearFilter(){
    this.findTypeCode = '';
    if(this.isStaff){
      this.findVillageId = '';
      this.findOsmId = '';
    }
  }
  settingColumn(){
    let _self = this;
    this.settings = this.getTableSetting({
      homeNo: {
        title: "บ้านเลขที่",
        filter: false,
        width: '120px',
      },
      homeTypeName:{
        title: "ประเภท",
        filter: false,
        type: "html",
        valuePrepareFunction: (cell, row) => { 
          let value = '';
          let type = row.homeTypeCode;
          if(type=='01' || type=='02' || type=='03' || type=='04' || type=='05'){
            value = 'บ้าน';
          }else{
            value = cell;
          }
          return value;
        }
      },
      holderFullName:{
        title: "เจ้าบ้าน/ชื่อสถานที่",
        filter: false,
        type: "html",
        valuePrepareFunction: (cell, row) => { 
          let value = '';
          let type = row.homeTypeCode;
          if(type=='01' || type=='02' || type=='03' || type=='04' || type=='05'){
            value = cell;
          }else{
            value = row.name;
          }
          return value;
        }
      },
      choose:{
        title: 'จัดการสมาชิกในบ้าน',
        filter: false,
        sort: false,
        width: '160px',
        type: 'custom',
        renderComponent: ViewChildTableHomeManagement,
        onComponentInitFunction(instance) {  
          instance.click.subscribe(row => {
            
            _self.onMemberManage(row);
            
           });

          }
      },
      action: {
        title: this.getLabel('lbl_action'),
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewMapsComponent,
        onComponentInitFunction(instance) {
       
          instance.maps.subscribe(row => {
            _self.onViewMaps(row);
           });
           instance.edit.subscribe(row => {
            _self.onEdit(row.homeId);
           });
           instance.delete.subscribe(row => {
            _self.onDelelteHome(row);
           });
        }
      }
    });
  }
}

@Component({
    selector: 'app-view-child-table-home-management',
    template: '<div class="text-center"><button type="button" (click)="onClick()" class="btn btn-sm btn-primary">จัดการสมาชิก</button></div>',
    styles: ['']
  })
  export class ViewChildTableHomeManagement implements OnInit ,ViewCell{
    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;
    @Output() click: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
      this.renderValue = this.value.toString();
    }
    onClick() {
      this.click.emit(this.rowData);
    }
  }
