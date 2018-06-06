import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeBean } from '../../../../beans/home.bean';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource, ViewCell } from '../../../../ng2-smart-table';
import { ActionCustomViewMapsComponent } from '../../../../action-custom-table/action-custom-view.component';
import { Service_Home } from '../../../../api-managements/service-home';

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
  public infoMaps: string = '';
  public params: any;
  public villageNo: string = '';
  public osmName: string = '';
  public param_reset: number = 1;
  public latitude: string = '';
  public longitude: string = '';

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private changeRef: ChangeDetectorRef) {
    super();

    this.bean = new HomeBean();
    this.api = new Service_Home();
    this.isStaff = this.isStaffRole(this.userInfo.roleId);
    this.findTypeCode = '';
    this.settingColumn();
  }

  ngOnInit() {
    let _self = this;
    _self.setupHomeTypeList();
    _self.activatedRoute.params.subscribe(params => {
      _self.params = params;
      if(params['type']=='PD'){
        // เจ้าหน้าที่ รพ.สต. เข้าใช้งานหน้าจอจัดการหมู่บ้าน
        _self.loading = true;
        _self.api.api_PersonByPersionId(params['id'], function(resp){
          let response = resp.response;
          if(resp && resp.status.toUpperCase() == 'SUCCESS'){
            _self.villageNo = response.villageNo;
            _self.osmName = response.fullName;
            _self.findVillageId = response.villageId;
            _self.findOsmId = response.personId;
            _self.setupTable();
          }else{
            _self.loading = false;
            _self.message_servNotRespond('','ไม่สามารถติดต่อ Server ได้ในขณะนี้' ,function(){
              _self.route.navigate(['main']);
            });
          }

        });
      }else if(params['type']=='T' && _self.isOsmRole(_self.userInfo.roleId)){
        // เจ้าหน้าที่ อสม. เข้าใช้งานหน้าจอจัดการหมู่บ้าน
        _self.villageNo = _self.userInfo.villageNo;
        _self.osmName = _self.userInfo.fullName;
        _self.findVillageId = _self.userInfo.villageId;
        _self.findOsmId = _self.userInfo.personId;
        _self.setupTable();

      }else{
        _self.route.navigate(['main']);
      }
    });
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
    if(this.isStaff){
      this.bean.osmId = this.findOsmId;
      this.bean.villageId = this.findVillageId;
    }else{
      this.bean.villageId = this.userInfo.villageId;
      this.bean.osmId = this.userInfo.personId;
    }
    this.changeRef.detectChanges();
    $('#modalFormHome').modal('show');
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
  onAddWithoutOSM(){
    this.bean = new HomeBean();
    this.bean.villageId =  this.findVillageId;
    this.bean.osmId =  this.findOsmId;
    this.changeRef.detectChanges();
    $('#modalFormHomeWithoutOSM').modal('show');
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
    let _self = this;
    _self.loading = true;
    _self.api.getHomeByID(row.homeId, function(resp){
      _self.loading = false;
      let response = resp.response;
      if(response && resp.status.toUpperCase()=='SUCCESS'){
        _self.latitude = response.latitude;
        _self.longitude = response.longitude;
      }else{
        _self.latitude = row.latitude;
        _self.longitude = row.longitude;
      }

      if(_self.isHomeType(row.homeTypeCode)){
        _self.infoMaps = 'บ้านเลขที่ ' + row.homeNo
      }else{
        _self.infoMaps = row.name;
      }
      _self.param_reset +=1;
      _self.changeRef.detectChanges();
      $('#modalMaps').modal('show');
    });

  }
  onDelelteHome(row: any){
    let _self = this;
    let msg = 'ต้องการลบ';
    let msgType = '';
    if(this.isHomeType(row.homeTypeCode)){
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
            _self.message_success('','ลบ ' + msg + ' เรียบร้อย', function(){
              $('#btnSearch').click();
            });
          }else{
            _self.message_error('','ไม่สามารถลบ ' + msg);
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
        $('#btnSearch').click();
      })

    }else{
      _self.message_error('', event.message);
    }

  }
  onUpdateOSMHome(event: any){
    if(event.success){
      $('#btnSearch').click();
    }
  }

  onMemberManage(row: any){
    if(this.isHomeType(row.homeTypeCode)){
      this.route.navigate(['main/managements/osm/home/member/H',row.homeId]);
    }else{
      return;
    }

  }
  onSearchFilter(){
    this.setupTable();
  }
  onClearFilter(){
    this.findTypeCode = '';
    // if(this.isStaff){
    //   this.findVillageId = '';
    //   this.findOsmId = '';
    // }
  }
  onBack(){
    this.route.navigate(['main/managements/staff/osm']);
  }
  settingColumn(){
    let _self = this;
    this.settings = this.getTableSetting({
      homeNo: {
        title: "บ้านเลขที่",
        filter: false,
        width: '100px',
      },
      homeTypeName:{
        title: "ประเภท",
        width: '140px',
        filter: false,
        type: "html",
        valuePrepareFunction: (cell, row) => {
          let value = '';
          if(this.isHomeType(row.homeTypeCode)){
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
          if(this.isHomeType(row.homeTypeCode)){
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
    template: '<div class="text-center"><button *ngIf="isHome" type="button" (click)="onClick()" class="btn btn-sm btn-primary">จัดการสมาชิก</button></div>',
    styles: ['']
  })
  export class ViewChildTableHomeManagement implements OnInit ,ViewCell{
    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;
    @Output() click: EventEmitter<any> = new EventEmitter();
    public isHome: boolean = false;
    private baseComponent: BaseComponent;
    ngOnInit() {
      this.baseComponent = new BaseComponent();
      this.renderValue = this.value.toString();
      if(this.baseComponent.isHomeType(this.rowData.homeTypeCode)){
        this.isHome = true;
      }else{
        this.isHome = false;
      }
    }
    onClick() {
      this.click.emit(this.rowData);
    }
  }
