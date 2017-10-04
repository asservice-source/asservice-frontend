import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personal-survey',
  templateUrl: './personal-survey.component.html',
  styleUrls: ['./personal-survey.component.css']
})
export class PersonalSurveyComponent implements OnInit {

  @Input() cid: string

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
  constructor() { }

  ngOnInit() {

    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
    });
  }

  clickSave(){
    alert(this.cid);
  }

}
