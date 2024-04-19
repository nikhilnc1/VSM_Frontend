import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { Constants } from 'src/app/config/constants';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  logoSrc=Constants.IMG_API_BASE;
  ModelList:any;
  p:number=1;
  term: string;
  queryParam:any;
  brandID = 0;
  constructor(private dataTransferService:DataTransferService,
    private toastr:ToastrService,
    private domSanitizer: DomSanitizer,
    private router:Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.queryParam = this.activeRoute.snapshot.queryParams.brandId;
    console.log('model-list queryParam',this.queryParam);
    if(this.queryParam){
      this.brandID = this.queryParam;
    }
    this.getAllModel(this.brandID);

  }

  getAllModel(brandID:number){
    this.dataTransferService.getAllModel(brandID).subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.ModelList = res.obj;
      }
      else if (res.logout){
        this.toastr.info('Token expired plese try login again.');
        this.router.navigate(['/login']);
      }
    })
}
   
} 
