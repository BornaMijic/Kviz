import { Component, OnInit } from '@angular/core';
import {Quiz} from "../quizzesonhome/quiz.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {QuizzesService} from "../quizzesonhome/quizzes.service";
import {Category} from "../quizzesonhome/category.model";
import {User} from "../register/user.model";
import {CategoryService} from "../quizzesonhome/category.service";
import {UserService} from "../register/user.service";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-quizadministration',
  templateUrl: './quizadministration.component.html',
  styleUrls: ['./quizadministration.component.css']
})
export class QuizadministrationComponent implements OnInit {

  quizzes: Quiz[] = [];
  quizzesSubject: BehaviorSubject<Quiz[] | any> | undefined;
  subscription1 : Subscription | undefined;

  kategorije : Category[] = [];
  kategorijaSubject : BehaviorSubject<Category[]|any> = new BehaviorSubject(null);
  subscription2 : Subscription | undefined;

  korisnici : User[] = [];
  korisnikSubject : BehaviorSubject<User[]|any> | undefined;
  subscription : Subscription | undefined;

  authenticated: boolean = false;
  korisnik: User | any;


  constructor(private router: Router, private quizService: QuizzesService,private categoryService: CategoryService,private userService: UserService,private authenticatedService: AuthService) { }

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
    this.quizzesSubject = this.quizService.getQuizzes();
    this.subscription1 = this.quizzesSubject
      .subscribe(res => {
        this.quizzes = res;

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
    return "Unkown creator";
  }

  deleteQuiz(id:any,index: any){
    this.quizzes.slice(index,1);
    this.quizService.deleteQuiz(id);
  }

  updateQuizPublic(quiz: any){
    quiz.public=0;
    this.quizService.updateQuiz(quiz);

  }

  updateQuizPrivate(quiz: any){
    quiz.public=1;
    this.quizService.updateQuiz(quiz);
  }

}
