import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Question} from "../question.model";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "./question.service";
import {Quiz} from "../../quizzesonhome/quiz.model";
import {QuizzesService} from "../../quizzesonhome/quizzes.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {formatDate} from "@angular/common";
import {AuthService} from "../../shared/auth.service";
import {User} from "../../register/user.model";

@Component({
  selector: 'app-createquestion',
  templateUrl: './createquestion.component.html',
  styleUrls: ['./createquestion.component.css']
})
export class CreatequestionComponent implements OnInit {
  editam: boolean = false;
  pitanja:Question[] = [];
  questions:any[] = [];
  naslovKviza: string| any = "";
  idCategory: string| any = "";
  trenutnoPolje = -1;

  questionForm : any;
  questionForm1 : any;

  authenticated: boolean = false;
  korisnik: User|any;
  dodanoPitanje:any = {questionText: "",a:"",b:"",c:"",d:"",correctAnswer:"",quizId:"",idCategory:""};
  idKviz: any;

  constructor(private route: ActivatedRoute,private formbuilder: FormBuilder,private router: Router,private questionService:QuestionService,private quizService: QuizzesService,private authenticatedService: AuthService) { }

  ngOnInit(): void {
    this.naslovKviza = this.route.snapshot.paramMap.get('name');
    this.idCategory = this.route.snapshot.paramMap.get('idCategory');

    this.authenticated =  this.authenticatedService.checkIfAuthenticated();
    console.log(this.authenticatedService.checkIfAuthenticated());
    if(this.authenticated){
      this.korisnik =  this.authenticatedService.getUser();
      console.log(this.authenticatedService.getUser());
    }else {
      this.router.navigate(['']);
    }


    this.zavrsiKviz();
  }

  prekiniEditanje(i: any){
      // @ts-ignore
    this.editam=false;
  }

  spremiPitanje(formaZaDodavanje: NgForm){

    let pitanje: Question|any= {quizId:this.idKviz.name,answers:[this.dodanoPitanje.a,this.dodanoPitanje.b,this.dodanoPitanje.c,this.dodanoPitanje.d],
      correctAnswer:this.dodanoPitanje.correctAnswer,questionText:this.dodanoPitanje.questionText}
    this.questions.push({quizId:this.idKviz.name,a:this.dodanoPitanje.a,b:this.dodanoPitanje.b,c:this.dodanoPitanje.c,d:this.dodanoPitanje.d,
      correctAnswer:this.dodanoPitanje.correctAnswer,questionText:this.dodanoPitanje.questionText});
    this.pitanja.push(pitanje);
    // @ts-ignore
    formaZaDodavanje.reset();
  }

 zavrsiKviz() {
    let datum = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    let quiz: Quiz | any = {
      title: this.naslovKviza,
      timestamp: datum,
      userId: this.korisnik.id,
      idCategory: this.idCategory,
      public: 0,
    };

    this.quizService.addQuiz(quiz).subscribe(res=>{
      // @ts-ignore
      this.idKviz = res;
    });
  }

  zavrsiPitanja(){
    this.pitanja.forEach(pitanje => {
        this.questionService.addQuestion(pitanje);
    });
    this.router.navigate(['']);
  }

  brisanje(i:any){
    this.questions.splice(i, 1);
    this.pitanja.splice(i, 1);
    console.log(this.pitanja);
  }

  editanje(i:any){
    // @ts-ignore
    this.editam = true;
    this.trenutnoPolje = i;
  }

  SpremiPromjeneEditanja(i:any){
      this.pitanja[i].questionText = this.questions[i].questionText
      // @ts-ignore
      this.pitanja[i].answers[0] = this.questions[i].a
      // @ts-ignore
      this.pitanja[i].answers[1] = this.questions[i].b
      // @ts-ignore
      this.pitanja[i].answers[2] = this.questions[i].c
      // @ts-ignore
      this.pitanja[i].answers[3] = this.questions[i].d
      this.pitanja[i].correctAnswer = this.questions[i].correctAnswer
      // @ts-ignore
      this.editam = false;
  }



}
