import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any; 

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {

   addVariable = false;
   variableList:any;
   p:number=1;
   showForm = false;
   term:string;
   variableForm : FormGroup;
   submitted = false;
   title = 'Add New';
   isReadonly = false;

  constructor(private formBuilder: FormBuilder,
    private dataTransferService : DataTransferService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllvariable();
  }

  initForm(){
    this.variableForm = this.formBuilder.group({

      VAR_title: ['', [Validators.required]],
      VAR_description: [''],
      VAR_data : ['']
    })
  }

  get f() {
    return this.variableForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    console.log('fom values',this.variableForm.value);
    if (this.variableForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
   /*  console.log('this.variable.value',this.variableForm.value)
     const formData = new FormData();
     formData.append('VAR_title',this.variableForm.value.VAR_title)
     formData.append('VAR_description',this.variableForm.value.VAR_description)
     formData.append('VAR_data',this.variableForm.value.VAR_data) */
      if(this.title=='Edit'){
        this.variableForm.value.VAR_id = this.editId;
        this.dataTransferService.updateVariable(this.variableForm.value).subscribe((res:any)=>{
        console.log('Edit Variable',res);
        if(res.status==200){
          this.toastr.success('',res.message);
          $("#my-modal").modal("hide");
          this.getAllvariable(); // refresh List
        }else{
          this.toastr.error("",res.message);
        }
      })
      }else{
       this.dataTransferService.addVariable(this.variableForm.value).subscribe((res:any)=>{
        console.log('add Variable',res);
        if(res.status==200){
        $("#my-modal").modal("hide");
        this.toastr.success('', 'Variable Saved.');
        this.onReset();
      }else{
        this.toastr.error("", "Something Went Wrong");
      }
    })
  }
  }onReset(){
    this.submitted = false;
    this.variableForm.reset();
  }

  getAllvariable(){
    this.dataTransferService.getAllvariable().subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.variableList = res.obj;
      }
    })
  }
  editId:any;
  editRecord(record:any,title:string){
    this.isReadonly=false;
    this.title =title;
    if(this.title=='View'){
      this.isReadonly=true; 
    }
    this.editId = record.VAR_id;
    this.onReset();
    this.showForm = true;
    this.variableForm.patchValue(record);
  }
  addRecord(){
    this.isReadonly=false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }
}
