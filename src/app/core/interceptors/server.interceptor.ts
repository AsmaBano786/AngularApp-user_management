import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, finalize } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { Constants } from 'src/app/config/constant';
@Injectable()
export class ServerInterceptor implements HttpInterceptor {

  constructor(
    private _sharedService: SharedService,
    private _ngxLoader:NgxUiLoaderService,
    private _constant:Constants,
    private _router:Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

 
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('Error caught:', err);
          if ([401, 403, 503].includes(err.status)) {
            console.log("Redirecting to login page");
            this._router.navigate(['/login']);
          } else if (err.error !== null) {
            console.log("Interceptor error:", err);
            this._ngxLoader.stop();
            this._sharedService.ToastPopup(err.error.message, '', 'error');
          } else {
            this._sharedService.ToastPopup(err.message, err.statusText, 'error');
          }
          return EMPTY;
        }),
        finalize(() => {
          // Finalize logic here if needed
        })
      );
    } 

}
