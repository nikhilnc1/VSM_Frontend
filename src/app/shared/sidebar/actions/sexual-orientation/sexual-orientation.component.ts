import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sexual-orientation',
  templateUrl: './sexual-orientation.component.html',
  styleUrls: ['./sexual-orientation.component.scss']
})
export class SexualOrientationComponent implements OnInit {

 
  SexualOrientationForm: FormGroup;
  sexualOrientationList: any;
  sexualOrientationid: number[];
  industryList: any;
  p: number = 1;
  addMedia = false;
  showForm = false;
  queryParam: any;
  term: string;
  submitted = false;
  title = 'Add New';
  isReadonly = false;
  constructor(private formBuilder: FormBuilder,
    private dataTransferService: DataTransferService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient) { }



  ngOnInit(): void {
    this.initForm();
    this.getAllsexualOrientation();
    // this.getAllindustry();
  }
  initForm() {
    this.SexualOrientationForm = this.formBuilder.group({
      SO_id: [''],
      SO_title: [''],
      SO_description: ['']
      // "updateKey1":  "SO_title",
      // "updateKey2" : "SO_description",
      // "updateKey3": "DE_industryId",
      // "updateValue1": SO_title:[''],
      // "updateValue2": SO_description:[''],
      // "updateValue3" : DE_industryId:[''],
    })
  }
  onSubmit() {
    this.submitted = true;
    console.log('this.SexualOrientationForm.value', this.SexualOrientationForm.value);
    if (this.SexualOrientationForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    if (this.title == 'Edit') {
      console.log("Edit SexualOrientation", this.editId)
      this.SexualOrientationForm.value.SO_id = this.editId;
      this.dataTransferService.updatesexualOrientation(this.SexualOrientationForm.value).subscribe((res: any) => {
        console.log('Edit SexualOrientation ', res);
        if (res.statusCode == 200) {
          this.toastr.success('Updated Successfully', res.message);
          this.showForm = false; //hide form
          this.getAllsexualOrientation();
        } else {
          this.toastr.error("Something went wrong", res.message);
        }
      })
    }
    else {
      this.dataTransferService.addsexualOrientation(this.SexualOrientationForm.value).subscribe((res: any) => {
        console.log('addsexualOrientations', res);
        if (res.statusCode == 200) {
          this.toastr.success('', 'New sexualOrientation Saved.');
          this.getAllsexualOrientation();
        } else {
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }
  }
  onReset() {
    this.submitted = false;
    this.SexualOrientationForm.reset();
  }

  getAllsexualOrientation() {
    this.dataTransferService.getsexualOrientation().subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.sexualOrientationList = res.data;
      }
    })
  }

  getAllindustry() {
    this.dataTransferService.getindustry().subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.industryList = res.data;
      }
    })
  }

  editId: any;
  editRecord(record: any, title: string) {
    this.isReadonly = false;
    //window.scrollTo(0, 0);
    this.title = title;
    if (this.title == 'View') {
      this.isReadonly = true;
    }
    this.editId = record.SO_id;
    this.onReset();
    this.showForm = true;
    this.SexualOrientationForm.patchValue(record);
  }
  addRecord() {
    this.isReadonly = false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }


}
