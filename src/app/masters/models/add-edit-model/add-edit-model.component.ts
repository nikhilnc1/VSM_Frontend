import { Component, OnInit ,ViewChild , ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { FileValidator } from 'src/app/shared/validators/fileValidator.validator';
import { Constants } from 'src/app/config/constants';
declare var $: any;
@Component({
  selector: 'app-add-edit-model',
  templateUrl: './add-edit-model.component.html',
  styleUrls: ['./add-edit-model.component.scss']
})
export class AddEditModelComponent implements OnInit {
  submitted = false;
  modeltypeList : any;
  uploadForm: FormGroup;
  brands:any;
  queryParam:any;
  showUploadInput = false;
  modelForm : FormGroup;
  title = 'Add New';
  isReadonly = false;
  imgSrc: any = '';
  logoSrc = Constants.IMG_API_BASE;
  @ViewChild('fileInput') el:ElementRef;
  constructor(private formBuilder: FormBuilder,
              private dataTransferService : DataTransferService,
              private toastr:ToastrService,
              private router:Router,
              private activeRoute: ActivatedRoute) { }
get f() {
    return this.modelForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllBrands();
    this.getAllModeltype();
    this.queryParam = this.activeRoute.snapshot.queryParams.id;
    console.log('this.queryParam',this.queryParam);
    if(this.queryParam!=(undefined||null)){
      if(this.activeRoute.snapshot.queryParams.view){
        this.title = "View";
        this.isReadonly = true;
      }
      else{
        this.title = 'Edit';
      }      
      this.getModelByID(this.queryParam);
    }
  }


  initForm(){
    this.modelForm = this.formBuilder.group({
      
      MO_brandId: [''],
      MO_title : ['', [Validators.required]],
      MO_longdescription : ['', [Validators.required]],
      MO_shortdescription : ['', [Validators.required]],
      MO_pros : ['', [Validators.required]],
      MO_cons :['', [Validators.required]],
      MO_dp : ['', [Validators.required]],
      MO_isdiscontinued : ['', [Validators.required]],
      MO_type : ['', [Validators.required]],
      MO_slug : ['', [Validators.required]],
    });

    this.uploadForm = this.formBuilder.group({
      
      MD_modelId : [''],
      MD_title : ['', [Validators.required]],
      MD_isactive : [0, [Validators.required]],
      MD_url : ['', [Validators.required]],
    })
  }
  fileName : any; 
  fileType:any;
  onFileSelect(event:any){
  const file:File = event.target.files[0];
  const reader= new FileReader();
  this.fileName = file.name;
  this.fileType = file.type;
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.modelForm.patchValue({ MO_dp : reader.result});
    this.imgSrc = reader.result;
  }
  if(this.fileType===''){
    this.fileType = (this.fileName.replace(/^.*[\\\/]/, "")).split(".")[1].toUpperCase();
  }

  console.log(file,event.target,this.fileName,this.fileType);

  this.modelForm.controls['MO_dp'].setValidators([
    Validators.required,
    FileValidator.fileTypeValidator(["jpg","png","pdf","jpeg"])
  ] );

  this.modelForm.controls['MO_dp'].updateValueAndValidity();
}

triggerUpload () {    
  var fileuploader:any = this.el.nativeElement;
  fileuploader.click('click');
}
onFileChange(event:any) {
  const file = event.target.files[0];
  if (file) {
    var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imgSrc = reader.result;
        this.modelForm.patchValue({
          MO_dp: file
    });
  }
}
}


  /* get f() {
    return this.modelForm.controls;
  } */

  onSubmit(){
    this.submitted = true;
    console.log('fom values',this.modelForm.value);
    if (this.modelForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    console.log('this.modelForm.value',this.modelForm.value)
     const formData = new FormData();
    formData.append('MO_brandId',this.modelForm.value.MO_brandId);
    formData.append('MO_title',this.modelForm.value.MO_title);
    formData.append('MO_longdescription',this.modelForm.value.MO_longdescription);
    formData.append('MO_shortdescription',this.modelForm.value.MO_shortdescription);
    formData.append('MO_pros',this.modelForm.value.MO_pros);
    formData.append('MO_cons',this.modelForm.value.MO_cons);
    formData.append('MO_isdiscontinued',this.modelForm.value.MO_isdiscontinued);
    formData.append('MO_type',this.modelForm.value.MO_type);
    formData.append('MO_slug',this.modelForm.value.MO_slug);
    formData.append('file',this.modelForm.get('MO_dp')?.value);
   
    if(this.queryParam){ //if queryParam then call Update API
      formData.append('MO_id',this.queryParam);
      this.dataTransferService.updateModel(formData).subscribe((res:any)=>{
        console.log('updateBrand',res);
        if(res.status==200){
          this.toastr.success('', res.message);
          this.router.navigate(['/masters/model-list']);
        }else{
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }else{ this.dataTransferService.addModel(formData).subscribe((res:any)=>{
      console.log('addModel',res);
      if(res.status==200){
        this.toastr.success('', 'Model Saved.');
        this.router.navigate(['/masters/model-list']);
        this.onReset();
      }else{
        this.toastr.error("", "Something Went Wrong");
      }
    })
  }
  }
  
  onReset(){
    this.submitted=false;
    this.modelForm.reset();
  }
  getModelByID(id:any){
    var postData = {findby: 'id',value:id}
    this.dataTransferService.getModelByID(postData).subscribe((res:any)=>{
      console.log('getModelBY ID',res);
      if(res.status == 200){
        this.populateFormValues(res.obj[0]);
      }
    })
  }
  populateFormValues(object:any){
    console.log('populateFormValues',object);
    this.modelForm.patchValue({
      MO_brandId : object.MO_brandId,
      MO_title : object.MO_title,
      MO_longdescription : object.MO_longdescription,
      MO_shortdescription : object.MO_shortdescription,
      MO_pros : object.MO_pros,
      MO_cons : object.MO_cons,
      MO_isdiscontinued : object.MO_isdiscontinued,
      MO_type : object.MO_type,
      MO_slug : object.MO_slug,
      MO_dp : object.MO_dp
    });
    this.imgSrc = this.logoSrc + object.MO_dp;
  }

  getAllBrands(){
    this.dataTransferService.getAllBrands().subscribe((res:any)=>{
      console.log('getAllBrands:',res);
      if(res.status==200){
        this.brands = res.obj;
      }
    })
  }
  getAllModeltype(){
    this.dataTransferService.getAllmodeltype().subscribe((res:any)=>{
      console.log('getAllModelType:',res);
      if(res.status==200){
        this.modeltypeList = res.obj;
      }
    })
  }

  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
      
 
        this.uploadForm.patchValue({ MD_url: file })
      }
    }
/*     console.log('this.url', this.url);
 */  }

  submitUploadForm() {
    console.log('form values', this.uploadForm.value,this.queryParam);
    const formData = new FormData();
    formData.append('MD_modelId', this.queryParam);
    formData.append('MD_isactive', this.uploadForm.value.MD_isactive);
    formData.append('MD_title', this.uploadForm.value.MD_title);
    formData.append('file', this.uploadForm.value.MD_url)
    this.dataTransferService.updateModelDoc(formData).subscribe((res: any) => {
      console.log('update Model Doc', res);
      if (res.status == 200) {
        this.toastr.success(res.message);
        $("#gallery").modal("hide");
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  ModelDoc: any = [];
  getModelDocs() {
    var postData = { findby: 'modelId', value: this.queryParam };
    this.dataTransferService.getModelDoc(postData).subscribe((res: any) => {
      console.log('getModelDoc', res);
      if (res.status == 200) {
        this.ModelDoc = res.obj;
      }

    })
  }
}


