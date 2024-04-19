import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
getList() {
throw new Error('Method not implemented.');
}
  count:any=[];
  constructor(private dataTransferService:DataTransferService) { }

  ngOnInit(): void {
    // this.getAllCount();
     
  }

  getAllCount() {
     this.dataTransferService.getAllCount().subscribe((res:any)=>{
        console.log( res,'result')
        this.count=res.obj[0];
     })
  }
}
