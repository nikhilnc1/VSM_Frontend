import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';

import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  CarList:any;
  p:number=1;
  term: string;
  queryParam:number;
  modelId:number=0;
  constructor(private dataTransferService:DataTransferService,
    private toastr:ToastrService,
    private domSanitizer: DomSanitizer,
    private router:Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.queryParam = this.activeRoute.snapshot.queryParams.modelId;
    console.log('car-list queryParam',this.queryParam);
    if(this.queryParam!=(undefined||null)){
      this.modelId = this.queryParam;
    }
    this.getAllCar(this.modelId);
  }

  getAllCar(modelId : number){
    this.dataTransferService.getAllCar(modelId).subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.CarList = res.obj;
      }
      else{(res.logout)('Token expired plese try login again.');
      this.router.navigate(['/login']);}
    })
  }
  saveToLocalStorage(element:any){
    localStorage.setItem('editRecord',JSON.stringify(element));
  }

}
