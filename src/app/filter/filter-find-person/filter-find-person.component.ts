import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BaseComponent } from "../../base-component";
import { PersonBean } from "../../beans/person.bean";
import { VillageBean } from '../../beans/village.bean';
import { OSMBean } from '../../beans/osm.bean';
import { HomeBean } from '../../beans/home.bean';
import { RequestOptions, Headers, Http } from '@angular/http';
import { ApiHTTPService } from '../../service/api-http.service';
import { FilterBean } from '../../beans/filter.bean';
declare var $: any;

@Component({
  selector: 'app-filter-find-person',
  templateUrl: './filter-find-person.component.html',
  styleUrls: ['./filter-find-person.component.css']
})
export class FilterFindPersonComponent extends BaseComponent implements OnInit {

  private api: ApiHTTPService;
  public isShowFind: boolean = true;
  public isShowPersons: boolean = false;

  public filterBean: FilterBean = new FilterBean();
  public personBean: PersonBean;
  public villageData: any;
  public osmData: any;
  public isDisabledOSM = true;
  public isDisabledHomeNo = true;
  public isDisabledPerson = true;
  public isDisableBtnSearch = true;
  public personData: any = [{ citizenId: '1-11-3-2290343-2-4', fullName: 'นายโอดอวย หวยโหย', age: 34, status: 'ผู้อาศัย' }, { citizenId: '6-00-3-2290344-5-0', fullName: 'นายต้องเต ไทบ้านนอก', age: 41, status: 'เจ้าบ้าน' }];
  public homeData: any;

  @Input() findPersonal: boolean;
  @Input() reset: any;

  @Output() choosePersonal: EventEmitter<PersonBean> = new EventEmitter<PersonBean>();

  constructor(private http: Http) {
    super();
    this.api = new ApiHTTPService();
    this.personBean = new PersonBean();
    this.personBean.citizenId = "";
    this.personBean.firstName = "Firstname";
    this.personBean.lastName = "Lastname";
    this.personBean.nickName = "Sum";
  }

  ngOnInit() {
    this.setUpVillage();
  }
  ngOnChanges(changes): void {
    console.log("OnChanges");
    console.log(changes);
    if (changes['findPersonal']) {
      this.isShowFind = this.findPersonal
      console.log(this.findPersonal);
    }
    if(changes['reset']){
      this.filterBean.villageId = "";
    }
  }

  changVillageNo() {
    if (this.filterBean.villageId) {
      this.setUpOSM();
      this.setUpHome();
      this.filterBean.osmId="";
      this.filterBean.homeId="";
    } else {
      this.isDisabledHomeNo = true;
      this.isDisabledOSM = true;
    }
    this.personBean.citizenId = '';
    this.filterChanges();
  }
  changeOSM(){
    this.setUpHome();
    this.filterChanges();
    this.filterBean.homeId="";
  }
  changHomeNo() {
    if (this.filterBean.homeId) {
      this.isDisableBtnSearch = false;
    } else {
      this.isDisableBtnSearch = true;
    }
    this.personBean.citizenId = '';
    this.filterChanges();
  }
  doSearchPerson() {
    this.isDisabledPerson = false;
    this.isShowPersons = true;

  }

  setUpVillage() {
    let self = this;
    let params = { "hospitalCode": super.getHospitalCode() };
    this.api.post('village/village_no_list_by_hospital', params, function (resp) {
      console.log(self.villageData);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.villageData = resp.list; 
      }
    })
  }
  setUpOSM() {
    let self = this;
    let params = { "id": this.filterBean.villageId};
    this.api.post('osm/osm_list_by_village', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.osmData = resp.list;
        self.isDisabledOSM = false;
        self.isDisabledHomeNo = false;
      }
    })
  }
  setUpHome(){
    let self = this;
    let params = { "id": this.filterBean.villageId, "osmId": this.filterBean.osmId};
    this.api.post('home/home_no_list_by_village_or_osm', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.homeData = resp.list;
        self.isDisabledOSM = false;
        self.isDisabledHomeNo = false;
      }
    })
  }
  onChoosePerson(person: PersonBean) {
    this.isShowFind = false;
    this.choosePersonal.emit(person);
  }
  filterChanges(){
    this.isShowPersons = false;
  }
}
