import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer, ViewContainerRef, ViewRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base-component';

@Directive({
  selector: '[InputValidate]'
})

export class InputValidateDirective{
    @Input() InputValidate: InputValidateInfo = new InputValidateInfo();
    @Input() citizenId: boolean;
    @Input() fixLength: number;
    @Input() error: string;
    @Input() BirthDate: string;
    @Output() notify: EventEmitter<InputValidateInfo> = new EventEmitter<InputValidateInfo>(); 
    
    public isReset: boolean = false;
    private baseComponent: BaseComponent;
    constructor(private el: ElementRef,private renderer: Renderer, private renderer2 :Renderer2 , private viewContainer: ViewContainerRef) { 
        this.baseComponent = new BaseComponent();
    }
    @HostListener('keypress', ['$event']) onKeyPress(event) {
        this.onReset();
    }
    @HostListener('paste', ['$event']) onPaste(event) {
        this.onReset();
    }
    @HostListener('change', ['$event']) onChange(event) {
        this.onReset();
    }
    @HostListener('click', ['$event']) onClick(event) {
        
    }
    ngOnChanges(changes: any){
       
        if(changes.InputValidate){
            this.InputValidate = changes.InputValidate.currentValue;
            this.onReset();
            if(this.InputValidate.isCheck){
                this.onValidate();
                this.InputValidate = new InputValidateInfo();
            }
        }
    }

    onReset(){
        let el_label = this.el.nativeElement.querySelector('.error');
        let el_input = this.el.nativeElement.querySelector('input') || this.el.nativeElement.querySelector('select') || this.el.nativeElement.querySelector('textarea');
        if(!el_label || !el_input){
            return;
        }
        this.renderer.setElementStyle(el_label,'display','none');
        this.renderer2.removeClass(el_input, 'error-input');
    }
    onValidate():any{
        //let el_label = this.el.nativeElement.lastElementChild;
        let el_label = this.el.nativeElement.querySelector('.error');
        let el_input = this.el.nativeElement.querySelector('input')  || this.el.nativeElement.querySelector('select') || this.el.nativeElement.querySelector('textarea');
        
        if(!el_label || !el_input){
            return;
        }
        let value: string =  el_input.value;
        if(this.InputValidate.isShowError || !value.trim() || (this.citizenId && !this.baseComponent.isValidCitizenIdThailand(value)) || (this.fixLength && this.fixLength>0 && value.trim().length!=this.fixLength)){
            this.InputValidate.isPassed = false;
            this.renderer.setElementStyle(el_label,'display','block');
            this.notify.emit(this.InputValidate);
            this.renderer2.addClass(el_input, 'error-input');
        }else{                  
            if(this.BirthDate=='BirthDate'){
                let dates = value.split('/');
                let year:number;
                let time = 1;
                let cTime = 0;
                if(dates.length==3){
                    let strDate = dates[2]+'-'+dates[1]+'-'+dates[0];
                    strDate += ' 00:00:00';
                    let date = new Date(strDate);
                    let cDate = new Date();
                    cDate.setHours(0);
                    cDate.setMinutes(0);
                    cDate.setSeconds(0);
                    cDate.setMilliseconds(0);
                    cTime = cDate.getTime();
                    time = date.getTime();
                }
 
                if(cTime - time < 0){
                    this.InputValidate.isPassed = false;
                    this.renderer.setElementStyle(el_label,'display','block');
                    this.renderer2.addClass(el_input, 'error-input');
                    this.notify.emit(this.InputValidate);

                    return false;
                }
            }
            this.InputValidate.isPassed = true;
            this.renderer.setElementStyle(el_label,'display','none');
            this.renderer2.removeClass(el_input, 'error-input');
            this.notify.emit(this.InputValidate);
        }
        return true; 
    } 
}
export class InputValidateInfo{
    public isCheck: boolean;
    public isPassed: boolean;
    public isShowError: boolean;
    public value: string;
}