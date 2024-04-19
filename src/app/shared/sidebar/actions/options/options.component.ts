import { Component, OnInit, ViewChild , ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { FileValidator } from 'src/app/shared/validators/fileValidator.validator';
import { Constants } from 'src/app/config/constants';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  addOption = false;
  optionList: any;
  p: number = 1;
  categoryList:any;
  showForm = false;
  term: string;
  optionForm: FormGroup;
  submitted = false;
  title = 'Add New';
  isReadonly = false;
  imgSrc: any;
  editId: any;
  logoSrc = Constants.IMG_API_BASE;
  @ViewChild('fileInput') el:ElementRef;


  constructor(private formBuilder: FormBuilder,
    private dataTransferService: DataTransferService,
    private toastr: ToastrService) {
    this.optionForm = this.formBuilder.group({
      OP_title: ['', [Validators.required]],
      OP_description: ['', [Validators.required]],
      OP_data: ['', [Validators.required]],
      OP_dp: ['', [Validators.required]],
      OP_categoryId : ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.showForm = false;
    this.isReadonly = false;
    this.getAllCategory();
    this.getAllOptions();
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
      this.optionForm.patchValue({ OP_dp: reader.result });
      //this.temp = reader.result;
    }
    if (this.fileType === '') {
      this.fileType = (this.fileName.replace(/^.*[\\\/]/, "")).split(".")[1].toUpperCase();
    }

    console.log(file, event.target, this.fileName, this.fileType);

    this.optionForm.controls['OP_dp'].setValidators([
      Validators.required,
      FileValidator.fileTypeValidator(["jpg", "png", "pdf", "jpeg"])
    ]);

    this.optionForm.controls['OP_dp'].updateValueAndValidity();
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log(event.target.files)
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
      this.imgSrc = reader.result;
      this.optionForm.patchValue({
        OP_dp: file
      });
    }
  }
    console.log(this.optionForm.value.OP_dp);
  }

  get f() {
    return this.optionForm.controls;
  }

  saveOption(formData: FormData){
    this.dataTransferService.addOption(formData).subscribe((res: any) => {
      console.log('addOption', res);
      if (res.status == 200) {
        this.toastr.success('', 'Option Saved.');
        this.ngOnInit();
      } else {
        this.toastr.error("", "Something Went Wrong");
      }
    })
  }
  updateOption(formData : FormData){
    formData.append('OP_id', this.editId)
    this.dataTransferService.updateOption(formData).subscribe((res: any) => {
      console.log('addOption', res);
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
    console.log('form values', this.optionForm.value);
    if (this.optionForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    console.log('this.optionForm.value', this.optionForm.value)
    const formData = new FormData();
    formData.append('OP_title', this.optionForm.value.OP_title);
    formData.append('OP_description', this.optionForm.value.OP_description);
    formData.append('OP_data', this.optionForm.value.OP_data);
    formData.append('OP_categoryId', this.optionForm.value.OP_categoryId);
    formData.append('file', this.optionForm.value.OP_dp);
    if (this.title == 'Edit') {
      this.updateOption(formData);
    }
    else {
      this.saveOption(formData);
    }


  } onReset() {
    this.submitted = false;
    this.imgSrc = '';
    this.optionForm.reset();
  }


  /*  */
  getAllOptions() {
    this.dataTransferService.getAllOptions().subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        this.optionList = res.obj;
      }
    })
  }
  
  addRecord() {
    this.isReadonly = false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }
  getAllCategory(){
    this.dataTransferService.getAllCategory().subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.categoryList = res.obj;
      }
    })
  }
/*   editId:any;
 */  editRecord(record:any,title:string) {
    console.log('catagery',this.categoryList);
    this.isReadonly = false;
    this.title = title;
    if (this.title == 'View') {
      this.isReadonly = true;
    }
/*     this.title = 'View';
 */    this.editId = record.OP_id;
    this.onReset();
    this.showForm = true;
    this.populateFormValues(record);
  }

  populateFormValues(object: any) {
    console.log('populateFormValues', object);
    this.optionForm.patchValue({
      OP_title: object.OP_title,
      OP_description: object.OP_description,
      OP_data: object.OP_data,
      OP_dp: object.OP_dp,
      OP_categoryId:object.OP_categoryId,
    });
    this.imgSrc = this.logoSrc + object.OP_dp;
  }
}
