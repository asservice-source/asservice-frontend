import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HomeBean } from '../../../../beans/home.bean';
import { BaseComponent } from '../../../../base-component';
import { ApiHTTPService } from '../../../../service/api-http.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../../action-custom-table/action-custom-view.component';
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
  public source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router) { 
    super();
    this.bean = new HomeBean();
    this.api = new Service_Home();
    let _self = this;
    this.settings = this.getTableSetting({
      homeNo: {
        title: "บ้านเลขที่",
        filter: false,
        width: '120px',
      },
      holderFullName:{
        title: "เจ้าบ้าน",
        filter: false,
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
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
       
          instance.view.subscribe(row => {
            _self.message_error('','<h3>ยังดูไม่ได้ครับ รอแป๊บ..</h3>');
           });
           instance.edit.subscribe(row => {
            _self.bean = _self.cloneObj(row);
            _self.onModalForm(_self.ass_action.EDIT);
           });
           instance.delete.subscribe(row => {
            _self.message_error('','<h3>ยังลบไม่ได้ครับ รอแป๊บ..</h3>');
           });
          instance.action.subscribe((row, cell) => {
            console.log(row);
          });
        }
      }
    });
  }

  ngOnInit() {
    this.setupHomeList();
  }
  setupHomeList(){
    let villageId = "11";
    let osmId = "";//"2A13A59B-BAC2-E711-AB84-005056C00008";
    let _self = this;
    _self.loading = true;
    this.api.getList(villageId, osmId, function(response){
      _self.source = _self.ng2STDatasource(response);
      _self.loading = false;
    });
  }
  onModalForm(action:string){
    this.action = action;
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
    this.onModalForm(this.ass_action.ADD);
  }

  onSuccess(event:any){
    console.log("ON-SUCCESS");
    console.log(event);
    if(event.success){
      this.setupHomeList();
      $('#modalForm').modal('hide');
    }
    
  }

  onMemberManage(row: any){
    this.router.navigate(['main/managements/osm/home/member',row.homeId]);
    //location.href='main/managements/osm/home/member/1';
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
