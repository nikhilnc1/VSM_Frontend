import { Component, OnInit ,ViewChild , ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { FileValidator } from 'src/app/shared/validators/fileValidator.validator';
import { Constants } from 'src/app/config/constants';
@Component({
  selector: 'app-add-edit-brand',
  templateUrl: './add-edit-brand.component.html',
  styleUrls: ['./add-edit-brand.component.scss']
})
export class AddEditBrandComponent implements OnInit {
  brandForm: FormGroup;
  submitted = false;
  queryParam: any = 0;
  title = 'Add New';
  isReadonly = false;
  imgSrc: any = '';
  logoSrc = Constants.IMG_API_BASE;
  @ViewChild('fileInput') el:ElementRef;
  constructor(private formBuilder: FormBuilder,
    private dataTransferService: DataTransferService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    this.brandForm = this.formBuilder.group({
      AN_title: ['', [Validators.required]],
      AN_description: ['', [Validators.required]],
      //BR_logo: ['', [Validators.required]],
      AN_recordLink: ['', [Validators.required]]
    });
  }
  get f() {
    return this.brandForm.controls;
  }

  ngOnInit(): void {
    this.queryParam = this.activeRoute.snapshot.queryParams.id;
    console.log('this.queryParam', this.queryParam);
    if (this.queryParam != (undefined || null)) {
      if (this.activeRoute.snapshot.queryParams.view) {
        this.title = "View";
        this.isReadonly = true;
      }
      else {
        this.title = 'Edit';
      }
      this.getBrandByID(this.queryParam);
    }
  }
  fileName: any;
  fileType: any;
  onFileSelect(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    this.fileName = file.name;
    this.fileType = file.type;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.brandForm.patchValue({ BR_logo: reader.result });
      this.imgSrc = reader.result;
    }
    if (this.fileType === '') {
      this.fileType = (this.fileName.replace(/^.*[\\\/]/, "")).split(".")[1].toUpperCase();
    }

    console.log(file, event.target, this.fileName, this.fileType);

    this.brandForm.controls['BR_logo'].setValidators([
      Validators.required,
      FileValidator.fileTypeValidator(["jpg", "png", "pdf", "jpeg"])
    ]);

    this.brandForm.controls['BR_logo'].updateValueAndValidity();
  }

  triggerUpload () {    
    var fileuploader:any = this.el.nativeElement;
    fileuploader.click('click');
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imgSrc = reader.result;
        this.brandForm.patchValue({
          BR_logo: file
        });
      }
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.brandForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    console.log('this.brandForm.value', this.brandForm.value)
    const formData = new FormData();
    formData.append('AN_title', this.brandForm.value.AN_title);
    formData.append('AN_description', this.brandForm.value.AN_description);
    formData.append('AN_recordLink', this.brandForm.value.AN_recordLink);
    //formData.append('file', this.brandForm.get('BR_logo')?.value);
    formData.append('AN_id', this.queryParam);
    if (this.queryParam) { //if queryParam then call Update API
      this.dataTransferService.updateBrand(formData).subscribe((res: any) => {
        console.log('updateBrand', res);
        if (res.status == 200) {
          this.toastr.success('', res.message);
          this.router.navigate([`/masters/brand-list`]);
        } else {
          this.toastr.error("", "Something Went Wrong");
        }
      })
    } else {
      this.dataTransferService.addBrand(formData).subscribe((res: any) => {
        console.log('addBrand', res);
        if (res.status == 200) {
          this.toastr.success('', 'Brand Saved.');
          this.router.navigate([`/masters/brand-list`]);
          this.onReset();
        } else {
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }


  }
  onReset() {
    this.submitted = false;
    this.brandForm.reset();
  }
  getBrandByID(id: any) {
    var postData = { findby: 'id', value: id }
    this.dataTransferService.getBrandByID(postData).subscribe((res: any) => {
      console.log('getBrandByID', res);
      if (res.status == 200) {
        this.populateFormValues(res.obj[0]);
      }
    })
  }
  populateFormValues(object: any) {
    console.log('populateFormValues', object);
    this.brandForm.patchValue({
      AN_title: object.AN_title,
      AN_description: object.AN_description,
      //BR_logo: object.BR_logo,
      AN_recordLink: object.AN_recordLink,
    });
    //this.imgSrc = this.logoSrc + object.BR_logo;
  }
}
