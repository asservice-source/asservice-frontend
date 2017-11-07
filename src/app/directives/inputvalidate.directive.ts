import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[InputValidate]'
})

export class InputValidateDirective{

    @Input() inputValidate: boolean;
    @Input() msgErr: string;
    @Input() isCleck: boolean;
    @Output() notiErr: EventEmitter<string> = new EventEmitter<string>(); 

    constructor(private el: ElementRef) { 
        
    }

    ngOnChange(changes: any){
        console.log("===ngOnChange===");
        console.log(changes);
    }

}