import { Component, OnInit } from '@angular/core';

import {BehaviorSubject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Quiz} from "./quiz.model";
import {QuizzesService} from "./quizzes.service";
import {CategoryService} from "./category.service";
import {Category} from "./category.model";
import {UserService} from "../register/user.service";
import {User} from "../register/user.model";



@Component({
  selector: 'app-quizzesonhome',
  templateUrl: './quizzesonhome.component.html',
  styleUrls: ['./quizzesonhome.component.css']
})
export class QuizzesonhomeComponent implements OnInit {

  quizzes: Quiz[] = [];
  quizzesSubject: BehaviorSubject<Quiz[] | any> | undefined;
  subscription1 : Subscription | undefined;

  kategorije : Category[] = [];
  kategorijaSubject : BehaviorSubject<Category[]|any> = new BehaviorSubject(null);
  subscription2 : Subscription | undefined;

  korisnici : User[] = [];
  korisnikSubject : BehaviorSubject<User[]|any> | undefined;
  subscription : Subscription | undefined;

  odabranaKategorijaId: any = null;


  constructor(private quizService: QuizzesService,private categoryService: CategoryService,private userService: UserService) {
  }

  ngOnInit(): void {
    this.korisnikSubject = this.userService.getUsers();
    this.subscription = this.korisnikSubject.subscribe(res =>{
        this.korisnici=res;
      }
    );
    this.quizzesSubject = this.quizService.getQuizzes();
    this.subscription1 = this.quizzesSubject
      .subscribe(res => {
        let polje = res;
        console.log(polje);
        this.quizzes = [];
        if (polje != null) {
          for (let i = 0; i < polje.length; ++i) {
            if (polje[i].public === 0) {
              this.quizzes.push(polje[i])
            }
          }
        }

        console.log(this.quizzes);
      })
    this.kategorijaSubject = this.categoryService.getCategories();
    this.subscription2 = this.kategorijaSubject
      .subscribe(res => {
        this.kategorije = res;
        console.log(this.kategorije);
      })
  }

  findUser(id:any){
    for(let key in this.korisnici){
      if(this.korisnici[key]["id"] == id){
        return this.korisnici[key]["username"] ;
      }
    }
    return "Unknown creator";
  }

  findCategory(id:any){
    for(let key in this.kategorije){
      if(this.kategorije[key]["id"] == id){
        return this.kategorije[key]["name"] ;
      }
    }
    return "Unknown category";
  }

  onChange(value:string){
    this.odabranaKategorijaId = value;
    console.log(this.odabranaKategorijaId);
  }
}
