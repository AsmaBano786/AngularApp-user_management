import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserMainComponent } from './components/user-main/user-main.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';



@NgModule({
  declarations: [
    
    CreateUserComponent,
    UserListComponent,
    UserMainComponent,
    PdfViewerComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxIntlTelInputModule
  ]
})
export class UserModule { }
