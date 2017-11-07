import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer, ViewContainerRef, ViewRef } from '@angular/core';

@Directive({
  selector: '[InputValidate]'
})

export class InputValidateDirective{
    @Input() InputValidate: InputValidateInfo = new InputValidateInfo();
    @Input() error: string;
    @Output() notify: EventEmitter<InputValidateInfo> = new EventEmitter<InputValidateInfo>(); 
    public isReset: boolean = false;
    constructor(private el: ElementRef,private renderer: Renderer, private viewContainer: ViewContainerRef) { 
    
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
        this.renderer.setElementStyle(el_label,'display','none');
    }
    onValidate(){
        console.log(this.viewContainer);
        let el_label = this.el.nativeElement.lastElementChild;
        let value: string =  this.el.nativeElement.firstElementChild.value;
        this.InputValidate = new InputValidateInfo();
        this.InputValidate.value = value;
        if(!value.trim()){
            console.log(el_label);
            this.InputValidate.isPassed = false;
            this.renderer.setElementStyle(el_label,'display','block');
            this.notify.emit(this.InputValidate);
        }else{
            this.InputValidate.isPassed = true;
            this.renderer.setElementStyle(el_label,'display','none');
            this.notify.emit(this.InputValidate);
        }
        
    }
}
export class InputValidateInfo{
    public isCleck: boolean;
    public isPassed: boolean;
    public value: string;
}