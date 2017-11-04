
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumberDirective {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: boolean;
  @Input() maxlength: number;
  @HostListener('keypress', ['$event']) onKeyPress(event) {
    let e = <KeyboardEvent> event;
    if (this.OnlyNumber) {
        event = (event) ? event : window.event;
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
      }
  }

  @HostListener('paste', ['$event'])
  onPaste($event) {
    let self = this;
    let event = $event;
    console.log(self.maxlength);
    setTimeout(function(){ 
      if(event.target.value){
        let value = event.target.value;
        value = value.replace(/[^0-9\.]+/g, '');
        if(self.maxlength){
          if(value.length>self.maxlength){
            value = value.substr(0,self.maxlength-1);
          }
        }
        event.target.value = value;
      }
    }, 50);
   
  }
}
