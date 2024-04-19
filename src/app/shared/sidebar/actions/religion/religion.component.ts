import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.scss']
})
export class ReligionComponent implements OnInit {

  
  ReligionForm: FormGroup;
  religionList: any;
  religionid: number[];
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
    this.getAllreligion();
    // this.getAllindustry();
  }
  initForm() {
    this.ReligionForm = this.formBuilder.group({
     RE_id: [''],
      RE_title: [''],
      RE_descripton: ['']
      // "updateKey1":  "DE_title",
      // "updateKey2" : "DE_description",
      // "updateKey3": "DE_industryId",
      // "updateValue1": DE_title:[''],
      // "updateValue2": DE_description:[''],
      // "updateValue3" : DE_industryId:[''],
    })
  }
  onSubmit() {
    this.submitted = true;
    console.log('this.ReligionForm.value', this.ReligionForm.value);
    if (this.ReligionForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    if (this.title == 'Edit') {
      console.log("Edit Religion", this.editId)
      this.ReligionForm.value.RE_id = this.editId;
      this.dataTransferService.updatereligion(this.ReligionForm.value).subscribe((res: any) => {
        console.log('Edit Religion ', res);
        if (res.statusCode == 200) {
          this.toastr.success('Updated successfully', res.message);
          this.showForm = false; //hide form
          this.getAllreligion();
        } else {
          this.toastr.error("Something went wrong", res.message);
        }
      })
    }
    else {
      this.dataTransferService.addreligion(this.ReligionForm.value).subscribe((res: any) => {
        console.log('addreligions', res);
        if (res.statusCode == 200) {
          this.toastr.success('', 'New religion Saved.');
          this.getAllreligion();
        } else {
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }
  }
  onReset() {
    this.submitted = false;
    this.ReligionForm.reset();
  }

  getAllreligion() {
    this.dataTransferService.getreligion().subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.religionList = res.data;
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
    this.editId = record.RE_id;
    this.onReset();
    this.showForm = true;
    this.ReligionForm.patchValue(record);
  }
  addRecord() {
    this.isReadonly = false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }


}
