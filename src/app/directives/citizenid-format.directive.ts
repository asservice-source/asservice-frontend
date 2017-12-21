import { Directive, ElementRef, HostListener, Input , SimpleChange} from '@angular/core';

@Directive({
    selector: '[CitizenId]'
  })

export class CitizenIdFormatDirective{
    @Input() CitizenId: any;
    private maxlength: number = 17;

    @HostListener('keypress', ['$event']) onKeyPress($event) {
        if(this.CitizenId){
            let e = <KeyboardEvent> event;
            $event = ($event) ? $event : window.event;
            let charCode = ($event.which) ? $event.which : $event.keyCode;
            if(this.maxlength < $event.target.value.length){
                return false;
            }
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            this.keypressInputCitizenID($event);
            return true;
        }
    }

    @HostListener('paste', ['$event']) onPaste($event) {
        if(this.CitizenId){
            let _self = this;
            let event = $event;
            setTimeout(function(){ 
              if(event.target.value){
                let value = event.target.value;
                value = value.replace(/[^0-9\.]+/g, '');
                if(_self.maxlength){
                  if(value.length>_self.maxlength){
                    value = value.substr(0,_self.maxlength-1);
                  }
                }
                event.target.value = value;
                _self.keypressInputCitizenID($event);
              }
            }, 50);
        }
    }

    constructor(private el: ElementRef){

    }
    ngOnInit() {
        

    }
    ngOnChanges(changes: any){
        if(changes.CitizenId){
            let citizenId = changes.CitizenId.currentValue;
            let _self = this;
            if(citizenId && citizenId.length==13 && citizenId.indexOf('-')<0){
                setTimeout(function(){ 
                    _self.el.nativeElement.value = _self.formatCitizenId(citizenId);
                 }, 300);
            }
        }
    }

    keypressInputCitizenID(event: any) {
        let value = event.target.value;
        let self = this;
        if (value && value.trim().length>0) {
          let patternCitizen: string = "_-____-_____-__-_";
          let patternCitizen_ex: string = "-";
          let returnText = "";
          let obj_1: number = value.length;
          let obj_2 = obj_1 - 1;
          for (let i = 0; i < patternCitizen.length; i++) {
            if (obj_2 == i && patternCitizen.charAt(i + 1) == patternCitizen_ex) {
              returnText += value + patternCitizen_ex;
              value = returnText;
            }
          }

          event.target.value = value;
        }
      }
      formatCitizenId(cid: string): string {
        
        if (!cid || cid.length != 13){
            return cid;
        } else{
            if(cid.indexOf('-')>=0){
                return cid;
            }
        }

        let arr = cid.split('');
        return arr[0] + '-' + arr[1] + arr[2] + arr[3] + arr[4] + '-' + arr[5] + arr[6] + arr[7] + arr[8] + arr[9] + '-' + arr[10] + arr[11] + '-' + arr[12];
    }
}