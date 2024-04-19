import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-regional-accent',
  templateUrl: './regional-accent.component.html',
  styleUrls: ['./regional-accent.component.scss']
})
export class RegionalAccentComponent implements OnInit {

  
  RegionalAccentForm: FormGroup;
  regionalAccentList: any;
  regionalAccentid: number[];
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
    this.getAllregionalAccent();
    // this.getAllindustry();
  }
  initForm() {
    this.RegionalAccentForm = this.formBuilder.group({
      RA_id: [''],
      RA_title: [''],
      RA_description: ['']
      // "updateKey1":  "RA_title",
      // "updateKey2" : "RA_description",
      // "updateKey3": "DE_industryId",
      // "updateValue1": RA_title:[''],
      // "updateValue2": RA_description:[''],
      // "updateValue3" : DE_industryId:[''],
    })
  }
  onSubmit() {
    this.submitted = true;
    console.log('this.RegionalAccentForm.value', this.RegionalAccentForm.value);
    if (this.RegionalAccentForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    if (this.title == 'Edit') {
      console.log("Edit RegionalAccent", this.editId)
      this.RegionalAccentForm.value.RA_id = this.editId;
      this.dataTransferService.updateregional(this.RegionalAccentForm.value).subscribe((res: any) => {
        console.log('Edit RegionalAccent ', res);
        if (res.statusCode == 200) {
          this.toastr.success('Updated successfully', res.message);
          this.showForm = false; //hide form
          this.getAllregionalAccent();
        } else {
          this.toastr.error("Something went wrong", res.message);
        }
      })
    }
    else {
      this.dataTransferService.addregionalAccent(this.RegionalAccentForm.value).subscribe((res: any) => {
        console.log('addregionalAccents', res);
        if (res.statusCode == 200) {
          this.toastr.success('', 'New regionalAccent Saved.');
          this.getAllregionalAccent();
        } else {
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }
  }
  onReset() {
    this.submitted = false;
    this.RegionalAccentForm.reset();
  }

  getAllregionalAccent() {
    this.dataTransferService.getregionalAccent().subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.regionalAccentList = res.data;
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
    this.editId = record.RA_id;
    this.onReset();
    this.showForm = true;
    this.RegionalAccentForm.patchValue(record);
  }
  addRecord() {
    this.isReadonly = false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }


}


