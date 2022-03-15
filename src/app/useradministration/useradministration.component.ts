import { Component, OnInit } from '@angular/core';
import {Quiz} from "../quizzesonhome/quiz.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {Category} from "../quizzesonhome/category.model";
import {User} from "../register/user.model";
import {Router} from "@angular/router";
import {QuizzesService} from "../quizzesonhome/quizzes.service";
import {CategoryService} from "../quizzesonhome/category.service";
import {UserService} from "../register/user.service";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-useradministration',
  templateUrl: './useradministration.component.html',
  styleUrls: ['./useradministration.component.css']
})
export class UseradministrationComponent implements OnInit {

  korisnici : User[] = [];
  korisnikSubject : BehaviorSubject<User[]|any> | undefined;
  subscription : Subscription | undefined;

  authenticated: boolean = false;
  korisnik: User | any;


  constructor(private router: Router,private userService: UserService,private authenticatedService: AuthService) { }

  ngOnInit(): void {
    this.authenticated = this.authenticatedService.checkIfAuthenticated();
    if (this.authenticated) {
      this.korisnik = this.authenticatedService.getUser();
      if(this.korisnik.admin != 1){
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
    this.korisnikSubject = this.userService.getUsers();
    this.subscription = this.korisnikSubject.subscribe(res =>{
        this.korisnici=res;
      }
    );

  }

  updateUserBlock(user: any){
    user.activeAccount=1;
    this.userService.updateUser(user);

  }

  updateUserUnblock(user: any){
    user.activeAccount=0;
    this.userService.updateUser(user);
  }

}
