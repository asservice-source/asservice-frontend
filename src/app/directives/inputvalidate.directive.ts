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
    @Output() notify: EventEmitter<InputValidateInfo> = new EventEmitter<InputValidateInfo>(); 
    public isReset: boolean = false;
    private baseComponent: BaseComponent;
    constructor(private el: ElementRef,private renderer: Renderer, private renderer2 :Renderer2 , private viewContainer: ViewContainerRef) { 
        this.baseComponent = new BaseComponent();
    }
    @HostListener('keypress', ['$event']) onKeyPress(event) {
        this.onReset();
    }
    @HostListener('change', ['$event']) onChange(event) {
        this.onReset();
    }
    @HostListener('click', ['$event']) onClick(event) {
        
    }
    ngOnChanges(changes: any){
       
        if(changes.InputValidate){
            let inputValis: InputValidateInfo = changes.InputValidate.currentValue;
            this.onReset();
            if(inputValis.isCheck){
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
    onValidate(){
        //let el_label = this.el.nativeElement.lastElementChild;
        let el_label = this.el.nativeElement.querySelector('.error');
        let el_input = this.el.nativeElement.querySelector('input')  || this.el.nativeElement.querySelector('select') || this.el.nativeElement.querySelector('textarea');
        
        if(!el_label || !el_input){
            return;
        }
        let value: string =  el_input.value;
        this.InputValidate = new InputValidateInfo();
        this.InputValidate.value = value;
        if(!value.trim() || (this.citizenId && !this.baseComponent.isValidCitizenIdThailand(value)) || (this.fixLength && this.fixLength>0 && value.trim().length!=this.fixLength)){
            this.InputValidate.isPassed = false;
            this.renderer.setElementStyle(el_label,'display','block');
            this.notify.emit(this.InputValidate);
            this.renderer2.addClass(el_input, 'error-input');
        }else{
            this.InputValidate.isPassed = true;
            this.renderer.setElementStyle(el_label,'display','none');
            this.notify.emit(this.InputValidate);
            this.renderer2.removeClass(el_input, 'error-input');
        }
        
    }
}
export class InputValidateInfo{
    public isCheck: boolean;
    public isPassed: boolean;
    public value: string;
}