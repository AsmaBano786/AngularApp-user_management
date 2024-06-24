import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userList: any;
  userId: any;
  display: string = 'none';
  modalNumber: any;

  constructor(private userService:UserService,
    private ngxService: NgxUiLoaderService,
    private _sharedService: SharedService,
    private _router : Router) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    this.ngxService.start();
    this.userService.getUserListApi().subscribe((res:any)=>{
      console.log("Res",res);
      this.ngxService.stop();
      this.userList = res;
      
    },(err:any)=>{
      console.log("Err",err);
      this.ngxService.stop();
    })
  }
 async downloadPdf(userid:any){
    this.ngxService.start();
  await  this.userService.downloadPdf(userid);
  this._sharedService.ToastPopup('', 'Pdf downloaded successfully', 'success');

    this.ngxService.stop();

  }

  generatePdf(userid:any){
    this.ngxService.start();
    this.userService.generatePdfApi(userid).subscribe((res:any)=>{
      this.ngxService.stop();
      this._sharedService.ToastPopup('', res.message, 'success');
      
    },(err:any)=>{
      console.log("Err",err);
      this.ngxService.stop();
    })
  
  }
  editUser(data:any){
    this._router.navigate(['/edit-user/' + data.id])
  }

  openDeleteModal(data:any){
    this.modalNumber = 2;
    this.display = 'block'
    this.userId = data;
  }

  

  deleteUser(){
   

    this.ngxService.start();


    this.userService.deleteUserListApi(this.userId).subscribe((res:any)=>{
      console.log("Res",res);
      this.ngxService.stop();
      this.userList = res;
      this.display = 'none';
      this._sharedService.ToastPopup(res.message,'','success');
      this.getUserList();
    },(err)=>{
      console.log("Err",err);
      this._sharedService.ToastPopup(err.error['message'],'','error');
      this.ngxService.stop();
    })
  }

  closeModal() {
    this.display = 'none';
  }
}
