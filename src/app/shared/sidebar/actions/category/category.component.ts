import { Component, OnInit, ViewChild , ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { FileValidator } from 'src/app/shared/validators/fileValidator.validator';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/config/constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  
  optionsList : any;
  categoryList: any;
  p: number = 1;
  showForm = false;
  term: string;
  categoryForm: FormGroup;
  submitted = false;
  queryParam: any;
  title = 'Add New';
  isReadonly = false;
  imgSrc: any;
  editId: any;
  logoSrc = Constants.IMG_API_BASE;
  @ViewChild('fileInput') el:ElementRef;

  constructor(private formBuilder: FormBuilder,
    private dataTransferService: DataTransferService,
    private toastr: ToastrService) {
    this.categoryForm = this.formBuilder.group({
      CAT_title: ['', [Validators.required]],
      CAT_description: ['', [Validators.required]],
      CAT_isfeatured: ['', [Validators.required]],
      CAT_isactive: ['', [Validators.required]],
      CAT_dp: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.showForm = false;
    this.isReadonly = false;
    this.getAllCategory();
    this.getAllOption();
  }

  triggerUpload () {    
    var fileuploader:any = this.el.nativeElement;
    fileuploader.click('click');
  }
  fileName: any;
  fileType: any;
  onFileSelect(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    this.fileName = file.name;
    this.fileType = file.type;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.categoryForm.patchValue({ CAT_dp: reader.result });
      //this.temp = reader.result;
    }
    if (this.fileType === '') {
      this.fileType = (this.fileName.replace(/^.*[\\\/]/, "")).split(".")[1].toUpperCase();
    }

    console.log(file, event.target, this.fileName, this.fileType);

    this.categoryForm.controls['CAT_dp'].setValidators([
      Validators.required,
      FileValidator.fileTypeValidator(["jpg", "png", "pdf", "jpeg"])
    ]);

    this.categoryForm.controls['CAT_dp'].updateValueAndValidity();
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imgSrc = reader.result;
        this.categoryForm.patchValue({
          CAT_dp: file
        });
      }
    }
    console.log(this.categoryForm.value.CAT_dp);
  }

  get f() {
    return this.categoryForm.controls;
  }

  getAllCategory() {
    this.dataTransferService.getAllCategory().subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        this.categoryList = res.obj;
      }
    })
  }
  getAllOption() {
    this.dataTransferService.getAllOptions().subscribe((res:any)=>{
      console.log('getAll Option List',res);
      if(res.status==200){
        this.optionsList = res.obj;
      }
    })
  }
  optionListing : any = [];
  getOptionByCategory(){
    var postData = { findby :'categoryId',value:this.queryParam };
    this.dataTransferService.getOptionByCategory(postData).subscribe((res: any) => {
      console.log('getCarGraphics', res);
      if (res.status == 200) {
        this.getOptionByCategory= res.obj;
      }

    })
  }
  editRecord(record: any, title: string) {
    this.isReadonly = false;
    this.title = title;
    if (this.title == 'View') {
      this.isReadonly = true;
    }
    /* this.title = 'Edit'; */
    this.editId = record.CAT_id;
    this.onReset();
    this.showForm = true;
    this.populateFormValues(record);
  }
  addRecord() {
    this.isReadonly = false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }

  populateFormValues(object: any) {
    console.log('populateFormValues', object);
    this.categoryForm.patchValue({
      CAT_title: object.CAT_title,
      CAT_description: object.CAT_description,
      CAT_isfeatured: object.CAT_isfeatured,
      CAT_isactive: object.CAT_isactive,
      CAT_dp: object.CAT_dp
    });
    this.imgSrc = this.logoSrc + object.CAT_dp;
  }

  addCategory(formData: FormData) {
    this.dataTransferService.addCategory(formData).subscribe((res: any) => {
      console.log('addCategory', res);
      if (res.status == 200) {
        this.toastr.success('', 'Category Saved.');
        this.ngOnInit();
      } else {
        this.toastr.error("", "Something Went Wrong");
      }
    })
  }

  updateCategory(formData: FormData) {
    formData.append('CAT_id', this.editId);
    this.dataTransferService.updateCategory(formData).subscribe((res: any) => {
      console.log('updateCategory', res);
      if (res.status == 200) {
        this.toastr.success('', res.message);
        this.ngOnInit();
      } else {
        this.toastr.error("", res.message);
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log('fom values', this.categoryForm.value);
    if (this.categoryForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    console.log('this.categoryForm.value', this.categoryForm.value, this.title);
    const formData = new FormData();
    formData.append('CAT_title', this.categoryForm.value.CAT_title);
    formData.append('CAT_description', this.categoryForm.value.CAT_description);
    formData.append('CAT_isfeatured', this.categoryForm.value.CAT_isfeatured);
    formData.append('CAT_isactive', this.categoryForm.value.CAT_isactive);
    formData.append('file', this.categoryForm.value.CAT_dp);
    if (this.title == 'Edit') {
      this.updateCategory(formData);
    }
    else {
      this.addCategory(formData);
    }
  }

  onReset() {
    this.submitted = false;
    this.imgSrc = '';
    this.categoryForm.reset();
  }
}

