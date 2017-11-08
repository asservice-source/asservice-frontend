import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer, ViewContainerRef, ViewRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[InputValidate]'
})

export class InputValidateDirective{
    @Input() InputValidate: InputValidateInfo = new InputValidateInfo();
    @Input() error: string;
    @Output() notify: EventEmitter<InputValidateInfo> = new EventEmitter<InputValidateInfo>(); 
    public isReset: boolean = false;
    constructor(private el: ElementRef,private renderer: Renderer, private renderer2 :Renderer2 , private viewContainer: ViewContainerRef) { 
    
    }
    @HostListener('keypress', ['$event']) onKeyPress(event) {
        this.onReset();
    }
    @HostListener('change', ['$event']) onChange(event) {
        this.onReset();
    }
    ngOnChanges(changes: any){
        console.log(changes);
        if(changes.InputValidate.currentValue.isCleck){
            this.onValidate();
            this.InputValidate = new InputValidateInfo();
        }else{
            this.onReset();
        }
    }

    onReset(){
        let el_label = this.el.nativeElement.lastElementChild;
        let el_input = this.el.nativeElement.firstElementChild;
        this.renderer.setElementStyle(el_label,'display','none');
        this.renderer2.removeClass(el_input, 'error-input');
    }
    onValidate(){
        console.log(this.viewContainer);
        let el_label = this.el.nativeElement.lastElementChild;
        let el_input = this.el.nativeElement.firstElementChild;
        let value: string =  el_input.value;
        this.InputValidate = new InputValidateInfo();
        this.InputValidate.value = value;
        if(!value.trim()){
            console.log(el_label);
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
    public isCleck: boolean;
    public isPassed: boolean;
    public value: string;
}