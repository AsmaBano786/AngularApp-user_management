import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {



  isisExpandedNavSideBar = new BehaviorSubject(true);
  userUpdated = new Subject();
  headerTabOptionSelected = new Subject();

  private selectedFileSubject = new BehaviorSubject<File | null>(null);
  selectedFile$ = this.selectedFileSubject.asObservable();
  permissionData: any;

  private refreshPermissionSubject = new Subject<boolean>();
  private refreshStorageSubject = new Subject<Boolean>()
  refresh$ = this.refreshPermissionSubject.asObservable();
  storageRefresh = this.refreshStorageSubject.asObservable();

  constructor(
    private _toastr: ToastrService,

  ) { }




  ToastPopup(errorMsg: string, errorModule: string, errorType: string) {
    switch (errorType) {
      case 'error':
        this._toastr.error(errorMsg, errorModule, {
          progressBar: true
        });
        break;
      case 'info':
        this._toastr.info(errorMsg, errorModule, {
          progressBar: true
        });
        break;
      case 'success':
        this._toastr.success(errorMsg, errorModule, {
          progressBar: true
        });
        break;
    }
  }

}

