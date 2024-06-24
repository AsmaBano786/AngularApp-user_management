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

  updateUserApi(id : any,body:any){
    return this._apiHttpService.put(this._apiEndpointsService.updateUserEndpoint(id),body)
  }

  getUserListApi(){
    return this._apiHttpService.get(this._apiEndpointsService.getUserListEndpoint())
  }
  


  getUserByIdApi(id:any){
    return this._apiHttpService.get(this._apiEndpointsService.getUserByIdEndpoint(id))
  }

  deleteUserListApi(id:any){
    return this._apiHttpService.delete(this._apiEndpointsService.DeleteUserEndpoint(id))
  }

  RetrievePdfApi(id:any){
    return this._apiHttpService.get(this._apiEndpointsService.retrievePdfEndpoint(id))
  }

  generatePdfApi(id:any){
    return this._apiHttpService.get(this._apiEndpointsService.generatePdfEndpoint(id))
  }
  downloadPdfApi(id: any): void {
    const apiUrl = `http://localhost:3000/pdf/retrieve/${id}`;
  
    this._apiHttpService.get(apiUrl, { responseType: 'blob' }).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${id}.pdf`; // Set the desired file name here
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
  
  downloadPdf(id: any): void {
    this.downloadPdfApi(id);
  }
  }
