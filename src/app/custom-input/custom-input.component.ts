import { tap, first, map, startWith } from 'rxjs/operators';
import {FormBuilder, Form, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, FormGroupDirective} from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, forwardRef } from '@angular/core';

FormControl.prototype.setValue = function(value, options = {}) {
  console.log('magic!');
  ((/** @type {?} */ (this))).value = this._pendingValue = value;
  if (this._onChange.length && options.emitModelToViewChange !== false) {
    this._onChange.forEach((/**
     * @param {?} changeFn
     * @return {?}
     */
    (changeFn) => changeFn(this.value, options)));
  }
  this.updateValueAndValidity(options);
};

const oldAddControl = FormGroupDirective.prototype.addControl;
FormGroupDirective.prototype.addControl = function(dir) {
  const ctrl = oldAddControl.bind(this)(dir);
  console.log('patch addControl');
  ctrl._onChange = [];
  ctrl.registerOnChange((newValue, options) => {
    console.log('custom onChangeHandler');
    (dir.valueAccessor as any).writeValue(newValue, options);
    if (options.emitModelEvent)
      dir.viewToModelUpdate(newValue);
  });
  return ctrl;
};

export interface ControlValueAccessorWithWriteValueOptions extends  Omit<ControlValueAccessor, 'writeValue'> {
  writeValue(obj: any, options: { onlySelf?: boolean; emitEvent?: boolean; emitModelToViewChange?: boolean; emitViewToModelChange?: boolean; }): void;
}
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
export class CustomInputComponent implements OnInit, ControlValueAccessorWithWriteValueOptions {

  form: FormGroup;

  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
    this.form = this.fb.group(
      {
        input: ''
      }
    );
  }

  writeValue(obj: any, options: any): void {
    const fn = arguments;
    const err = new Error();
    const st = err.stack;
    console.log('writeValue customInput', obj, options);
    this.form.setValue({input: obj}, options);
    // throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    console.log('registerOnChange');
    this.form.valueChanges.pipe(
      tap(r => console.log('changes customInput child form', r.input),
        map((r: any) => r.input + ' aha'))
    ).subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }

}
