import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

import { log } from 'console';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm!: FormGroup 
  roles: any;
  user_id: any | null;
  userData: any;
  passwordValidators: any;
  designationsData: any;
 
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private _sharedService: SharedService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
console.log("hi");

    this._route.paramMap.subscribe(params => {
      this.user_id = params.get('id');
    });

    if (this.user_id) {
      this.getUserById();
    }

    this.createUserForm();
  }



  createUserForm() {
    this.userForm = this.formBuilder.group({
      user_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      phone_number: ['', [Validators.required, Validators.pattern("^[+0-9]*$"), Validators.minLength(10), Validators.maxLength(15)]],
      address: ['', [Validators.required,Validators.minLength(5)]],
    })
  }

  // Function to get the form control by name
  getcontrol(name: any): AbstractControl | null {
    return this.userForm.get(name);
  }

  getUserById() {

    let body = {
      "userId": this.user_id
    }

    this.ngxService.start();
    this.userService.getUserByIdApi(body).subscribe((res: any) => {
      console.log("res", res.data);
      this.ngxService.stop();
      this.userData = res.data[0];
      this.userForm.patchValue({
        user_name : this.userData.username,
        email : this.userData.userEmail,
        role_id : this.userData.roleId,
        designation_id : this.userData.designationId
      });

    },(err)=>{
      console.log("Err",err);
      this.ngxService.stop();
    })
  }

  submit() {
    console.log(this.userForm.value);

    console.log("this.user_id",this.user_id);

    if(this.user_id) {
      let body = {
        "userId" : this.user_id,
        "Name": this.userForm.value.user_name,
        "Username": this.userForm.value.user_name,
        "Email": this.userForm.value.email,
        "designationId": this.userForm.value.designation_id,
        "roleId": this.userForm.value.role_id,
      }
      console.log("Update")
      this.ngxService.start();
      this.userService.updateUserApi(body).subscribe((res: any) => {
        console.log("Res", res);
        this.ngxService.stop();
  
        this._sharedService.ToastPopup('', res.message, 'success');
        this._router.navigate(['/mail-list']);
      }, (err) => {
        console.log("Err", err)
        this.ngxService.stop();
      })
    }
    else {
      let body = {
        "Name": this.userForm.value.user_name,
        "Username": this.userForm.value.user_name,
        "Email": this.userForm.value.email,
        "Password": this.userForm.value.password,
        "designationId": 1,
        "roleId": this.userForm.value.role_id,
      }
      console.log("Create")
      this.ngxService.start();
      this.userService.createUserApi(body).subscribe((res: any) => {
        console.log("Res", res);
        this.ngxService.stop();
  
        this._sharedService.ToastPopup('', res.message, 'success');
        this._router.navigate(['/user-list']);
      }, (err) => {
        console.log("Err", err)
        this.ngxService.stop();
      })
    }
  }
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
