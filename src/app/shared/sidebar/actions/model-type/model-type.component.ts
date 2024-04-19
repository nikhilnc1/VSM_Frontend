import { Component, OnInit, ViewChild , ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { FileValidator } from 'src/app/shared/validators/fileValidator.validator';
import { ToastrService } from 'ngx-toastr';
import { invalid } from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';

@Component({
  selector: 'app-model-type',
  templateUrl: './model-type.component.html',
  styleUrls: ['./model-type.component.scss']
})
export class ModelTypeComponent implements OnInit {

  modeltypeList : any;
  p:number=1;
  showForm = false;
  term:string;
  queryParam:any;
  modeltypeForm : FormGroup;
  submitted = false;
  title = 'Add New';
  isReadonly = false;
  imgSrc: any;
  editId: any;
  logoSrc = Constants.IMG_API_BASE;
  @ViewChild('fileInput') el:ElementRef;

  constructor(private formBuilder: FormBuilder,
    private dataTransferService : DataTransferService,
    private toastr:ToastrService) {
      this.modeltypeForm = this.formBuilder.group({
        MT_title: ['', [Validators.required]],
        MT_description: ['', [Validators.required]],
        MT_dp: ['', [Validators.required]],
        MT_slug: ['', [Validators.required]]
      
      })
     }
    
    
  ngOnInit(): void {
    this.showForm = false;
    this.isReadonly = false;
    this.getAllModeltype();
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
      this.modeltypeForm.patchValue({ MT_dp: reader.result });
      //this.temp = reader.result;
    }
    if (this.fileType === '') {
      this.fileType = (this.fileName.replace(/^.*[\\\/]/, "")).split(".")[1].toUpperCase();
    }

    console.log(file, event.target, this.fileName, this.fileType);

    this.modeltypeForm.controls['MT_dp'].setValidators([
      Validators.required,
      FileValidator.fileTypeValidator(["jpg", "png", "pdf", "jpeg"])
    ]);

    this.modeltypeForm.controls['MT_dp'].updateValueAndValidity();
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imgSrc = reader.result;
        this.modeltypeForm.patchValue({
          MT_dp: file
        });
      }
    }
    console.log(this.modeltypeForm.value.MT_dp);
  }

  get f() {
    return this.modeltypeForm.controls;
  }

  getAllModeltype(){
    this.dataTransferService.getAllmodeltype().subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.modeltypeList = res.obj;
      }
    })
  }

  editRecord(record: any, title: string){
    console.log('record',record);
    this.isReadonly=false;
    this.title = title;
    if(this.title=='View'){
      this.isReadonly=true;
    }
    this.editId = (record.MT_id);
    this.onReset();
    this.showForm = true;
    this.populateFormValues(record)
  }
   addRecord(){
    this.isReadonly=false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }

  populateFormValues(object: any) {
    console.log('populateFormValues', object);
    this.modeltypeForm.patchValue({
      MT_title: object.MT_title,
      MT_description: object.MT_description,
      MT_dp: object.MT_dp,
      MT_slug: object.MT_slug
    });
    this.imgSrc = this.logoSrc + object.MT_dp;
  }

  addModeltype(formData: FormData) {
    this.dataTransferService.addModeltype(formData).subscribe((res: any) => {
      console.log('addModeltype', res);
      if (res.status == 200) {
        this.toastr.success('', 'Model-Type Saved.');
        this.ngOnInit();
      } else {
        this.toastr.error("", "Something Went Wrong");
      }
    })
  }

  updateModeltype(formData: FormData) {
    formData.append('MT_id', this.editId);
    this.dataTransferService.updateModeltype(formData).subscribe((res: any) => {
      console.log('updateModeltype', res);
      if (res.status == 200) {
        this.toastr.success('', res.message);
        this.ngOnInit();
      } else {
        this.toastr.error("", res.message);
      }
    })
  }
 
  onSubmit(){
    this.submitted = true;
    console.log('this.modeltypeForm.value',this.modeltypeForm.value);
    if (this.modeltypeForm.invalid) {
      console.log('invalid form');
      this.toastr.info('', 'Please fill all required fields');
      return;
    } 
    console.log('this.modeltypeForm.value', this.modeltypeForm.value, this.title);
    const formData = new FormData();
    formData.append('MT_title', this.modeltypeForm.value.MT_title);
    formData.append('MT_description', this.modeltypeForm.value.MT_description);
    formData.append('file', this.modeltypeForm.value.MT_dp);
    formData.append('MT_slug', this.modeltypeForm.value.MT_slug);
    if(this.title=='Edit'){
          this.updateModeltype(formData);//refresh list
        }
        else{
          this.addModeltype(formData);
        }
      }  
  
      onReset(){
    this.submitted=false;
    this.imgSrc = '';
    this.modeltypeForm.reset();
  }
}
