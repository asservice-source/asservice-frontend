import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeBean } from '../../../../beans/home.bean';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { Service_Home } from '../../../../api-managements/service-home';
import { ViewCell } from 'ng2-smart-table';

declare var $:any;
@Component({
  selector: 'app-management-home-without-osm',
  templateUrl: './management-home-without-osm.component.html',
  styleUrls: ['./management-home-without-osm.component.css']
})
export class ManagementHomeFormWithoutOSMComponent extends BaseComponent implements OnInit {

  public bean: HomeBean;
  public action: string;
  public api: Service_Home;
  public settings: any;
  public source: LocalDataSource;
  public loading: boolean = false;
  public isStaff: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private changeRef: ChangeDetectorRef) { 
    super();
    
    this.bean = new HomeBean();
    this.api = new Service_Home();
    this.isStaff = this.isStaffRole(this.userInfo.roleId);

    this.settingColumn();
  }

  ngOnInit() {
    let _self = this;
  }

  settingColumn(){
    let _self = this;
    this.settings = this.getTableSetting({
      homeNo: {
        title: "บ้านเลขที่",
        filter: false,
        width: '100px'
      }
    });
  }
}

// @Component({
//     selector: 'app-view-child-table-home-management',
//     template: '<div class="text-center"><button *ngIf="isHome" type="button" (click)="onClick()" class="btn btn-sm btn-primary">จัดการสมาชิก</button></div>',
//     styles: ['']
//   })
//   export class ViewChildTableHomeManagement implements OnInit ,ViewCell{
//     renderValue: string;
//     @Input() value: string | number;
//     @Input() rowData: any;
//     @Output() click: EventEmitter<any> = new EventEmitter();
//     public isHome: boolean = false;
//     private baseComponent: BaseComponent;
//     ngOnInit() {
//       this.baseComponent = new BaseComponent();
//       this.renderValue = this.value.toString();
//       if(this.baseComponent.isHomeType(this.rowData.homeTypeCode)){
//         this.isHome = true;
//       }else{
//         this.isHome = false;
//       }
//     }
//     onClick() {
//       this.click.emit(this.rowData);
//     }
//   }
