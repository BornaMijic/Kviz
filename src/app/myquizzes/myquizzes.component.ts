import { Component, OnInit } from '@angular/core';
import {Quiz} from "../quizzesonhome/quiz.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {Category} from "../quizzesonhome/category.model";
import {User} from "../register/user.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizzesService} from "../quizzesonhome/quizzes.service";
import {CategoryService} from "../quizzesonhome/category.service";
import {UserService} from "../register/user.service";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-myquizzes',
  templateUrl: './myquizzes.component.html',
  styleUrls: ['./myquizzes.component.css']
})
export class MyquizzesComponent implements OnInit {

  quizzes: Quiz[] = [];
  quizzesSubject: BehaviorSubject<Quiz[] | any> | undefined;
  subscription: Subscription | undefined;
  editanje:boolean = false;
  indexNaKojemSeEdita: any;

  kategorije: Category[] = [];
  kategorijaSubject: BehaviorSubject<Category[] | any> = new BehaviorSubject(null);
  subscription1: Subscription | undefined;

  authenticated: boolean = false;
  korisnik: User | any;


  constructor(private http: HttpClient, private router: Router, private quizService: QuizzesService, private categoryService: CategoryService, private authenticatedService: AuthService) {
  }

  ngOnInit(): void {
    this.authenticated = this.authenticatedService.checkIfAuthenticated();
    if (this.authenticated) {
      this.korisnik = this.authenticatedService.getUser();
    } else {
      this.router.navigate(['']);
    }
    this.quizzesSubject = this.quizService.getQuizzes();
    this.subscription = this.quizzesSubject
      .subscribe(res => {
        this.quizzes = res;
        let polje = res;
        console.log(polje);
        this.quizzes = [];
        if (polje != null && this.authenticated) {
          for (let i = 0; i < polje.length; ++i) {
            if (polje[i].userId === this.korisnik.id) {
              this.quizzes.push(polje[i])
            }
          }
        }
        console.log(this.quizzes);
      })
    this.kategorijaSubject = this.categoryService.getCategories();
    this.subscription1 = this.kategorijaSubject
      .subscribe(res => {
        this.kategorije = res;
        console.log(this.kategorije);
      })
  }

  deleteQuiz(id: any, index: number) {
    this.quizzes.slice(index,1);
    this.quizService.deleteQuiz(id);
  }

  editQuiz(i: any,idCategory: any){
    this.editanje=true;
    this.indexNaKojemSeEdita=i;
  }

  updateQuiz(quiz: any,i:any){
    // @ts-ignore
    let element = document.getElementById('idCategory'+i).value;
    quiz.idCategory = element;
    this.quizService.updateQuiz(quiz);
    this.editanje = false;
  }

  findCategory(id:any){
    for(let key in this.kategorije){
      if(this.kategorije[key]["id"] == id){
        return this.kategorije[key]["name"] ;
      }
    }
    return "Unknown category";
  }

}

