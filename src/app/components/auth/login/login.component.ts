import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_VARIABLES } from 'src/app/core/constants/storage.constant';
import { JwtService, StorageService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isAuthAlert = false;
  superAdminEmail = 'admin@test.com';
  superAdminPassword = 'admin@123';
  userAdminEmail = 'user@test.com';
  userAdminPassword = 'user@123';
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private _fb: FormBuilder,
    private _jwtService: JwtService,
    private _storageService: StorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  initForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, , Validators.minLength(6)]],

    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginForm.value.email === this.superAdminEmail && this.loginForm.value.password === this.superAdminPassword) {
      this.isAuthAlert = false;
      const response = {
        email: this.superAdminEmail,
        userName: 'Super Admin',
        token: new Date().getTime().toString(),
        role: 'SUPER_ADMIN'
      }
      this._jwtService.setToken(response.token);
      this._storageService.setItem(STORAGE_VARIABLES.USER_DETAILS, response);
      this._router.navigate(['/dashboard']);
    } else if (this.loginForm.value.email === this.userAdminEmail && this.loginForm.value.password === this.userAdminPassword) {
      this.isAuthAlert = false;
      const response = {
        email: this.userAdminEmail,
        userName: 'User',
        token: new Date().getTime().toString(),
        role: 'USER'
      }
      this._jwtService.setToken(response.token);
      this._storageService.setItem(STORAGE_VARIABLES.USER_DETAILS, response);
      this._router.navigate(['/stories']);
    } else {
      this.isAuthAlert = true;
    }
  }

  onReset() {
    this.isAuthAlert = false;
    this.submitted = false;
    this.loginForm.reset();
  }
}
