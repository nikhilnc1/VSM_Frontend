import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss']
})
export class IndustryComponent implements OnInit {

  DegreeForm: FormGroup;
  degreeList:any;
  degreeid:number[];
  industryList:any;
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
    this.getAllindustry();   
  }
  initForm(){
    this.DegreeForm = this.formBuilder.group({
      IN_id:[''],
      IN_name:[''],
      IN_description:[''],
      IN_parent:[''],
      IN_createdBy:[''],
      IN_updatedBy:[''],
      IN_createdAt:['']
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
    console.log('this.DegreeForm.value',this.DegreeForm.value);
    if (this.DegreeForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }    
    if(this.title == 'Edit')
    {
      console.log("Edit Degree",this.editId)
      this.DegreeForm.value.IN_id=this.editId;
      this.dataTransferService.updateIndustry(this.DegreeForm.value).subscribe((res:any)=>{
       console.log('Edit Degree ',res);
       if(res.statusCode==200){
         this.toastr.success('Update Successfully',res.message);
         this.showForm = false; //hide form
         this.getAllindustry();
       }else{
         this.toastr.error('Somethind went wrong',res.message);
       }
      })
    }
    else{
      this.dataTransferService.addIndustry(this.DegreeForm.value).subscribe((res:any)=>{
        console.log('adddegrees',res);
        if(res.statusCode==200){
          this.toastr.success('', 'New degree Saved.');
          this.getAllindustry();
        }else{
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }     
  }
  onReset(){
    this.submitted=false;
    this.DegreeForm.reset();
  }


  getAllindustry()
  {
    this.dataTransferService.getindustry().subscribe((res:any)=>{
      console.log(res);
      if(res.statusCode==200){
        this.industryList = res.data;
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
    this.editId = record.IN_id;
    this.onReset();
    this.showForm = true;
    this.DegreeForm.patchValue(record);
  }
  addRecord(){
    this.isReadonly=false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }

}
