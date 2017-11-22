import { Component, OnInit } from '@angular/core';
import { HomeBean } from '../../../../beans/home.bean';
import { BaseComponent } from '../../../../base-component';
import { ApiHTTPService } from '../../../../service/api-http.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../../action-custom-table/action-custom-view.component';

declare var $:any;
@Component({
  selector: 'app-management-home',
  templateUrl: './management-home.component.html',
  styleUrls: ['./management-home.component.css']
})
export class ManagementHomeComponent extends BaseComponent implements OnInit {

  public bean: HomeBean;
  public action: string;
  public api: ApiHTTPService = new ApiHTTPService();
  public settings: any;
  public source: LocalDataSource = new LocalDataSource();

  constructor() { 
    super();
    this.bean = new HomeBean();
    let _self = this;
    this.settings = this.getTableSetting({
      homeNo: {
        title: "บ้านเลขที่",
        filter: false,
        width: '120px',
      },
      holderName:{
        title: "เจ้าบ้าน",
        filter: false,
      },
      memberAmont:{
        title: "จำนวนสมาชิก",
        filter: false,
        width: '160px',
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
    this.setupHomeList();
  }
  setupHomeList(){
    //TODO Call API HomeList
  }
  onModalForm(action:string){
    this.action = action;
    $('#modalForm').modal();
  }
  onAdd(){
    this.bean = new HomeBean();
    this.bean.homeRegisterId = "";
    this.bean.homeNo = "";
    this.bean.soi = "";
    this.bean.road = "";
    this.bean.latitude = "";
    this.bean.longitude = "";
    this.onModalForm(this.ass_action.ADD);
  }
}
