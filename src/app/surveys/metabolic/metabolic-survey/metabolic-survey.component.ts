import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';


@Component({
  selector: 'app-metabolic-survey',
  templateUrl: './metabolic-survey.component.html',
  styleUrls: ['./metabolic-survey.component.css']
})
export class MetabolicSurveyComponent implements OnInit {

  pFname = 'สมหมาย';
  pLname = 'หลายใจ';
  citizenID = '1-4599-00321-43-2';
  pAgeYears = 42;
  pAgeMonths = 8;
  houseID = '11/1';
  hGroupID = 8;
  sDistrictID = 'บ้านเป็ด';
  lDistrictID = 'เมือง';
  cityID = 'ขอนแก่น';
  pGender = 1;
  emblem = '-';
  pSmoke = 0;
  pDrink = 0;

  patentID = 'xxxxxxxxxxxxxxxxx';

  dataFor;
  weight = 71;



xxx;
  
 

  constructor(private http: Http) {

   }

  ngOnInit() {
    // this.test();

    $('#radioBtn a').on('click', function(){
      var sel = $(this).data('title');
      var tog = $(this).data('toggle');
      $('#'+tog).prop('value', sel);
      
      $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
      $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
  })

  $('#radioBtn2 a').on('click', function(){
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    $('#'+tog).prop('value', sel);
    
    $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive2');
    $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive2').addClass('active');
})

    
  }

  Smoke(T){
    if(T == 'N'){
      $("#numTobacco").prop('disabled', true);
    }else{
      $("#numTobacco").prop('disabled', false);
    }
  }

  Drink(T){
    if(T == 'N'){
      $("#timeDrink").prop('disabled', true);
    }else{
      $("#timeDrink").prop('disabled', false);
    }
  }

  test() {
    // let headers = new Headers({ 'Content-Type': 'application/json'});
    // let options = new RequestOptions({ headers: headers});

    // this.http.get('http://192.168.1.59:8080/asservice/gender/getAll', options)
    //   .map(res => res.json())
    //   .subscribe(
    //   data => {
    //     this.dataFor = data;
    //     console.log(this.dataFor);
    //     this.xxx=data[0].Name;
    //   },
    //   error => console.log(error)
    //   );
  }

}
