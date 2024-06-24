import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Add your authentication logic here
    // For demonstration, we are redirecting to '/user-list' by default

    // Uncomment and implement the below line based on your authentication logic
    // const isAuthenticated = this.sharedService.isAuthenticated();

    // if (!isAuthenticated) {
    //   this.router.navigate(['/user-list']);
    //   return false;
    // }

    // Assuming no authentication logic for now, always redirect to '/user-list'
    this.router.navigate(['/user-list']);
    return false;
  }
}
