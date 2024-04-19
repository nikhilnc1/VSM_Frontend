import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent implements OnInit {
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
    this.getAlldegree();
    this.getAllindustry();   
  }
  initForm(){
    this.DegreeForm = this.formBuilder.group({
      DE_id:[''],
      DE_title:[''],
      DE_description:[''],
      DE_industryId:[''],
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
      this.DegreeForm.value.DE_id=this.editId;
      this.dataTransferService.updateDegree(this.DegreeForm.value).subscribe((res:any)=>{
       console.log('Edit Degree ',res);
       if(res.statusCode==200){
         this.toastr.success('Updated successfully',res.message);
        //  this.showForm = false; //hide form
         this.getAlldegree();
       }else{
         this.toastr.error("Something went wrong",res.message);
       }
      })
    }
    else{
      this.dataTransferService.addnewDegree(this.DegreeForm.value).subscribe((res:any)=>{
        console.log('adddegrees',res);
        if(res.statusCode==200){
          this.toastr.success('', 'New degree Saved.');
          this.getAlldegree();
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

  getAlldegree(){
    this.dataTransferService.getdegree().subscribe((res:any)=>{
      console.log(res);
      if(res.statusCode==200){
        this.degreeList = res.data;
      }
    })
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
    this.editId = record.DE_id;
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


