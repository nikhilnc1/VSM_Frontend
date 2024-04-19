import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  AccessList: any = [];
  roleList: any;
  roleAccess: any = [];
  p: number = 1;
  AddRole = false;
  showForm = false;
  queryParam: any;
  term: string;
  roleForm: FormGroup;
  submitted = false;
  title = 'Add New';
  isReadonly = false;
  RO_isActive: any;

  constructor(private formBuilder: FormBuilder,
    private dataTransferService: DataTransferService,
    private toastr: ToastrService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    this.roleForm = this.formBuilder.group({

      RO_id: [],
      RO_title: ['', [Validators.required]],
      RO_description: [''],
      RO_isActive: [''],
      roleAccess: [''],
    })
  }

  get f() {
    return this.roleForm.controls;
  }
  get roleAccessFormArray(): FormArray {
    return this.roleForm.controls.roleAccess as FormArray;
  }

  private addCheckboxes() {
    this.AccessList.forEach(() => this.roleAccessFormArray.push(new FormControl(false)));
    console.log('roleAccessFormArray', this.roleAccessFormArray);
  }
  ngOnInit(): void {
    this.getAllAccess();
    this.getAllRole();
    this.queryParam = this.activeRoute.snapshot.queryParams.id;
    console.log('this.queryParam', this.queryParam);
    if (this.queryParam != (undefined || null)) {
      if (this.activeRoute.snapshot.queryParams.view) {
        this.title = "view";
        this.isReadonly = true;
      }
    }
  }
  /* get f(){
    return this.roleForm.controls;
  } */
  checkboxClicked() {
    console.log('event called');
    this.AccessList.filter((x: any) => x.checked).map((x: any) => {
      console.log('x', x.AC_title);
    })
  }


  onReset() {
    this.submitted = false;
    this.roleForm.reset();
    this.setCheckBoxDefault();
  }

  getAllRole() {
    this.dataTransferService.getAllRole().subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        this.roleList = res.obj;
      }
    })
  }

  getAllAccess() {
    this.dataTransferService.getAllAccess().subscribe((res: any) => {
      console.log('AccessList', res);
      if (res.status == 200) {
        this.AccessList = res.obj;
        this.setCheckBoxDefault();
      }
    })
  }

  setCheckBoxDefault(){
    this.AccessList.forEach((element: any) => {
      element.checked = false;
    });
  }
  setCheckBoxOnEdit(){
    var postData = {findby:'RoleId',value :this.editId }
    this.dataTransferService.getRoleAccess(postData).subscribe((res:any)=>{
      console.log('getRoleAccess',res);
      if(res.status==200){
        this.AccessList.forEach((element: any) => {
          res.obj.forEach((element1:any)=>{
            if(element.AC_id ==element1.RA_AccesssId ){
              element.checked = true;
            }
          })          
        });
      }
    })
  }
  editId: any;
  editRecord(record: any, title: string) {
    this.isReadonly=false;
    this.title = title;
    if (this.title == 'View') {
      this.isReadonly = true;
    }
    this.editId = record.RO_id;
    this.onReset();
    this.setCheckBoxOnEdit();
    this.showForm = true;
    this.roleForm.patchValue(record);
  }
  addRecord() {
    this.isReadonly=false;
    this.title = 'Add New';    
    this.onReset();
    this.showForm = true;
  }

  updateRole() {
    this.roleForm.value.RO_id = this.editId;
    this.dataTransferService.updateRole(this.roleForm.value).subscribe((res: any) => {
      console.log('Edit Role', res);
      if (res.status == 200) {
        this.toastr.success('', res.message);
        this.showForm = false; //hide form
        this.getAllRole();
      } else {
        this.toastr.error('', res.message);
      }
    })
  }

  addRole() {
    this.dataTransferService.addRole(this.roleForm.value).subscribe((res: any) => {
      console.log('addRole', res);
      if (res.status == 200) {
        this.toastr.success('', 'User Saved. ');
        this.onReset();
        this.showForm=false;
        this.getAllRole();
      } else {
        this.toastr.error('', 'Something Went Wrong');
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    this.roleAccess = [];
    this.AccessList.forEach((element: any) => {
      if (element.checked) {
        console.log('checked', element.AC_title);
        this.roleAccess.push(element.AC_id);
      }
    });
    this.roleForm.controls['roleAccess'].setValue(this.roleAccess);
    console.log('this.roleForm.value', this.roleForm.value);
    if (this.roleForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    if (this.title == 'Edit') {
      console.log('Role Edit', this.editId);
      this.updateRole();
    }
    else {
      this.addRole();
    }
  }
}
