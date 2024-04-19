import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  CountryForm: FormGroup;
  countryList: any;
  countryid: number[];
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
    this.getAllcountry();
    // this.getAllindustry();
  }
  initForm() {
    this.CountryForm = this.formBuilder.group({
      COU_id: [''],
      COU_name: [''],
      COU_code: [''],
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
    console.log('this.CountryForm.value', this.CountryForm.value);
    if (this.CountryForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    if (this.title == 'Edit') {
      console.log("Edit Country", this.editId)
      this.CountryForm.value.DE_id = this.editId;
      this.dataTransferService.updateDegree(this.CountryForm.value).subscribe((res: any) => {
        console.log('Edit Country ', res);
        if (res.statusCode == 200) {
          this.toastr.success('', res.message);
          this.showForm = false; //hide form
          this.getAllcountry();
        } else {
          this.toastr.error("", res.message);
        }
      })
    }
    else {
      this.dataTransferService.addcountry(this.CountryForm.value).subscribe((res: any) => {
        console.log('addcountrys', res);
        if (res.statusCode == 200) {
          this.toastr.success('', 'New country Saved.');
          this.getAllcountry();
        } else {
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }
  }
  onReset() {
    this.submitted = false;
    this.CountryForm.reset();
  }

  getAllcountry() {
    this.dataTransferService.getcountry().subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.countryList = res.data;
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
    this.editId = record.DE_id;
    this.onReset();
    this.showForm = true;
    this.CountryForm.patchValue(record);
  }
  addRecord() {
    this.isReadonly = false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }


}
