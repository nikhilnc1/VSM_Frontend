import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ethnicity',
  templateUrl: './ethnicity.component.html',
  styleUrls: ['./ethnicity.component.scss']
})
export class EthnicityComponent implements OnInit {

  EthinicityForm: FormGroup;
  ethinicityList:any;
  p:number=1;
  addMedia = false;
  showForm = false;
  queryParam:any;
  term: string;
  submitted = false;
  title = 'Add New';
  isReadonly = false;
  constructor(private formBuilder: FormBuilder,
    private dataTransferService : DataTransferService,
    private toastr:ToastrService,
    private router:Router,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllethinicity();
  }

  initForm(){
    this.EthinicityForm = this.formBuilder.group({
      ET_id:[''],
      ET_title:[''],
      ET_description:[''],
      // "updateKey1":  "DE_title",
      // "updateKey2" : "DE_description",
      // "updateKey3": "DE_industryId",
      // "updateValue1": DE_title:[''],
      // "updateValue2": DE_description:[''],
      // "updateValue3" : DE_industryId:[''],
    })
  }
  onSubmit(){
    this.submitted = true;
    console.log('this.EthinicityForm.value',this.EthinicityForm.value);
    if (this.EthinicityForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }    
    if(this.title == 'Edit')
    {
      console.log("Edit Ethinicity",this.editId)
      this.EthinicityForm.value.ET_id=this.editId;
      this.dataTransferService.updateEthinicity(this.EthinicityForm.value).subscribe((res:any)=>{
       console.log('Edit Ethinicity ',res);
       if(res.statusCode==200){
         this.toastr.success('Updated Successfully',res.message);
         this.showForm = false; //hide form
         this.getAllethinicity();   
       }else{
         this.toastr.error("",res.message);
       }
      })
    }
    else{
      this.dataTransferService.addEthnicity(this.EthinicityForm.value).subscribe((res:any)=>{
        console.log('addEthinicity',res);
        if(res.statusCode==200){
          this.toastr.success('', 'New ethinicity Saved.');
          this.getAllethinicity();
        }else{
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }     
  }
  onReset(){
    this.submitted=false;
    this.EthinicityForm.reset();
  }

  getAllethinicity(){
    this.dataTransferService.getethinicity().subscribe((res:any)=>{
      console.log(res);
      if(res.statusCode==200){
        this.ethinicityList = res.data;
      }
    })
  }
  editId:any;
  editRecord(record:any,title:string){
    this.isReadonly=false;
    //window.scrollTo(0, 0);
    this.title =title;
    if(this.title=='View'){
      this.isReadonly=true;
    }
    this.editId = record.ET_id;
    this.onReset();
    this.showForm = true;
    this.EthinicityForm.patchValue(record);
  }
  addRecord(){
    this.isReadonly=false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }


}
