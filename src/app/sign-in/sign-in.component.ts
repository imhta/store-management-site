import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @Input('sid') sid;

  logInForm = this.fb.group({
    sid: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    password: ['', Validators.required]
  });


  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    // setting value of sid to log in form and converting sid into string
    this.logInForm.setValue({ sid: `${this.sid}`, phoneNumber: '', password: '' });
  }

  onSubmit() {
    console.log(JSON.stringify(this.logInForm.value));
   const httpOptions = {
      headers: new HttpHeaders(JSON.stringify(this.logInForm.value))
    };
    this.http
      .post(
        'https://us-central1-clothxnet.cloudfunctions.net/login/', httpOptions
      )
      .subscribe(response => console.log(response));
  }
}
