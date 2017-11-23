import { Directive, ElementRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

declare var $: any;

export const CUSTOM_INPUT_DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UiDatePickerDirective),
    multi: true
};

@Directive({
    selector: '[uiDatePicker]',
    host: { '(blur)': 'onTouched($event)' },
    providers: [CUSTOM_INPUT_DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class UiDatePickerDirective implements ControlValueAccessor {
    private innerValue: string;

    @Input('changeMonth') changeMonth: boolean = true;
    @Input('changeYear') changeYear: boolean = true;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        
        $(this.el.nativeElement).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd/mm/yy'
        }).on('change', (e: any) => {
            this.onChange(e.target.value);
        });

    }


    public onChange: any = (_: any) => { /*Empty*/ }
    public onTouched: any = () => { /*Empty*/ }

    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        alert(v);
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChange(v);
        }
    }


    writeValue(val: string): void {
        this.innerValue = val;
        $(this.el.nativeElement).datepicker("setDate", this.innerValue);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}