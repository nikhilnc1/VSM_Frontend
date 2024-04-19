import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  soundList:any;
  p: number = 1;
  music: string;
  term: string;
  showForm = false;
  collectionForm: FormGroup;
  submitted = false;
  isReadonly = false;
  title = 'View';
  collectionList: any;
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
  baseurl: any = 'https://voxpod.s3.eu-west-2.amazonaws.com/';

  constructor(private formBuilder: FormBuilder,
    private dataTransferService : DataTransferService,
    private toastr:ToastrService,
    private router:Router,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllCollections();
    this.getAllSoundBite();
   
}
  initForm(){
    this.collectionForm = this.formBuilder.group({
        PL_id:[''],
        PL_description: [''],
        PL_title:[''],
        PL_createdAt: [''],
        PL_createdBy: [''],
        PL_dp: [''],
        PL_isActive: [''],
        PL_updatedAt: [''],
        AN_soundbite:[''],
        // PL_tagtitle:[''],
        // routeCategory: new FormControl(null, [Validators.required]),

        soundBite: [{
          PL_soundBiteId:['']
        }],
        tags: [
          {
          PL_tagId:[''],
          PL_tagTitle:['']
          },
          {
            PL_tagId:[''],
            PL_tagTitle:['']
          }
        ]
    })
  }
  get f() {
    return this.collectionForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log('form values', this.collectionForm.value);
    if (this.collectionForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    // if (this.title == 'Delete') {
    //   this.collectionForm.value.PL_id = this.editId;
    //   this.dataTransferService.deletecollection(this.collectionForm.value).subscribe((res: any) => {
    //     console.log('Delete data', res);
    //     if (res.statusCode == 200) {
    //       this.toastr.success('', res.message);
    //       this.showForm = false;
    //       // this.getAllSoundBite();
    //       this.getAllCollections();
    //     } else {
    //       this.toastr.error("", res.message);
    //     }
    //   })
    // }
    if (this.title == 'Edit') {
      this.collectionForm.value.PL_id = this.editId;
      this.collectionForm.value.tags[0].PL_tagTitle= this.tags;
      this.dataTransferService.allupdateplayList(this.collectionForm.value).subscribe((res: any) => {
        console.log('Edit RTO', res);
        if (res.status == 200) {
          this.toastr.success('', res.message);
          this.showForm = false;
          // this.getAllSoundBite();
          this.getAllCollections();
        } else {
          this.toastr.error("", res.message);
        }
      })
    } else {
      this.dataTransferService.addcollection(this.collectionForm.value).subscribe((res: any) => {
        console.log('addCollection', res);
        if (res.statusCode == 200) {
          this.toastr.success('', 'Collection Saved.');
          this.onReset();
          this.showForm = false;
        }
          // this.getAllSoundBite();
          else {
          this.toastr.error("", "Something Went Wrong");
        }
        
      })
    }

  }

  // selected(event: any) {

  //   this.filtervalue = event.target.value;
  //   console.log("filtervalue", this.filtervalue);
  //   this.soundList = [...this.tempSoundList];
  //   if (this.filtervalue != "All")
  //     this.soundList = this.soundList.filter(obj => obj.AN_status == this.filtervalue);

  // }
  getvalue(value: any) {
    this.Tagtitle = value;
    console.log(value, 'text tags');
  }
  // onFileSelected(event: any) {
  //   this.fileName = event.target.files[0];
  //   console.log('file data', this.fileName);
  //   this.selectsoundurl = this.fileName.value;

  // }
  onimageSelected(event: any) {
    this.imageName = event.target.files[0];
    console.log('image data', this.imageName);
    this.imagedp = this.imageName.value;
  }
  getuploadlink(record: any) {
    console.log("Record :", record);
    // console.log(this.soundForm.value.AN_recordLink, "response");
    // console.log(this.fileName, 'file');
    this.dataTransferService.uploadurl(this.imageName).subscribe((res: any) => {
      console.log('Url Record', res);
      if (!res.error) {
        this.toastr.success('', res.message);
        this.showForm = true;
        this.collectionForm.patchValue(record);
        this.getAllCollections();
      } else {
        this.toastr.error("", res.message);
      }

    })
    let postData = {AN_id:record.AN_id,AN_url2:record.AN_recordLink,AN_recordLink:this.baseurl+this.fileName.name}
    this.collectionForm.value.PL_dp = this.baseurl+this.imageName.name;
    this.dataTransferService.updateAllplayList(this.collectionForm.value.PL_dp).subscribe((res: any) => {
      console.log('Url Record', res);
      if (!res.error) {
        this.toastr.success('update dp succesfully', res.message);
        this.showForm = true;
        this.getAllCollections();

      } else {
        this.toastr.error("", res.message);
      }
    })

  }
  getAllCollections() {
    this.dataTransferService.getCollection().subscribe((res: any) => {
      console.log("collections record",res);
      if (res.status == 200) {
        this.collectionList = res.result;
        console.log('Sound', this.collectionList);
      }
    })
  }
  getAllSoundBite() {
    this.dataTransferService.getSoundBite().subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        this.soundList = res.Answers;
        this.soundList.sort((a:any,b:any) => a.AN_title-b.AN_title);
        console.log('Sound', this.soundList);
      }
    })
  }
 
 
  Delete(record:any,title:string) {
    console.log(record,title,"record");
    this.collectionForm.value.PL_id=record.PL_id;
    // this.collectionForm.value.PL_id = this.editId;
    let postData = {PL_id:this.collectionForm.value.PL_id};
    this.dataTransferService.deletecollection(this.collectionForm.value.PL_id).subscribe((res: any) => {
      console.log('Delete data', res);
      if (res.statusCode == 200) {
        this.toastr.success('Record deleted successfully', res.message);
        this.showForm = false;
        this.router.navigate([`/collections`]);
        // this.getAllSoundBite();
        this.getAllCollections();
      } else {
        this.toastr.error("", res.message);
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
  
  // ID: any;
  // updateStatus(record: any, val: any) {
  //   this.AN_status1 = val;
  //   this.collectionForm.value.AN_status = this.AN_status1;
  //   this.ID = record.AN_id;
  //   this.collectionForm.value.AN_id = this.ID;
  //   // this.soundForm.value.ANT_tagTitle = this.Tagtitle;
  //   console.log(this.collectionForm.value.AN_status, "updated Status");
  //   this.dataTransferService.updateStatus(this.collectionForm.value).subscribe((res: any) => {
  //     console.log('Url Record', res);
  //     if (!res.error) {
  //       this.toastr.success('Status Save succesfully', res.message);
  //       this.showForm = true;
  //       this.getAllSoundBite();
  //     } else {
  //       this.toastr.error("", res.message);
  //     }
  //   })
  // }
  // updateAllData(record: any) {
  //   this.collectionForm.value.sound_bites_tags[0].ANT_tagtitle = this.Tagtitle;
  //   console.log(this.collectionForm.value, "updated Status");
  //   this.dataTransferService.updateAllData(this.collectionForm.value).subscribe((res: any) => {
  //     console.log('Url Record', res);
  //     if (!res.error) {
  //       this.toastr.success('Save data succesfully', res.message);
  //       this.showForm = true;
  //       // this.getAllSoundBite();

  //     } else {
  //       this.toastr.error("", res.message);
  //     }
  //   })
  // }
  // getuploadlink(record: any) {
  //   console.log("Record :", record);
  //   this.collectionForm.value.AN_url2 = record.AN_recordLink;
  //   this.collectionForm.value.AN_recordLink = this.fileName.name;
  //   console.log(this.collectionForm.value.AN_recordLink, "response");
  //   console.log(this.fileName, 'file');
  //   this.dataTransferService.uploadurl(this.fileName).subscribe((res: any) => {
  //     console.log('Url Record', res);
  //     if (!res.error) {
  //       this.toastr.success('', res.message);
  //       this.showForm = true;
  //       this.collectionForm.patchValue(record);
  //       this.getAllSoundBite();
  //     } else {
  //       this.toastr.error("", res.message);
  //     }

  //   })
  //   this.dataTransferService.updateAllData(this.collectionForm.value).subscribe((res: any) => {
  //     console.log('Url Record', res);
  //     if (!res.error) {
  //       this.toastr.success('Save data succesfully', res.message);
  //       this.showForm = true;
  //       this.getAllSoundBite();

  //     } else {
  //       this.toastr.error("", res.message);
  //     }
  //   })

  // }
  // getuploadDp(record: any) {
  //   console.log("Record :", record);
  //   console.log(this.imageName, 'file');
  //   this.dataTransferService.uploadurl(this.imageName).subscribe((res: any) => {
  //     console.log('Url Record', res);
  //     if (!res.error) {
  //       this.toastr.success('', res.message);
  //       this.showForm = true;
  //       this.collectionForm.patchValue(record);
  //       this.getAllSoundBite();
  //     } else {
  //       this.toastr.error("", res.message);
  //     }
  //   })
  //   this.imagedp = this.imageName.name;
  //   this.collectionForm.value.AN_dp = this.baseurl + this.imagedp;
  //   this.dataTransferService.updateAllData(this.collectionForm.value).subscribe((res: any) => {
  //     console.log('Url Record', res);
  //     if (!res.error) {
  //       this.toastr.success('Save data succesfully', res.message);
  //       this.showForm = true;
  //       this.getAllSoundBite();

  //     } else {
  //       this.toastr.error("", res.message);
  //     }
  //   })
  // }


  editId: any;
  tags:any;
  playtitle:any;
  playdiscription:any;
  editRecord(record: any, title: string) {
    this.title = title;
    this.isReadonly = false;
    this.selectedRecord = record;
    this.imagedp=this.baseurl+record.PL_dp;
    this.tags=record.tags[0].PL_tagTitle;
    this.playtitle=record.PL_title;
    this.playdiscription=record.PL_description;
    console.log(this.selectedRecord, 'Collection record');
    if (this.title == 'View') {
      this.isReadonly = true;
    }
    this.editId = record.PL_id;
    this.onReset();
    this.showForm = true;
    this.collectionForm.patchValue(record);
  }

  onReset() {
    this.submitted = false;
    this.collectionForm.reset();
  }
  addRecord(){
    this.isReadonly=false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }

}
