import { tap, first, map, startWith } from 'rxjs/operators';
import { FormBuilder, Form, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, forwardRef } from '@angular/core';


@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group(
      {
        input: ''
      }
    );
  }

  writeValue(obj: any): void {
    console.log('writeValue customInput', obj);
    this.form.setValue({input: obj})
    // throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    console.log('registerOnChange');
    this.form.valueChanges.pipe(
      tap(r => console.log('changes customInput child form', r),
        map(r => r))
    ).subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }

}
