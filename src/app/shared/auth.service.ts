import { Injectable } from '@angular/core';
import {User} from "../register/user.model";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import * as crypto from "crypto-js";
import {Quiz} from "../quizzesonhome/quiz.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  korisnik: User|any;

  authChange : Subject<boolean> = new Subject<boolean>();

  secretKey = "evojesifra";

  loginSubject : BehaviorSubject<Quiz[]|any> = new BehaviorSubject({username:true,password:true,active:true});


  constructor(private router: Router) {

  }

  getSuccesOfLogin(){
    return this.loginSubject;
  }

  login(user: any,korisnici: any){
    let result = {username:true,password:true};
    let korisnik: any = null;
    new Observable(observer =>{
      setTimeout(() => {
        for(let i = 0; i < korisnici.length;++i){
          if(korisnici[i].username == user.username && this.decrypt(korisnici[i].password) == user.password){
            if(korisnici[i].activeAccount == 1){
              this.loginSubject.next({username:true,password:true,active:false});
            } else {
              this.loginSubject.next({username:true,password:true,active:true});
              korisnik = korisnici[i];
            }
            break;
          } else if(korisnici[i].username == user.username && this.decrypt(korisnici[i].password) != user.password) {
            this.loginSubject.next({username:true,password:false,active:true});
            break;
          } else {
            this.loginSubject.next({username:false,password:false,active:true});
          }
        }
        observer.next(korisnik);
      },1000);
    }).subscribe((korisnik: any)=>{
        if(korisnik){
          this.korisnik = korisnik;
          sessionStorage.setItem('korisnik',JSON.stringify(this.korisnik));
          this.authChange.next(true);
          console.log("uspjesno");
          this.router.navigate(['']);
        } else {
          console.log("neuspjesno")
        }
      }

    )
  }

  decrypt(textToDecrypt : string){
    return crypto.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(crypto.enc.Utf8);
  }

  getUser(){
    if (this.korisnik) {
      this.korisnik=JSON.parse(<string>sessionStorage.getItem('korisnik'));
      return this.korisnik;
    }

  }


  Logout(){
    this.korisnik=null;
    sessionStorage.removeItem('korisnik');
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  checkIfAuthenticated(){
    return this.korisnik!=null;
  }

}
