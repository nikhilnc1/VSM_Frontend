import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { Constants } from 'src/app/config/constants';
@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  logoSrc=Constants.IMG_API_BASE;
  brandList:any;
  p:number=1;
  term: string;
  constructor(private dataTransferService:DataTransferService,
              private toastr:ToastrService,
              private domSanitizer: DomSanitizer,
              private router:Router) { }

  ngOnInit(): void {
    this.getAllAnswers();
  }
  
  getAllAnswers(){
    this.dataTransferService.getAllBrands().subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.brandList = res.obj;
       // this.logoSrc = res.imgSrc;
        /* this.brandList.forEach((element:any) => { // to sanitize the image URL
          element.BR_logo = this.domSanitizer.bypassSecurityTrustUrl(element.BR_logo); 
        }); */
        
      }/* else if(res.status==403){
        this.toastr.info('Token expired plese try login again.');
        this.router.navigate(['/login']);
      } */
      else if (res.logout){
        this.toastr.info('Token expired plese try login again.');
        this.router.navigate(['/login']);
      }
    })
  }
}
