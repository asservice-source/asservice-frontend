import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { Service_SurveyPersonal } from '../../../api-managements/service-survey-personal';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { AppComponent } from '../../../app.component';

declare var $;

@Component({
  selector: 'app-survey-personal-history',
  templateUrl: './survey-personal-history.component.html',
  styleUrls: ['./survey-personal-history.component.css']
})
export class SurveyPersonalHistoryComponent extends BaseComponent implements OnInit {

    private api: Service_SurveyPersonal;
    public memberList: Array<any>;
    public guestList: Array<any>;
    public homeInfo: any = {};
    public roundName: string;
    public loading: boolean = false;

    constructor(private routeAct: ActivatedRoute, private chnageRef: ChangeDetectorRef){
        super();
        this.api = new Service_SurveyPersonal();
    }
    ngOnInit(){
        this.receiveParameters();
    }

    receiveParameters() {
        this.routeAct.params.subscribe(params => {
            this.loading = true;
            let homeId = params['homeId'];
            let documentId = params['roundId'];
            this.getHomeInfo(homeId);
            this.getRoundName(documentId);
            let _self = this;
            
            this.api.getHistoryListMember(documentId, homeId, function(datas){
                _self.loading = false;
                _self.chnageRef.detectChanges();
                _self.memberList = new Array();
                _self.guestList = new Array();
                if(datas){
                    for(let item of datas){
                        console.log(item);
                        item.citizenId = _self.formatCitizenId(item.citizenId);
                        item.birthDate = _self.displayFormatDate(item.birthDate);
                        if(item.isGuest){
                            _self.guestList.push(item);
                        }else{
                            _self.memberList.push(item);
                        }
                    }
                }
                
            });
        });
      }

    getHomeInfo(homeId){
        let _self = this;
        this.api.api_HomeInfo(homeId, function (d) {
            if (d && d.status.toUpperCase() == "SUCCESS") {
                _self.homeInfo = d.response;
            }
        });
    }

    getRoundName(roundId) {
        let _self = this;
        this.api.getRound_byDocumentId(_self.surveyHeaderCode.POPULATION, roundId, function (d) {
            _self.roundName = d.name;
        });
      }

    onClose(){
        window.close();
    }
}