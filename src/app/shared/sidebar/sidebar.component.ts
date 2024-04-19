import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../services/data-transfer.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userRole: number = 0;
  accessLinks: any = [];
  actionLinks : any = [];
  adminLinks : any = [];
  constructor(
    private dataTransferService: DataTransferService,
    private router : Router
  ) {
    this.userRole = Number(localStorage.getItem("roleId"));
  }

  ngOnInit(): void {
    // this.getRoleAcccess();
  }

   logout() {
    console.log('Destory')
    localStorage.clear();
    this.router.navigate([`/login1`]);    
  }

  getRoleAcccess() {
    this.dataTransferService.getAccessLinksForRole(this.userRole).subscribe((res: any) => {
      console.log('getAccessLinksForRole',res);
      if (res.status == 200) {
        res.data.forEach((element:any) => {
          if(element.AC_urlSlug.startsWith("/actions")){
            this.actionLinks.push(element);
          }else if(element.AC_urlSlug.startsWith("/admins")){
            this.adminLinks.push(element);
          }else{
            this.accessLinks.push(element);
          }
        });
      }
    })
  }
}
 