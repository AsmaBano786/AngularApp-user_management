import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserMainComponent } from './components/user-main/user-main.component';

const routes: Routes = [
  {
    path: '', 
    component: UserMainComponent,
    children: [
      { path: 'create-user', component: CreateUserComponent },
       {path: 'user-list', component: UserListComponent },
       { path: 'edit-user/:id', component: CreateUserComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
