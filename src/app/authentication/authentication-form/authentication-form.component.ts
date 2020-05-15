import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss']
})
export class AuthenticationFormComponent implements OnInit {
  isLoginMode = true;
  authenticationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authenticationForm.valueChanges.subscribe(() => {
      console.log(this.authenticationForm);
    })
  }

  get email() {
    return this.authenticationForm.get('email');
  }

  get password() {
    return this.authenticationForm.get('password');
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if(this.authenticationForm.valid) {
      console.log(this.authenticationForm);
    }
  }

  onClear() {
    this.authenticationForm.reset();
  }
}
