import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-soundbite',
  templateUrl: './soundbite.component.html',
  styleUrls: ['./soundbite.component.scss']
})
export class SoundbiteComponent implements OnInit {
  showhide:boolean=false;
  soundList: any[] = [];
  tempSoundList: any[] = [];
  logoSrc = Constants.IMG_API_BASE;
  p: number = 1;
  term: string;
  showForm = false;
  soundForm: FormGroup;
  submitted = false;
  isReadonly = false;
  title = 'View';
  DegreeList: any;
  industryList: any;
  TagList: any;
  selectsoundurl: any;
  imagedp: any;
  degreename: any;
  objname: any;
  fileName: any;
  selectedRecord: any;
  Tagtitle: any;
  imageName: any;
  AN_status1: any;
  filtervalue: any;
  reason:any;
  selectedvalue:any;
  baseurl: any = 'https://voxpod.s3.eu-west-2.amazonaws.com/';
  constructor(private formBuilder: FormBuilder,
    private dataTransferService: DataTransferService,
    private toastr: ToastrService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private formModule: FormsModule,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getAllSoundBite();
    this.initForm();
    this.getindustry();
    // this.getalltags();
    this.getalldegree();
  }

  initForm() {
    this.soundForm = this.formBuilder.group({
      AN_title: ['', [Validators.required]],
      AN_date: [''],
      AN_status: [''],
      AN_recordLink: [''],
      U_name: [''],
      U_updatedAt: [''],
      AN_updatedAt: [''],
      AN_createdBy: [''],
      AN_degreeId: [''],
      AN_description: [''],
      AN_dp: [''],
      AN_id: [''],
      AN_industryId: [''],
      AN_isPublished: [''],
      AN_keyIdeas: [''],
      AN_questionId: [''],
      AN_scheduleTime: [''],
      AN_updatedBy: [''],
      DE_title: [''],
      AN_url2: [''],
      AN_Reject_Reason:[''],
      //  ANT_tagtitle: [''],
      sound_bites_links:
        [
          {
            AL_answersId: [''],
            AL_title: [''],
            AL_url: ['']
          },
          {
            AL_answersId: [''],
            AL_title: [''],
            AL_url: ['']
          }
        ],
      sound_bites_tags:
        [
          {
            ANT_id: [''],
            ANT_tagId: [''],
            ANT_tagtitle: [''],
          },
          {
            ANT_id: [''],
            ANT_tagId: [''],
            ANT_tagtitle: [''],
          }
        ]
    })
  }

  get f() {
    return this.soundForm.controls;
  }
  // abc:any;
  getval(item:any){
    // console.log(item,"textbox value");
    this.selectedvalue=item;
    console.log(this.selectedvalue,"textbox value");

  }
  radiovalue(event:any){
    this.selectedvalue=event.target.value;
    console.log(this.selectedvalue,"option value");  
    if(this.selectedvalue=="on")
    {
      this.getval;
    }
    
    // console.log(this.abc,"textbox value");
  }
  updatedReason(){
    this.soundForm.value.AN_Reject_Reason=this.selectedvalue;
    this.soundForm.value.AN_id=this.ID;
    this.dataTransferService.updatereason( this.soundForm.value).subscribe((res: any) => {
      console.log('updated reason', res);
      if (res.statusCode == 200) {
        this.toastr.success('updated Reason successfully', res.message);
        this.showForm = false;
        this.getAllSoundBite();
      } else {
        this.toastr.error("", res.message);
      }
    })
  }
  showbox(){
    // this.showhide=true;
    this.showhide=true;
  }
  onSubmit() {
    this.submitted = true;
    console.log('form values', this.soundForm.value);
    if (this.soundForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }

    if (this.title == 'Edit') {
      this.soundForm.value.AN_id = this.editId;
      this.dataTransferService.updateStaterto(this.soundForm.value).subscribe((res: any) => {
        console.log('Edit RTO', res);
        if (res.status == 200) {
          this.toastr.success('', res.message);
          this.showForm = false;
          this.getAllSoundBite();
          this.getalldegree();
        } else {
          this.toastr.error("", res.message);
        }
      })
    } else {
      this.dataTransferService.addStaterto(this.soundForm.value).subscribe((res: any) => {
        console.log('addRTO', res);
        if (res.status == 200) {
          this.toastr.success('', 'RTO Saved.');
          this.onReset();
          this.showForm = false;
          this.getAllSoundBite();
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }
  }

  selected(event: any) {

    this.filtervalue = event.target.value;
    console.log("filtervalue", this.filtervalue);
    this.soundList = [...this.tempSoundList];
    if (this.filtervalue != "All")
      this.soundList = this.soundList.filter(obj => obj.AN_status == this.filtervalue);

  }
  getvalue(value: any) {
    this.Tagtitle = value;
    console.log(value, 'text tags');
  }
  onFileSelected(event: any) {
    this.fileName = event.target.files[0];
    console.log('file data', this.fileName);
    this.selectsoundurl = this.fileName.value;

  }
  onimageSelected(event: any) {
    this.imageName = event.target.files[0];
    console.log('image data', this.imageName);
    this.imagedp = this.imageName.value;
  }
  getAllSoundBite() {
    this.dataTransferService.getSoundBite().subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        this.soundList = res.Answers;
        this.tempSoundList = [...this.soundList];
        console.log('Sound', this.soundList);
      }
    })
  }
  getdegree() {
    this.dataTransferService.getdegree().subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.DegreeList = res.data;
      }
    })
  }
  getindustry() {
    this.dataTransferService.getindustry().subscribe((res: any) => {
      console.log(res, "industry list");
      if (res.statusCode == 200) {
        this.industryList = res.data;
        console.log(this.industryList, 'industrylist');
      }

    })
  }
  getalltags() {
    this.dataTransferService.gettags().subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        this.TagList = res.data;
      }

    })
  }
  // getalltag(ID:any){
  //   this.dataTransferService.gettagtitle(ID).subscribe((res:any)=>{
  //     console.log(res,"response");
  //     if(res.statusCode==200){
  //       this.Tagtitle = res.data[0];
  //       }
  //      console.log(this.Tagtitle,"tagtitle");
  //   })
  // }
  getalldegree() {
    this.dataTransferService.getdegree().subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.DegreeList = res.data;
      }
    })
  }
  ID: any;
  updateStatus(record: any, val: any) {
    this.AN_status1 = val.toString();
    this.soundForm.value.AN_status = this.AN_status1;
    this.ID = record.AN_id;
    this.soundForm.value.AN_id = this.ID;
    // this.soundForm.value.ANT_tagTitle = this.Tagtitle;
    console.log(this.soundForm.value.AN_status, "updated Status");
    this.dataTransferService.updateStatus(this.soundForm.value).subscribe((res: any) => {
      console.log('Url Record', res);
      if (res.statusCode==200) {
        this.toastr.success('Status Save succesfully', res.message);
        this.showForm = true;
        this.getAllSoundBite();
        this.router.navigate([`/actions/soundbite`]);
      } else {
        this.toastr.error("", res.message);
      }
    })
  }
  updateAllData(record: any) {
    this.soundForm.value.AN_id = record.AN_id;
    this.soundForm.value.sound_bites_tags[0].ANT_tagtitle = this.Tagtitle;
    console.log(this.soundForm.value, "updated Status");
    let postData = {AN_id:record.AN_id,ANT_tagtitle:this.Tagtitle}
    this.dataTransferService.updateAllData(postData).subscribe((res: any) => {
      console.log('Url Record', res);
      if (!res.error) {

        this.toastr.success('Save data succesfully', res.message);
        this.showForm = true;
        this.getAllSoundBite();

      } else {
        this.toastr.error("", res.message);
      }
    })
  }
  getuploadlink(record: any) {
    console.log("Record :", record);
    // console.log(this.soundForm.value.AN_recordLink, "response");
    // console.log(this.fileName, 'file');
    this.dataTransferService.uploadurl(this.fileName).subscribe((res: any) => {
      console.log('Url Record', res);
      if (!res.error) {
        this.toastr.success('', res.message);
        this.showForm = true;
        this.soundForm.patchValue(record);
        this.getAllSoundBite();
      } else {
        this.toastr.error("", res.message);
      }

    })
    this.soundForm.value.AN_id = record.AN_id;
    this.soundForm.value.AN_url2 = record.AN_recordLink;
    this.soundForm.value.AN_recordLink = this.baseurl+this.fileName.name;
    let postData = {AN_id:record.AN_id,AN_url2:record.AN_recordLink,AN_recordLink:this.baseurl+this.fileName.name}
    this.dataTransferService.updateAll(postData).subscribe((res: any) => {
      console.log('update Record', res);
      if (!res.error) {
        this.toastr.success('Save data succesfully', res.message);
        this.showForm = true;
        this.getAllSoundBite();

      } else {
        this.toastr.error("", res.message);
      }
    })

  }
  getuploadDp(record: any) {
    console.log("Record :", record);
    // this.imagedp = this.imageName.name;
    // this.soundForm.value.AN_dp = this.baseurl + this.imagedp;
    console.log(this.imageName, 'file');
    this.dataTransferService.uploadurl(this.imageName).subscribe((res: any) => {
      console.log('Url Record', res);
      if (!res.error) {
        this.toastr.success('upload file successfully', res.message);
        this.showForm = true;
        this.soundForm.patchValue(record);
        this.getAllSoundBite();
      } else {
        this.toastr.error("", res.message);
      }
    })
    this.soundForm.value.AN_id=record.AN_id;
    this.imagedp = this.imageName.name;
    this.soundForm.value.AN_dp = this.baseurl+this.imagedp;
    let postData = {AN_id:record.AN_id,AN_dp:this.baseurl+this.imagedp}
    this.dataTransferService.updateAll(postData).subscribe((res: any) => {
      console.log('Url Record', res);
      if (!res.error) {
        this.toastr.success('Save data succesfully', res.message);
        this.showForm = true;
        this.getAllSoundBite();

      } else {
        this.toastr.error("", res.message);
      }
    })
  }


  editId: any;
  editRecord(record: any, title: string) {
    this.isReadonly = false;
    this.title = title;
    this.selectsoundurl = record.AN_recordLink;
    this.imagedp = record.AN_dp;
    this.degreename = record.DE_title;
    this.objname = record.AN_id;
    this.selectedRecord = record;
    this.Tagtitle = record.sound_bites_tags[0].ANT_tagtitle;
  
    console.log(this.imagedp, "imagedp");
    console.log(record, 'soundbite record');
    if (this.title == 'View') {
      this.isReadonly = true;
    }
    this.editId = record.AN_id;
    this.onReset();
    this.showForm = true;
    this.soundForm.patchValue(record);
  }

  onReset() {
    this.submitted = false;
    this.soundForm.reset();
  }

}
