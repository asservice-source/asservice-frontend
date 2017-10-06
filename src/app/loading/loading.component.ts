import { Component, OnInit , Input} from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  
  @Input() set cmd(cmd:string){
    if('show' == cmd){
     this.start();
    }else{
     this.stop();
    }
  }

  constructor() { }

  ngOnInit() {

  }
  start(){
    console.log('Start Waiting');
    $('html, body').css({'overflow': 'hidden'});
    $('#loading-bg').fadeIn(300);
    $('#loading-img').fadeIn(300);
    // $('#loading-bg').css({'top':'0', 'bottom':'0', 'left':'0'});
    // $('#loading-img').css({'top':'0', 'bottom':'0', 'left':'0','width':'100%', 'height':'100%'});
    
  }
  stop(){
    console.log('Stop Waiting');
    $('#loading-bg').fadeOut(300);
    $('#loading-img').fadeOut(300);
    $('html, body').css({'overflow': 'initial'});
  }
}