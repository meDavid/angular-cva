import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  form: FormGroup;
  Date = Date;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        input: '',
        input2: 'ddddd'
      }
    );
    this.form.valueChanges.pipe(tap(value => console.log('new changes parent', value))).subscribe();
  }
}
