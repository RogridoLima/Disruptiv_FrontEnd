import { User } from './../shared/models/user';
import { AppConsts } from '../shared/AppConsts';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  form: FormGroup;
  error = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.loading = true;
    setTimeout(() => {
      // checa se o form é valido
      if (this.form.valid) {
        // pega o usuario salvo
        const userSaved = new User(JSON.parse(localStorage.getItem('user')));

        // pega os dados do form
        const form = this.form.value;

        // checa o login e se for verdadeiro manda pra home
        if (form.login === userSaved.email && form.password === userSaved.password) {
          this.error = false;
          this.router.navigate(['home']);
        } else {
          this.validateAllFormFields(this.form);
          this.error = true;
        }
      } else {
        this.error = true;
      }
      this.loading = false;
    }, 2000);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
