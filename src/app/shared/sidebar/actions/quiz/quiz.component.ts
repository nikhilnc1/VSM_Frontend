import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizForm: FormGroup;
  quizOptionsFrom: FormGroup;
  quizList: any;
  p: number = 1;
  addMedia = false;
  showForm = false;
  queryParam: any;
  term: string;
  submitted = false;
  title = 'Add New';
  isReadonly = false;
  quizOptions: any[] = [];
  quizOption: any[] = [];
  quizOption1:any[] = [];
  constructor(private formBuilder: FormBuilder,
    private dataTransferService: DataTransferService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllquiz();
  }

  initForm() {
    this.quizForm = this.formBuilder.group({
      QU_id: [''],
      QU_title: [''],
      QU_description: [''],
      QU_quizTypeId: [''],
      quiz_options: [
        {
          QUO_data: [''],
          QUO_id: [''],
          QUO_title: ['']
        }
      ]

      // "updateKey1":  "DE_title",
      // "updateKey2" : "DE_description",
      // "updateKey3": "DE_industryId",
      // "updateValue1": DE_title:[''],
      // "updateValue2": DE_description:[''],
      // "updateValue3" : DE_industryId:[''],
    })
  }
  onSubmit() {
    this.submitted = true;
    console.log('this.quizForm.value', this.quizForm.value);
    if (this.quizForm.invalid) {
      this.toastr.info('', 'Please fill all required fields');
      return;
    }
    if (this.title == 'Edit') {
      console.log("Edit quiz", this.editId)
      this.quizForm.value.QU_id = this.editId;
      this.dataTransferService.updateEthinicity(this.quizForm.value).subscribe((res: any) => {
        console.log('Edit quiz ', res);
        if (res.statusCode == 200) {
          this.toastr.success('Updated Successfully', res.message);
          this.showForm = false; //hide form
          this.getAllquiz();
        } else {
          this.toastr.error("", res.message);
        }
      })
    }
    else {
      this.dataTransferService.addpages(this.quizForm.value).subscribe((res: any) => {
        console.log('addquiz', res);
        if (res.statusCode == 200) {
          this.toastr.success('', 'New quiz Saved.');
          this.getAllquiz();
        } else {
          this.toastr.error("", "Something Went Wrong");
        }
      })
    }
  }
  onReset() {
    this.submitted = false;
    this.quizForm.reset();
  }

  getAllquiz() {
    this.dataTransferService.getquiz().subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.quizList = res.data;

        // console.log(this.quizList);
        // this.quizOptions = this.quizList[0].quiz_Options;
        // console.log(this.quizOptions);
      }
    })
  }
  editId: any;
  selectedrecord: any;
  editRecord(record: any, title: string) {
    this.isReadonly = false;
    //window.scrollTo(0, 0);
    this.title = title;
    if (this.title == 'View') {
      this.isReadonly = true;
    }
    this.editId = record.QU_id;
    this.quizOption1 = record.quiz_options;
    this.onReset();
    this.showForm = true;
    this.selectedrecord = record;
    console.warn(this.selectedrecord, 'selectedrecord');
    this.quizForm.patchValue(record);
  }
  addRecord() {
    this.isReadonly = false;
    this.title = 'Add New';
    this.onReset();
    this.showForm = true;
  }



}
