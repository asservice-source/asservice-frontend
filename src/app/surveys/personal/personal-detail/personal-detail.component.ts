import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class SurveyPersonalDetailComponent implements OnInit {

  // Receive parameters
  hid: string

  mTypeNo = 1;
  mStudyNo = 3;
  mLiveType = 1;
  citizenID = '1-4599-00321-23-1';
  mOwnerNo = 2;
  pDisease = 'มะเร็งปอด';
  pJob = 'ตัดอ้อย'
  pFname = 'สมหมาย';
  pLname = 'หลายใจ';
  birthDate = '16/09/2535';

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.hid = params['hid'];
    });

    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
    });

  }

  clickSave() {
    alert(this.hid);
  }

}
