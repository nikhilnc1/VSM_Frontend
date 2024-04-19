import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from '../shared/services/data-transfer.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  showPassword = false;
  constructor(private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router : Router,
    private dataTransferService : DataTransferService) { }
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if(token){
      this.router.navigate([`/dashboard`]);
    }
    else{
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['',[Validators.required]]
      });
    }    
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      this.toastr.info("Please input correct values");
      return;
    }
    console.log('onSubmit',this.loginForm.value);
    this.dataTransferService.getLogin(this.loginForm.value).subscribe((response:any)=>{
      console.log('loginUser',response);
      if(response.userId!=null){
        this.toastr.info("User successfully login");
        this.router.navigate([`/dashboard`]);
        localStorage.setItem('token',response.jwt);
        localStorage.setItem('roleId',response.userId);
      }
      else{
        this.toastr.info("Email or password is incorrect");
        this.router.navigate([`/login1`]);
        // alert("Please input correct values");
      }
    })
  }
}
