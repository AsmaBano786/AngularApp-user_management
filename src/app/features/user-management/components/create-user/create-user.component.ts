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


    this.ngxService.start();
    this.userService.getUserByIdApi(this.user_id).subscribe((res: any) => {
      console.log("res", res);
      this.ngxService.stop();
      this.userData = res;
      this.userForm.patchValue({
        user_name : this.userData.name,
        email : this.userData.email,
        phone_number : this.userData.phoneNumber,
        address : this.userData.address
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
        "name": this.userForm.value.user_name,
        "email": this.userForm.value.email,
        "phoneNumber": this.userForm.value.phone_number,
        "address": this.userForm.value.address,
      }
      console.log("Update")

      this.ngxService.start();
      this.userService.updateUserApi(this.user_id,body).subscribe((res: any) => {
        console.log("Res", res);
        this.ngxService.stop();
  
        this._sharedService.ToastPopup('', res.message, 'success');
        this._router.navigate(['/user-list']);
      }, (err) => {
        console.log("Err", err)
        this.ngxService.stop();
      })
    }
    else {
      let body = {
        "name": this.userForm.value.user_name,
        "email": this.userForm.value.email,
        "phoneNumber": this.userForm.value.phone_number,
        "address": this.userForm.value.address,
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
