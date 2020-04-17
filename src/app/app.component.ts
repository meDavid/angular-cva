import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        input: '',
        input2: 'ddddd'
      }
    )
  }
}
