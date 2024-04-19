import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {


  PagesForm: FormGroup;
  pagesList: any;
  p: number = 1;
  addMedia = false;
  showForm = false;
  queryParam: any;
  soundForm: FormGroup;
  term: string;
  submitted = false;
  imagedp: any;
  selectedRecord: any;
  title = 'Add New';
  isReadonly = false;
  imageName: any;
  baseurl: any = 'https://voxpod.s3.eu-west-2.amazonaws.com/';
  constructor(private formBuilder: FormBuilder,
    private dataTransferService: DataTransferService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllpages();
  }

  initForm() {
    this.PagesForm = this.formBuilder.group({
      PA_id: [''],
      PA_title: [''],
      PA_description: [''],
      PA_dp: [''],
      PA_type: [''],
      PA_data: ['']
      // "updateKey1":  "DE_title",
      // "updateKey2" : "DE_description",
      // "updateKey3": "DE_industryId",
      // "updateValue1": DE_title:[''],
      // "updateValue2": DE_description:[''],
      // "updateValue3" : DE_industryId:[''],
    })
  }

  getuploadDp(record: any) {
    console.log("Record :", record);
    // this.imagedp = this.imageName.name;
    // this.soundForm.value.PA_dp = this.baseurl + this.imagedp;
    console.log(this.imageName, 'file');
    this.dataTransferService.uploadurl(this.imageName).subscribe((res: any) => {
      console.log('Url Record', res);
      if (!res.error) {
        this.toastr.success('upload file successfully', res.message);
        this.showForm = true;
        this.soundForm.patchValue(record);

        this.getAllpages();
      } else {
        this.toastr.error("", res.message);
      }
    })
    this.soundForm.value.PA_id = record.PA_id;
    this.imagedp = this.imageName.name;
    this.soundForm.value.PA_dp = this.baseurl + this.imagedp;
    let postData = { PA_id: record.PA_id, PA_dp: this.baseurl + this.imagedp }
    this.dataTransferService.updateAll(postData).subscribe((res: any) => {
      console.log('Url Record', res);
      if (!res.error) {
        this.toastr.success('Save data succesfully', res.message);
        this.showForm = true;

        this.getAllpages();

      } else {
        this.toastr.error("", res.message);
      }
    })
  }


  onSubmit() {
    this.submitted = true;
    console.log('this.PagesForm.value', this.PagesForm.value);
    if (this.PagesForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    if (this.title == 'Edit') {
      console.log("Edit Pages", this.editId)
      this.PagesForm.value.PA_id = this.editId;
      this.dataTransferService.updatepages(this.PagesForm.value).subscribe((res: any) => {
        console.log('Edit Pages ', res);
        if (res.statusCode == 200) {
          this.toastr.success('Updated Successfully', res.message);
          this.showForm = false; //hide form
          this.getAllpages();
        } else {
          this.toastr.error("", res.message);
        }
      })
    }
    else {
      this.dataTransferService.addpages(this.PagesForm.value).subscribe((res: any) => {
        console.log('addPages', res);
        if (res.statusCode == 200) {
          this.toastr.success('', 'New pages Saved.');
          this.getAllpages();
        } else {
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }
  }
  onReset() {
    this.submitted = false;
    this.PagesForm.reset();
  }

  onimageSelected(event: any) {
    this.imageName = event.target.files[0];
    console.log('image data', this.imageName);
    this.imagedp = this.imageName.value;
  }

  getAllpages() {
    this.dataTransferService.getpages().subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.pagesList = res.data;
      }
    })
  }
  editId: any;
  page_dp: any;
  editRecord(record: any, title: string) {
    this.isReadonly = false;
    //window.scrollTo(0, 0);
    this.title = title;
    if (this.title == 'View') {
      this.isReadonly = true;
    }
    this.editId = record.PA_id;
    this.page_dp = record.PA_dp;
    console.log(this.page_dp);
    this.onReset();
    this.showForm = true;
    this.PagesForm.patchValue(record);
  }
  addRecord() {
    this.isReadonly = false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }



}
