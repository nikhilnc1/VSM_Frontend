import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersList:any;
  AddUser = false;
  showForm = false;
  roles:any;
  p:number=1;
  term: string;
  isReadonly = false;
  userForm : FormGroup;
  submitted = false;
  title = 'Add New';
  queryParam :any;
  
  constructor(private formBuilder: FormBuilder,
    private dataTransferService:DataTransferService,
    private toastr:ToastrService,
    private domSanitizer: DomSanitizer,
    private router:Router,
    private activeRoute: ActivatedRoute) { }

    get f(){
      return this.userForm.controls;
    }

  ngOnInit(): void {
    this.initForm();
    this.getAllRole()
    this.getAllUsers();
    this.queryParam = this.activeRoute.snapshot.queryParams.id;
     console.log('this.queryParam',this.queryParam);
     if(this.queryParam!=(undefined||null)){
      if(this.activeRoute.snapshot.queryParams.view){
        this.title = "view";
        this.isReadonly = true;
      } 
     }
  }
  initForm(){
    this.userForm = this.formBuilder.group({
      
      US_id:[],
      US_name:[''],
      US_phone:[''],
      US_email:[''],
      US_designation:[''],
      US_roleId:[],
      US_password:['']
    })
  }

 /*  get f() {
    return this.userForm.controls;
  }
 */
  onSubmit(){
    this.submitted = true;
    console.log('this.userForm.value',this.userForm.value);
    if(this.userForm.invalid) {
      this.toastr.info('','Please fill all required fields');
      return;
    }
    if(this.title == 'Edit')
    {
      console.log('user Edit',this.editId)
      this.userForm.value.US_id=this.editId;
      this.dataTransferService.updateUser(this.userForm.value).subscribe((res:any)=>{
        console.log('Edit User',res);
        if(res.status==200){
          this.toastr.success('',res.message);
          this.showForm = false; //hide form
          this.getAllUsers();
        }else{
          this.toastr.error('',res.message);
        }
      })
    }
    else{
      this.dataTransferService.addUser(this.userForm.value).subscribe((res:any)=>{
        console.log('addUser',res);
        if(res.status==200){
          this.toastr.success('','User Saved. ');
          this.onReset();
          this.showForm = false; //hide form
          this.getAllUsers();
        }else{
          this.toastr.error('','Something Went Wrong');
        }
      })
    }
  }

  onReset(){
    this.submitted=false;
    this.userForm.reset();
  }

  getAllUsers(){
    this.dataTransferService.getAllUsers().subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.usersList = res.obj;
      }
    })
  }
  getAllRole(){
    this.dataTransferService.getAllRole().subscribe((res:any)=>{
      console.log('getAllRoles',res);
      if(res.status==200){
        this.roles = res.obj;
      }
    })
  }
  editId:any;
  editRecord(record:any,title:string){
    this.isReadonly=false;
   console.log('record',record,this.roles);
    this.title =title;
    if(this.title=='View'){
      this.isReadonly=true;
    }
    this.editId = record.US_id;
    this.onReset();
    this.showForm = true;
    this.userForm.patchValue(record);
    console.log('user',this.userForm.value);
  }
  addRecord(){
    this.isReadonly=false;
    this.title = 'Add new';
    this.onReset();
    this.showForm = true;
  }
}
