import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
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

  @Input() bean: HomeBean;
  public action: string;
  public api: Service_Home;
  public settings: any;
  public source: LocalDataSource;
  public loading: boolean = false;
  public isStaff: boolean = false;
  public homeList: Array<any>;

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private changeRef: ChangeDetectorRef) { 
    super();

    this.api = new Service_Home();
    this.isStaff = this.isStaffRole(this.userInfo.roleId);
    this.settingColumn();
    
  }

  ngOnInit() {

    this.bindModalForm();
    this.$bindEvent();
  }

  setupTable(){
    console.log('xsetupTablex');
    console.log(this.bean);
    let _self = this;
    _self.loading = true;
      _self.api.getHomeWithoutOSM(_self.bean.villageId, function(response){
        _self.loading = false;
        _self.homeList = response;
        //_self.source = _self.ng2STDatasource(response);
        //_self.changeRef.detectChanges();
      })
  }
  onSave(){
    let _self = this;
    let options = $('#selectColumnList').find('option');
    let strHome = '';
    let idx = 0;
    let homeIds: Array<any> = new Array<any>();
    let dataObj = {"osmId": this.bean.osmId, "list": homeIds};

    for(let item of options){
      homeIds.push({"id":item.value});
      idx++;
      strHome += idx + '. ' + item.text + '<br>'
      
    }
    if(homeIds.length <= 0){
      this.message_error('','กรุณาเลือกอย่างน้อย 1 บ้านเลขที่');
    }else{
      this.message_comfirm('','ต้องการเพิ่มบ้านเลขที่ดังต่อไปนี่ ใช่หรือไม่ ? <br><b>'+strHome+'<b>', function(isConfirm){
        console.log(dataObj);
        if(isConfirm){
          _self.api.commit_UpdateOSMHomes(dataObj, function(resp){
            console.log(resp);
          });
        }
      });
    }
    
  }
  bindModalForm(){
    console.log('bindModalForm');
    let _self = this;
    $('#modalFormHomeWithoutOSM').on('show.bs.modal', function(){
      console.log('modalFormHomeWithoutOSM');
      _self.setupTable();
    });

  }
  $bindEvent(){
    $('#addPop').click(function () {
      $("#selectColumnList").removeClass("error");
    $("#selectColumnListError").hide();
    $("#comlumnListError").hide();
       if ($('#comlumnList option:selected').val() != null) {
           var tempSelect = $('#comlumnList option:selected').val();
           $('#comlumnList option:selected').remove().appendTo('#selectColumnList');
           $("#comlumnList").attr('selectedIndex', '-1').find("option:selected").removeAttr("selected");
           $("#selectColumnList").attr('selectedIndex', '-1').find("option:selected").removeAttr("selected");
           $("#selectColumnList").val(tempSelect);
           tempSelect = '';
          
       } else {
         $("#comlumnListError").show();
       }
   });

   $('#removePop').click(function () {
      $("#selectColumnListError").hide();
      $("#comlumnListError").hide();
       if ($('#selectColumnList option:selected').val() != null) {
           var tempSelect = $('#selectColumnList option:selected').val();
           $('#selectColumnList option:selected').remove().appendTo('#comlumnList');
           $("#selectColumnList").attr('selectedIndex', '-1').find("option:selected").removeAttr("selected");
           $("#comlumnList").attr('selectedIndex', '-1').find("option:selected").removeAttr("selected");
         
           $("#comlumnList").val(tempSelect);
           tempSelect = '';
          
       } else {
         $("#selectColumnListError").show();
       }
   });
  }
  settingColumn(){
    let _self = this;
    this.settings = this.getTableSetting({
      homeNo: {
        title: "บ้านเลขที่",
        filter: false,
        width: '100px'
      },
      holderFullName: {
        title: "เจ้าบ้าน",
        filter: false,
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
