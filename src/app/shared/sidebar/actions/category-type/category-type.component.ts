import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { invalid } from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any; 

@Component({
  selector: 'app-category-type',
  templateUrl: './category-type.component.html',
  styleUrls: ['./category-type.component.scss']
})
export class CategoryTypeComponent implements OnInit {

  categorytypeList:any;
  p:number=1;
  addCategorytype = false;
  showForm = false;
  term:string;
  queryParam:any;
  categorytypeForm : FormGroup;
  submitted = false;
  title = 'Add New';
  isReadonly = false;

  constructor(private formBuilder: FormBuilder,
    private dataTransferService : DataTransferService,
    private toastr:ToastrService,
    private router:Router,
    private activeRoute: ActivatedRoute) { }
    
    get f() {
      return this.categorytypeForm.controls;
    }
  ngOnInit(): void {        
    this.initForm();
    this.getAllcategorytype();
    this.queryParam = this.activeRoute.snapshot.queryParams.id;
    console.log('this.queryParam',this.queryParam);
    if(this.queryParam!=(undefined||null)){
      if(this.activeRoute.snapshot.queryParams.view){
        this.title = "View";
        this.isReadonly = true;
      }
    }
  }
  initForm(){
    this.categorytypeForm = this.formBuilder.group({

      AN_title: [''],
      AN_recordLink: [''],
      AN_id:[]
    })
  }
  /*  */
  
  
  onSubmit(){
    this.submitted = true;
    console.log('this.categorytypeForm.value',this.categorytypeForm.value);
    if (this.categorytypeForm.invalid) {
      console.log('invalid form');
      this.toastr.info('', 'Please fill all required fields');
      return;
    }     
    if(this.title=='Edit'){
      this.categorytypeForm.value.CTY_id = this.editId;
      this.dataTransferService.updateCategorytype(this.categorytypeForm.value).subscribe((res:any)=>{
        console.log('EDIT Category ',res);
        if(res.status==200){
          this.toastr.success('',res.message);
          $("#my-modal").modal("hide");
          this.getAllcategorytype();//refresh list
        }else{
          this.toastr.error("",res.message);
        }
      })
    }else{
      this.dataTransferService.addCategorytype(this.categorytypeForm.value).subscribe((res:any)=>{
        console.log('addCategoryType',res);
        if(res.status==200){
          $("#my-modal").modal("hide");
          this.toastr.success('', 'Category Type Saved.');
          this.onReset();
        }else{
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }    
  }onReset(){
    this.submitted=false;
    this.categorytypeForm.reset();
  }

/*  */
  getAllcategorytype(){
    this.dataTransferService.getAllcategorytype().subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.categorytypeList = res.obj;
      }
    })
  }
  editId:any;
  editRecord(record:any,title:string){
    this.isReadonly=false;
    this.title = title;
    if(this.title=='View'){
      this.isReadonly=true;
    }
    this.editId = parseInt(record.AN_id);
    this.onReset();
    this.showForm = true;
    this.categorytypeForm.patchValue(record);
  }
  addRecord(){
    this.isReadonly=false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }
}
