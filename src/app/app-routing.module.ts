import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/user-management/components/user-list/user-list.component';
const routes: Routes = [
  {path:'',component:UserListComponent},


  {
    path: '',
    loadChildren: () => import('./features/user-management/user.module').then((m) => m.UserModule)  
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
