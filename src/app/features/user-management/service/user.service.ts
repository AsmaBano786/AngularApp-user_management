import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpointsService } from 'src/app/core/services/api-endpoints.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();
  constructor( public _http: HttpClient,
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    private shared:SharedService) { }



  createUserApi(body : any){
    return this._apiHttpService.post(this._apiEndpointsService.createUserEndpoint(),body)
  }

  updateUserApi(body : any){
    return this._apiHttpService.post(this._apiEndpointsService.updateUserEndpoint(),body)
  }

  getUserListApi(){
    return this._apiHttpService.get(this._apiEndpointsService.getUserListEndpoint())
  }
  


  getUserByIdApi(body:any){
    return this._apiHttpService.post(this._apiEndpointsService.getUserByIdEndpoint(),body)
  }

  deleteUserListApi(body:any){
    return this._apiHttpService.post(this._apiEndpointsService.getDeleteUserEndpoint(),body)
  }
  generatePdf(): void {
    this._http.get('/api/pdf', { responseType: 'blob' }).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  downloadPdf(): void {
    this.generatePdf();
  }
}
