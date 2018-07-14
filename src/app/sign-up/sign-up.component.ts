import { Hobbies } from '../shared/models/hobbies';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  url = '';
  form: FormGroup;

  hobbies: Hobbies[];
  loading = false;
  error = false;
  errorSelect = false;
  errorPicture = false;
  passwordDoesntMatch = false;
  success = false;
  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.hobbies = [
      { id: 0, name: 'Violão', selected: false },
      { id: 1, name: 'Tenis', selected: false },
      { id: 2, name: 'Futebol', selected: false },
      { id: 3, name: 'Golf', selected: false },
      { id: 4, name: 'Jogos', selected: false },
      { id: 5, name: 'Cartas', selected: false },
      { id: 6, name: 'Piano', selected: false },
      { id: 7, name: 'Dormir', selected: false },
    ];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      birth: ['', Validators.required],
      gender: ['', Validators.required],
      hobbies: ['', Validators.required],
      bio: ['', Validators.required],
      picture: ['', Validators.required],
      pass: ['', Validators.required],
      confirmPass: ['', Validators.required],
    });
  }

  onSelectFile(event) {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();

    // tslint:disable-next-line:no-shadowed-variable
    reader.onload = (event) => {
      const target: any = event.target;
      this.url = target.result;
      this.form.get('picture').setValue(this.url);
    };

    reader.readAsDataURL(file);
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

  submit() {
    this.loading = true;
    setTimeout(() => {

      // checa se as senhas batem
      if (this.form.get('pass').value !== this.form.get('confirmPass').value ) {
        this.passwordDoesntMatch = true;
        this.loading = false;
        return;
      }

      this.passwordDoesntMatch = false;

      // pega os items selecionados
      const selectedItems = this.hobbies.filter(hobby => hobby.selected === true);

      // adiciona os items selecionados numa stirng separados por virgulas e remove a ultima virgula
      let itemsArrayString = '';
      selectedItems.forEach(element => {
        itemsArrayString += element.name + ', ';
      });
      itemsArrayString = itemsArrayString.substr(0, itemsArrayString.length - 2);

      // salva no item do form
      this.form.get('hobbies').setValue(itemsArrayString);

      // checa se o form é valido e checa se ele selecionou mais de 2 items nos checkbox e se selecionou foto
      if (this.url.length < 10) {
        this.loading = false;
        this.errorPicture = true;
        return;
      }

      if (selectedItems.length < 2) {
        this.loading = false;
        this.errorSelect = true;
        return;
      }

      if (this.form.valid) {

        // cria o usuario e salva no localstorage para fazer o login
        const user = new User();
        const form = this.form.value;

        user.name = form.name;
        user.email = form.email;
        user.gender = form.gender;
        user.bio = form.bio;
        user.picture = form.picture;
        user.birth = form.birth;
        user.hobbies = form.hobbies;
        user.password = form.pass;

        localStorage.setItem('user', JSON.stringify(user));

        this.success = true;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);

      } else {
        // checa todos os campos e aplica os erros
        this.validateAllFormFields(this.form);
        this.error = true;
      }
      this.loading = false;

    }, 2000);
  }

}
