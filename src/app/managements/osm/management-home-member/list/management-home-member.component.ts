import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../../action-custom-table/action-custom-view.component';
import { Service_HomeMember } from '../../../../service/service-home-member';
import { ActivatedRoute } from '@angular/router';
import { PersonalBasicBean } from '../../../../beans/personal-basic.bean';
import { Address } from '../../../../beans/address';


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
  public source: LocalDataSource = new LocalDataSource();
  public api: Service_HomeMember;
  public homeInfo: any;
  public isShowInfo: boolean = false;
  public homeId: string;
  public address: Address;

  constructor(private activatedRoute: ActivatedRoute, private changeRef: ChangeDetectorRef) { 
    super();
    this.bean = new PersonalBasicBean();
    this.api = new Service_HomeMember();
    this.address = new Address();
    let _self = this;
    this.settings = this.getTableSetting({
      fullName: {
        title: "ชื่อ - สกุล",
        filter: false
      },
      citizenId: {
        title: "เลขประจำตัวประชาชน",
        filter: false,
        width: '200px',
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+_self.formatCitizenId(cell)+'</div>'
        }
      },
      genderName:{
        title: "เพศ",
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      age:{
        title: "อายุ",
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      familyStatusName: {
        title: "สถานะผู้อยู่อาศัย",
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
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
       
          instance.view.subscribe(row => {
            _self.message_error('','<h3>ยังดูไม่ได้ครับ รอแป๊บ..</h3>');
           });
           instance.edit.subscribe(row => {
            _self.bean = _self.cloneObj(row);
            console.log(_self.bean);
            _self.onModalShow(_self.ass_action.EDIT);
           });
           instance.delete.subscribe(row => {
            _self.message_error('','<h3>ยังลบไม่ได้ครับ รอแป๊บ..</h3>');
           });
        }
      }
    });
  }

  ngOnInit() {
    let _self = this;
    this.activatedRoute.params.subscribe(params => {
      _self.homeId = params['homeId'];

      _self.setupHomeInfo();
      _self.setupMemberList();
    });
  }

  setupHomeInfo(){
    let _self = this;
    _self.api.api_HomrInfo(_self.homeId, function(response){ 
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
  setupMemberList(){
    let _self = this;
    _self.loading = true;
    this.api.getList(_self.homeId, function(response){
      _self.source = _self.ng2STDatasource(response);
      _self.loading = false;
    });
  }
  onModalShow(action){
    this.action = action;
    if(action == this.ass_action.ADD){
      this.bean = new PersonalBasicBean();
      this.bean.homeId = this.homeId;
    }else{
      
    }
    this.changeRef.detectChanges();
    $('#modalForm').modal();
  }
  onClickAdd(){
    this.onModalShow(this.ass_action.ADD);
  }

  onSaveCallback(event: any){
    console.log(event);
    if(event.success){
      this.setupMemberList();
    }
  }
}