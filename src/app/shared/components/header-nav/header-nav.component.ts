import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  showFiller = false;
  userDetails: any;
  cid: any;
  companydata: any;
  filteredMenuList: any = [];
  role_id: any;

  leftMenuList: any = [];
  company_id: any;
  role: any;
  private refreshSubscription: Subscription = new Subscription;
  userPermission: any;
  company_logo: any = 'assets/logo.jpg';

  constructor(
    private _shared: SharedService,
  ) { }

  ngOnInit(): void {
    
  }

  refreshStorage(){
    this._shared.storageRefresh.subscribe(res => {
      if (res) {
        // this.userDetails = this._shared.getUserDetails();
      }
    });
  }
  ngOnDestroy() {
    if (this.refreshSubscription)
      this.refreshSubscription.unsubscribe();
  }
}
