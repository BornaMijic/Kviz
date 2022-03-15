import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {User} from "./user.model";
import * as crypto from 'crypto-js';
import {BehaviorSubject, Subscription} from "rxjs";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: any;
  korisnici : User[] = [];
  korisnikSubject : BehaviorSubject<User[]|any> | undefined;
  subscription : Subscription | undefined;
  secretKey = "evojesifra";
  istina = false;
  samepassword = false;

  model : User = new User();


  constructor(private formbuilder: FormBuilder,private http: HttpClient,private router: Router,private userService:UserService) {
    this.userForm=null;
  }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      'username': new FormControl("",[Validators.minLength(4),Validators.required]),
      'password': new FormControl("",[Validators.minLength(4),Validators.required]),
      'password1': new FormControl("",[Validators.minLength(4),Validators.required]),
      'email': new FormControl("",[Validators.email,Validators.required]),
    });
    this.userForm.valueChanges.subscribe((forma: { password: any; password1: any; }) => {
      if (forma.password !== forma.password1) {
        this.userForm.setErrors({ mismatch: true });
        this.samepassword = true;

      } else {
        this.userForm.setErrors(null);
        this.samepassword = false;
      }
    });
    this.korisnikSubject = this.userService.getUsers();
    this.subscription = this.korisnikSubject.subscribe(res =>{
        this.korisnici=res;
      }
    );


  }


  addUser(){
    this.istina = false;
    console.log("tu sam");
    console.log(this.userForm.get('username').value);
    let korisnik: User|any = {};
    for(let i = 0; i < this.korisnici.length; ++i){
      if(this.korisnici[i].username == this.userForm.get('username').value){
        this.istina = true;
      }
    }

    if(!this.istina){
      korisnik.username = this.userForm.get('username').value;
      korisnik.password = this.userForm.get('password').value
      korisnik.email = this.userForm.get('email').value;
      korisnik.activeAccount = 0;
      korisnik.admin = 0;
      korisnik.password = this.encrypt(korisnik.password);
      this.userService.addUser(korisnik);
      this.router.navigate(['login']);
    }
  }

  encrypt(value:string){
    console.log(crypto.AES.encrypt(value, this.secretKey.trim()).toString())
    return crypto.AES.encrypt(value, this.secretKey.trim()).toString();
  }

}
