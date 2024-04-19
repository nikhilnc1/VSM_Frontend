import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any; 
@Component({
  selector: 'app-media-type',
  templateUrl: './media-type.component.html',
  styleUrls: ['./media-type.component.scss']
})
export class MediaTypeComponent implements OnInit {

  graphictypeList:any;
  p:number=1;
  addMedia = false;
  showForm = false;
  queryParam:any;
  term: string;
  graphictypeForm : FormGroup;
  submitted = false;
  title = 'Add New';
  isReadonly = false;


  constructor(private formBuilder: FormBuilder,
    private dataTransferService : DataTransferService,
    private toastr:ToastrService,
    private router:Router,
    private activeRoute: ActivatedRoute) { }

    get f() {
      return this.graphictypeForm.controls;
    }
  

  ngOnInit(): void {
    this.initForm();
    this.getAllGraphictype();    
  }

  initForm(){
    this.graphictypeForm = this.formBuilder.group({

      GTY_title: ['', [Validators.required]],
      GTY_id:[],
      GTY_description: ['']
    })
  }

  /* get f() {
    return this.graphictypeForm.controls;
  } */

  onSubmit(){
    this.submitted = true;
    console.log('this.GraphictypeForm.value',this.graphictypeForm.value);
    if (this.graphictypeForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }    
    if(this.title == 'Edit')
    {
      console.log("Edit Media",this.editId)
      this.graphictypeForm.value.GTY_id=this.editId;
      this.dataTransferService.updateGraphictype(this.graphictypeForm.value).subscribe((res:any)=>{
       console.log('Edit Media ',res);
       if(res.status==200){
         this.toastr.success('',res.message);
         this.showForm = false; //hide form
         $("#my-modal").modal("hide");
         this.getAllGraphictype();
       }else{
         this.toastr.error("",res.message);
       }
      })
    }
    else{
      this.dataTransferService.addGraphictype(this.graphictypeForm.value).subscribe((res:any)=>{
        console.log('addMediaType',res);
        if(res.status==200){
          this.toastr.success('', 'media Type Saved.');
          $("#my-modal").modal("hide");
          this.getAllGraphictype();
        }else{
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }     
  }
  onReset(){
    this.submitted=false;
    this.graphictypeForm.reset();
  }

  getAllGraphictype(){
    this.dataTransferService.getAllGraphictype().subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.graphictypeList = res.obj;
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
    this.editId = record.GTY_id;
    this.onReset();
    this.showForm = true;
    this.graphictypeForm.patchValue(record);
  }
  addRecord(){
    this.isReadonly=false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }
}

