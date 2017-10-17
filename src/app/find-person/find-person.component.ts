import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { BaseComponent } from "../base-component";
import { PersonBean } from "../beans/person.bean";
import { VillageBean } from '../beans/village.bean';
import { OSMBean } from '../beans/osm.bean';
import { HomeBean } from '../beans/home.bean';
import { RequestOptions ,Headers, Http} from '@angular/http';
import { ApiHTTPService } from '../service/api-http.service';

declare var $:any;
@Component({
  selector: 'app-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.css']
})
export class FindPersonComponent extends BaseComponent implements OnInit, OnChanges{

  private api: ApiHTTPService;
  public isShowFind: boolean = true;
  public isShowPersons: boolean = false;

  public village: VillageBean;
  public osm: OSMBean;
  public home: HomeBean;
  public personBean : PersonBean;
  public villageData: any;
  public osmData: any;
  public isDisabledOSM = true;
  public isDisabledHomeNo = true;
  public isDisabledPerson = true;
  public isDisableBtnSearch = true;
  public personData: any = [{citizenID: '1-11-3-2290343-2-4', fullName: 'Mr. Jhon Heroes', age: 41, status: 'เจ้าบ้าน'}];
  
  @Input() findPersonal: boolean;
  @Output() choosePersonal: EventEmitter<PersonBean> = new EventEmitter<PersonBean>();

  constructor(private http: Http) { 
    super();
    this.api = new ApiHTTPService();
    this.village = new VillageBean();
    this.osm = new OSMBean();
    this.home = new HomeBean();
    this.personBean = new PersonBean();
    this.village.villageID = "";
    this.osm.OSMID = "";
    this.personBean.citizenID = "";
    this.personBean.firstName = "Firstname";
    this.personBean.lastName = "Lastname";
    this.personBean.nickName = "Sum";
  }

  ngOnInit(){
    this.setUpVillage();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChanges");
    console.log(changes);
    if(changes['findPersonal']){
      this.isShowFind = this.findPersonal
    }
  }
  
  changVillageNo(){
    if(this.village.villageID){
      this.setUpOSM(); 
    }else{
      this.isDisabledHomeNo = true;
      this.isDisabledOSM = true;
    }
    this.personBean.citizenID = '';
  }
  changHomeNo(){
    if(this.home.homeID){
      this.isDisableBtnSearch = false;
    }else{
      this.isDisableBtnSearch = true;
    }
    this.personBean.citizenID = '';
  }
  doSearchPerson(){
    this.isDisabledPerson = false;
    this.isShowPersons = true;
    
  }

  URL_LIST_VILLAGE_NO: string = "village/village_no_list";
  URL_LIST_OSM_AND_HOME_NO: string = "osm/osm_and_home_list_by_village";
 
  setUpVillage(){
    let self = this;
    let params_getVillageNo = { "hospitalCode": super.getHospitalCode() };
    this.api.post(this.URL_LIST_VILLAGE_NO, params_getVillageNo, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.villageData = resp.list;
        console.log(self.villageData);
      }
    })
  }

  setUpOSM(){
    let self = this;
    let params_getVillageNo = { "id": self.village.villageID };
    this.api.post(this.URL_LIST_OSM_AND_HOME_NO, params_getVillageNo, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        console.log(resp);
        self.osmData = resp.list;
        this.isDisabledOSM = false;
        this.isDisabledHomeNo = false;
        console.log(self.osmData);
      }
    })
  }
  onChoosePerson(person: PersonBean){
    this.isShowFind = false;
    this.choosePersonal.emit(person);
  }
}
