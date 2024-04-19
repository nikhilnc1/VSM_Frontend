import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rto',
  templateUrl: './rto.component.html',
  styleUrls: ['./rto.component.scss']
})
export class RtoComponent implements OnInit {

    rtoList:any; 
    p:number=1;
    addRTO = false;
    showForm = false;
    term:string;
    rtoForm : FormGroup;
    submitted = false;
    title = 'Add New';  
    isReadonly = false;
      

  constructor(private formBuilder: FormBuilder,
    private dataTransferService : DataTransferService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllStaterto();
  }

  initForm(){
    this.rtoForm = this.formBuilder.group({

      STA_name: ['', [Validators.required]],
      STA_petrolt1: [''],
      STA_petrolt2: [''],
      STA_petrolt3:[''],
      STA_dieselt1:[''],
      STA_dieselt2:[''],
      STA_dieselt3:[''],
      STA_cngt1:[''],
      STA_cngt2:[''],
      STA_cngt3:[''],
      STA_companyt1:['']
    })
  }
  /*  */
  
  get f() {
    return this.rtoForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    console.log('form values',this.rtoForm.value);
    if (this.rtoForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    
    if(this.title=='Edit'){
      this.rtoForm.value.STA_id = this.editId;
      this.dataTransferService.updateStaterto(this.rtoForm.value).subscribe((res:any)=>{
        console.log('Edit RTO',res);
        if(res.status==200){
          this.toastr.success('',res.message);
          this.showForm = false; // hide the form
          this.getAllStaterto();
        }else{
          this.toastr.error("",res.message);
        }
      })
    }else{  
    this.dataTransferService.addStaterto(this.rtoForm.value).subscribe((res:any)=>{
      console.log('addRTO',res);
      if(res.status==200){
        this.toastr.success('', 'RTO Saved.');
        this.onReset();
        this.showForm = false; // hideing form after adding record
        this.getAllStaterto(); // Shows Added Data in List
      }else{
        this.toastr.error("", "Something Went Wrong");
      }
    })
  }
  }onReset(){
    this.submitted = false;
    this.rtoForm.reset();
  }

  getAllStaterto(){
    this.dataTransferService.getAllStaterto().subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.rtoList = res.obj;
      }
    })
  }
  editId:any;
  editRecord(record:any,title:string){
    this.isReadonly=false;
    this.title=title;
    if(this.title=='View'){
      this.isReadonly=true;
    }
    this.editId = record.STA_id; 
    this.onReset();
    this.showForm = true;
    this.rtoForm.patchValue(record);
  }
  addRecord(){
    this.isReadonly=false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }
}
