import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  addVehicleForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataTransferService: DataTransferService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addVehicleForm = this.formBuilder.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      licensePlate: ['', [Validators.required, Validators.minLength(6)]],
      ownerName: ['', Validators.required],
      oemail: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.addVehicleForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addVehicleForm.invalid) {
      this.toastr.error('', 'Please fill all required fields');
      return;
    }
    
    this.dataTransferService.addVehicle(this.addVehicleForm.value).subscribe((res: any) => {
      console.log('Add Vehicle Response', res);
      if (res.year != null) {
        this.toastr.success('', 'Vehicle added successfully');
        this.router.navigate(['/actions/add-vehicle']);
        this.onReset();
      } else {
        this.toastr.error('', 'Failed to add vehicle');
      }
    });
  }

  onReset() {
    this.submitted = false;
    this.addVehicleForm.reset();
  }
}
