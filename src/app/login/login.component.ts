import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, map, Subject, Subscription} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {User} from "../register/user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../register/user.service";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  korisnici : User[] = [];
  korisnik: User| any;
  authChange : Subject<boolean> = new Subject<boolean>();
  korisnikSubject : BehaviorSubject<User[]|any> | undefined;
  subscription : Subscription | undefined;
  subscription1 : Subscription | undefined;
  uspjeh = true;
  uspjehLogina = {username:true,password:true,active:true};
  loginSubject : BehaviorSubject<any> | undefined;


  constructor(private router:Router,private formbuilder: FormBuilder,private http: HttpClient,private userService: UserService,private authService : AuthService) {
    this.loginForm = null;

  }

  ngOnInit(): void {
    this.korisnikSubject = this.userService.getUsers();
    this.subscription = this.korisnikSubject.subscribe(res =>{
        this.korisnici=res;
      }
    );
    this.loginForm = this.formbuilder.group({
      'username': new FormControl("",[Validators.minLength(4),Validators.required]),
      'password': new FormControl("",[Validators.minLength(4),Validators.required]),
    });
    this.loginSubject = this.authService.getSuccesOfLogin();
    this.subscription1 = this.loginSubject
      .subscribe(res => {
        this.uspjehLogina = res;
        console.log(this.uspjehLogina);

      })
  }

  login() {
    let user = {username: this.loginForm.get('username').value, password: this.loginForm.get('password').value};
    this.authService.login(user, this.korisnici);
  }



}
