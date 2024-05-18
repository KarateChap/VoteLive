import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LoginUser } from './types/login-user.interface';
import { RegisterUser } from './types/register-user.interface';
import { Store } from '@ngrx/store';
import { authActions } from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  email = '';
  password = '';

  isRegister = false;

  authForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    if (!this.isRegister) {
      this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    } else {
      this.authForm = this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: [
            '',
            [Validators.required, this.passwordComplexityValidator()],
          ],
          confirmPassword: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
        },
        {
          validators: this.matchPasswordsValidator(
            'password',
            'confirmPassword'
          ),
        }
      );
    }
  }

  onSubmit() {
    if (!this.isRegister) {
      const loginUser: LoginUser = {
        ...this.authForm.value,
      };

      this.store.dispatch(authActions.login({ loginUser }));
    } else {
      const registerUser: RegisterUser = {
        ...this.authForm.value,
      };
      this.store.dispatch(authActions.register({ registerUser }));
    }
  }

  toggleRegisterLogin() {
    this.isRegister = !this.isRegister;
    this.initializeForm();
  }

  private passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      const valid = regex.test(password);
      return valid ? null : { passwordComplexity: true };
    };
  }

  private matchPasswordsValidator(
    password: string,
    confirmPassword: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(password);
      const matchingControl = formGroup.get(confirmPassword);

      if (
        control &&
        matchingControl &&
        control.value !== matchingControl.value
      ) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        if (matchingControl) {
          matchingControl.setErrors(null);
        }
        return null;
      }
    };
  }
}
