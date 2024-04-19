import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,ParamMap  } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl,ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from '../shared/services/data-transfer.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  settingsForm: FormGroup;
  fromSubmitted = false;
  showPassword: boolean = false;
  showConfirmPassword : boolean = false;
  password:any;
  PasswordVerified = false;
  constructor(
    private activeRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router:Router, 
              private toastr:ToastrService,
              private dataTransferService: DataTransferService)
     {
    
  } 
 
   
  get f(){return this.settingsForm.controls; }

  ngOnInit(): void {

    this.settingsForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
      {
      validators: this.checkPasswords});
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get("password")?.value;
    let confirmPass = group.get("confirmPass")?.value;
    return pass === confirmPass ? null : { mismatch: true }
  }
  onSubmit(){
    this.fromSubmitted=true;
    if (this.settingsForm.valid) {
      console.log('invalid');      
      return;
    }
  
    console.log('form value',this.settingsForm.value);
        this.dataTransferService.resetPassword(this.settingsForm.value).subscribe({
          next: (res:any) => {
            if(res.status==404){
              console.log('Success reset Password',res);
              this.toastr.success(res.message);        
              this.router.navigate([`/login`]);
            }
          }, error: (err) => {
            console.log('Error is there',err);
          }, complete: () => {
            this.router.navigate([`/login`]);
          }
        });

      }
      /* checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
        let pass = group.get("password")?.value;
        let confirmPass = group.get("confirmPass")?.value;
        return pass === confirmPass ? null : { mismatch: true }
      } */   
      
}
