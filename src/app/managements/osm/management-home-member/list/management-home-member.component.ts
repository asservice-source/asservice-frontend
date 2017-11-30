import { Component, OnInit} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../../action-custom-table/action-custom-view.component';
import { Service_HomeMember } from '../../../../service/service-home-member';
import { ActivatedRoute } from '@angular/router';


declare var $:any;
@Component({
  selector: 'app-management-home-member',
  templateUrl: './management-home-member.component.html',
  styleUrls: ['./management-home-member.component.css']
})
export class ManagementHomeMemberComponent extends BaseComponent implements OnInit {


  public settings: any;
  public source: LocalDataSource = new LocalDataSource();
  public api: Service_HomeMember;
  public homeInfo: any;
  public isShowInfo: boolean = false;
  constructor(private activatedRoute: ActivatedRoute) { 
    super();
    this.api = new Service_HomeMember();
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
            console.log(row);
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
      let homeId = params['homeId'];

      _self.setupHomeInfo(homeId);
      _self.setupMemberList(homeId);
    });
  }

  setupHomeInfo(homeId: any){
    let _self = this;
    _self.api.api_HomrInfo(homeId, function(response){

      _self.homeInfo = response.response;
      _self.isShowInfo = true;
    });
    
  }
  setupMemberList(homeId: any){
    let _self = this;
    _self.loading = true;
    this.api.getList(homeId, function(response){
      _self.source = _self.ng2STDatasource(response);
      _self.loading = false;
    });
  }
  
}