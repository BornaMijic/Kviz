import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {User} from "../../../register/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  authenticated: boolean = false;
  korisnik: User|any;
  authenticatedSubscription : Subscription | undefined;
  admin: boolean = false;

  constructor(private authenticatedService: AuthService) { }


  ngOnInit(): void {
    this.authenticated =  this.authenticatedService.checkIfAuthenticated();
    if(this.authenticated){
      this.korisnik =  this.authenticatedService.getUser();
    }
    this.authenticatedSubscription=this.authenticatedService.authChange
      .subscribe(res => {
        this.authenticated=this.authenticatedService.checkIfAuthenticated();
        if(this.authenticated){
          this.korisnik =  this.authenticatedService.getUser();
          if(this.korisnik.admin === 1){
            this.admin = true;
          }
        }
      });

  }

  Logout(){
    this.authenticatedService.Logout();
  }



}
