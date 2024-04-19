import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from '../shared/services/data-transfer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router : Router,
    private dataTransferService : DataTransferService) { }
  

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      // Handle invalid form submission
      console.log('Invalid Form');
      return; 
    }

    // Form is valid, proceed with submission
    console.log('Form submitted:', this.registerForm.value);
    this.dataTransferService.registerUser(this.registerForm.value).subscribe(
      (response: any) => {
        console.log('Response:', response);
        if (response.uid != null) {
          console.log('Success');
          this.toastr.info('User successfully registered');
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', response.token);
        } else {
          console.log('Failed');
          this.toastr.error('Failed to register user');
          this.router.navigate(['/login']);
        }
      }
    );
    
    // Implement logic to submit the form data
  }
}
