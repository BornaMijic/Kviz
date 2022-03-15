import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  korisnici : User[] = [];
  korisnikSubject : BehaviorSubject<User[]|any> = new BehaviorSubject(null);

  constructor(private http: HttpClient,private dataService:DataService) {
    this.init();
  }

  init(){
    this.dataService.getUsers()
      .subscribe(res => {
        this.korisnici=res;
        this.korisnikSubject.next(this.korisnici);
      })
  }

  getUsers(){
    return this.korisnikSubject;
  }

  addUser(korisnik: any){
    this.dataService.addUser(korisnik)
      .subscribe((res => {
        // @ts-ignore
        let id = res["name"];
        korisnik.id = id;
        console.log(id);
        this.korisnici.push(korisnik);
        console.log(this.korisnici);
        this.korisnikSubject.next(this.korisnici);
      }));
  }

  updateUser(user: any){
    this.dataService.updateUser(user)
      .subscribe(
        res => {
          console.log('received ok response from patch request');
        },
        error => {
          console.error('There was an error during the request');
          console.log(error);
        });
  }
}
