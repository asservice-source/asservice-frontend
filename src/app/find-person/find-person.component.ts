import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { BaseComponent } from "../base-component";
import { PersonBean } from "../beans/person.bean";
import { VillageBean } from '../beans/village.bean';
import { OSMBean } from '../beans/osm.bean';
import { HomeBean } from '../beans/home.bean';
import { RequestOptions ,Headers, Http} from '@angular/http';

declare var $:any;
@Component({
  selector: 'app-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.css']
})
export class FindPersonComponent extends BaseComponent implements OnInit{
  @Input() set title(title: string) {

    console.log('got title: ', title);
  
  }
  @Output() notify: EventEmitter<PersonBean> = new EventEmitter<PersonBean>();
  @Output() changeFilter: EventEmitter<PersonBean> = new EventEmitter<PersonBean>();
  
  public village: VillageBean;
  public osm: OSMBean;
  public home: HomeBean;
  public personBean : PersonBean;

  public selectVillage: any;
  public isDisabledOSM = true;
  public isDisabledHomeNo = true;
  public isDisabledPerson = true;
  public isDisableBtnSearch = true;
  public defaultVillage: any = {villageID:'', villageNo: '', villageName: '--เลือกหมู่บ้าน--'};
  public villageData: any = [this.defaultVillage, {villageID:'101', villageNo: '3', villageName: 'บ้านคำไห'},{villageID:'102', villageNo: '4', villageName: 'บ้านหนองแวง'}];
  public osmData: any = [{OSMID:'11', fullName: 'นายอิฐิการ มาลัยดำ'},{OSMID:'12', fullName: 'นางนารีราด ม่วงแดง'}];
  public personData: any = [{citizenID: '14002993039944', fullName: 'นายสมคิด จาติเสพาทด'}];
  public homeData: any = [{homeID:'200020002', homeNo:'20'}, {homeID:'200020013', homeNo:'21'}]
  
  public villageList: Array<VillageBean>;

  constructor(private http: Http) { 
    super();
    this.villageList = new Array();
    for (let entry of this.villageData) {
       this.villageList.push(new VillageBean(entry)); 
    }

    this.village = new VillageBean();

    this.osm = new OSMBean();
    this.home = new HomeBean();
    this.personBean = new PersonBean();
    this.village.villageID = '';
    this.personBean.citizenID = '';
    this.personBean.firstName = 'Firstname';
    this.personBean.lastName = 'Lastname';
    this.personBean.nickName = "Sum";

    this.selectVillage = this.defaultVillage;
  }

   ngOnInit(){

   }
  doPersonChange(){
    this.notify.emit(this.personBean);
    this.onChangeFilter();
  }

  changVillageNo(){
    if(this.village.villageID){
      this.isDisabledOSM = false;
      this.isDisabledHomeNo = false;
    }else{
      this.isDisabledHomeNo = true;
      this.isDisabledOSM = true;
    }
    this.personBean.citizenID = '';
    this.onChangeFilter();
  }
  changHomeNo(){
    if(this.home.homeID){
      this.isDisableBtnSearch = false;
    }else{
      this.isDisableBtnSearch = true;
    }
    this.personBean.citizenID = '';
    this.onChangeFilter();
  }
  doSearchPerson(){
    this.isDisabledPerson = false;
  }

  onChangeFilter(){
    this.changeFilter.emit(this.personBean);
  }
}
