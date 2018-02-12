import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomView_2_Component } from '../../../../action-custom-table/action-custom-view.component';
import { Service_HomeMember } from '../../../../api-managements/service-home-member';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalBasicBean } from '../../../../beans/personal-basic.bean';
import { Address } from '../../../../beans/address';
import { AppComponent } from '../../../../app.component';


declare var $:any;
@Component({
  selector: 'app-management-home-member',
  templateUrl: './management-home-member.component.html',
  styleUrls: ['./management-home-member.component.css']
})
export class ManagementHomeMemberComponent extends BaseComponent implements OnInit {

  public bean: PersonalBasicBean;
  public action: string;
  public settings: any;
  public deadSettings: any;
  public source: LocalDataSource;
  public deadSource: LocalDataSource;
  public api: Service_HomeMember;
  public homeInfo: any;
  public isShowInfo: boolean = false;
  public homeId: string;
  public address: Address;
  public loading: boolean = false;
  public isStaff: boolean;
  public isShowDeadList: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private changeRef: ChangeDetectorRef) { 
    super();
    this.source = new LocalDataSource();
    this.deadSource = new LocalDataSource();
    this.bean = new PersonalBasicBean();
    this.api = new Service_HomeMember();
    this.address = new Address();
    if(this.isStaffRole(this.userInfo.roleId)){
      this.isStaff = true;
    }else{
      this.isStaff = false;
    }
    this.settingColumns();
  }

  ngOnInit() {
    let _self = this;
    this.activatedRoute.params.subscribe(params => {
      _self.homeId = params['homeId'];

      _self.setupHomeInfo();
      _self.setupTable();
    });
  }

  setupHomeInfo(){
    let _self = this;
    _self.api.api_HomeInfo(_self.homeId, function(response){ 
      _self.isShowInfo = true;
      _self.homeInfo = response.response;
      _self.address.homeNo = _self.homeInfo.homeNo;
      _self.address.mooNo = _self.homeInfo.villageNo;
      _self.address.road = _self.homeInfo.road;
      _self.address.tumbolCode = _self.homeInfo.tumbolCode;
      _self.address.amphurCode = _self.homeInfo.amphurCode;
      _self.address.provinceCode = _self.homeInfo.provinceCode;
    });
    
  }
  setupTable(){
    let _self = this;
    _self.loading = true;
    _self.api.getList(_self.homeId, true, function(response){
      let members = [];
      let deadMembers = [];
      for(let item of response){
        if(!item.isDead){
          members.push(item);
        }else{
          deadMembers.push(item);
        }
      }
      _self.source = _self.ng2STDatasource(members);
      if(deadMembers.length>0){
        _self.isShowDeadList = true;
        _self.deadSource = _self.ng2STDatasource(deadMembers);
      }else{
        _self.isShowDeadList = false;
      }
      
      _self.loading = false;
      // detectChangeRef
      $('.ng2-smart-sort').click();
      _self.changeRef.detectChanges();

    });
  }
  onModalShow(action){
    this.action = action;
    this.changeRef.detectChanges();
    $('#modal-management-home-member-form').modal();
  }
  onEdit(row: any){
    let _self = this;
    _self.loading = true;
    _self.api.api_PersonByPersionId(row.personId, function(resp){
      _self.loading = false;
      let response = resp.response;
      if(response && resp.status.toUpperCase()=='SUCCESS'){
        _self.bean = _self.cloneObj(response);
        _self.onModalShow(_self.ass_action.EDIT);
      }else{
        _self.message_servNotRespond('', '');
      }
      
    });
    
  }
  onClickAdd(){
    this.bean = new PersonalBasicBean();
    this.bean.homeId = this.homeId;
    this.changeRef.detectChanges();
    this.onModalShow(this.ass_action.ADD);
  }

  onCompleted(event: any){
    console.log(event);
    let _self = this;
    if(event.success){
      $('#modal-management-home-member-form').modal('hide');
      _self.message_success('',event.message, function(){
        _self.setupTable();
      });
      
    }else{
      _self.message_error('', event.message);
    }
  }

  onDeleteMember(row: any){
    let _self = this;
    _self.message_comfirm('','คุณต้องการลบ '+ row.fullName+' ออกจากบ้านเลขที่ '+row.homeNo+' ใช่หรือไม่?', function(isConf){
      if(isConf){
        _self.loading=true;
        _self.api.delete(row.personId, row.homeId, function(data){
          let response = data.response;
          _self.loading=false;
          _self.changeRef.detectChanges();
          if(response && data.status.toUpperCase()=='SUCCESS'){
            _self.message_success('','ลบสมาชิกเรียบร้อย', function(){
              _self.setupTable();
            });
          }else{
            _self.message_error('', data.message);
          }
        });
      }
    });
  }

  onBack(){
    if(this.isStaff){
      this.router.navigate(['main/managements/osm/home', 'PD', this.homeInfo.osmId]);
    }else{
      this.router.navigate(['main/managements/osm/home','T','01']);
    }
  }
  onBackStaffManageOSM(){
    this.router.navigate(['main/managements/staff/osm']);
  }

  settingColumns(){
    let _self = this;
    this.settings = this.getTableSetting({
      fullName: {
        title: "ชื่อ - สกุล",
        filter: false
      },
      citizenId: {
        title: "เลขประจำตัวประชาชน",
        filter: false,
        width: '180px',
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+_self.formatCitizenId(cell)+'</div>'
        }
      },
      genderName:{
        title: "เพศ",
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      age:{
        title: "อายุ",
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      familyStatusName: {
        title: "สถานะ",
        width: '80px',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
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
       
          // instance.view.subscribe(row => {
          //   _self.message_error('','<h3>ยังดูไม่ได้ครับ รอแป๊บ..</h3>');
          //  });
           instance.edit.subscribe(row => {
            _self.onEdit(row);
            //_self.onModalShow(_self.ass_action.EDIT);
           });
           instance.delete.subscribe(row => {
            _self.onDeleteMember(row);
           });
        }
      }
    });
    this.deadSettings = this.getTableSetting({
      fullName: {
        title: "ชื่อ - สกุล",
        filter: false
      },
      citizenId: {
        title: "เลขประจำตัวประชาชน",
        filter: false,
        width: '180px',
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+_self.formatCitizenId(cell)+'</div>'
        }
      },
      genderName:{
        title: "เพศ",
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      // age:{
      //   title: "อายุ",
      //   filter: false,
      //   type: 'html',
      //   valuePrepareFunction: (cell, row) => { 
      //     return '<div class="text-center">'+cell+'</div>'
      //   }
      // },
      
      birthDate:{
        title: "วัน/เดือน/ปี เกิด",
        filter: false,
        width: '130px',
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+_self.displayFormatDate_Thai(cell)+'</div>'
        }
      },
      deadDate:{
        title: "วันที่เสียชีวิต",
        filter: false,
        width: '130px',
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+_self.displayFormatDate_Thai(cell)+'</div>'
        }
      }
    });

  }
}