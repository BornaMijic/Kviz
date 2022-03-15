import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../create/createquestion/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../create/question.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {QuizzesService} from "../../quizzesonhome/quizzes.service";
import {AuthService} from "../../shared/auth.service";
import {User} from "../../register/user.model";

@Component({
  selector: 'app-editquiz',
  templateUrl: './editquiz.component.html',
  styleUrls: ['./editquiz.component.css']
})
export class EditquizComponent implements OnInit {
  pitanja: Question[] = [];
  questionSubject: BehaviorSubject<Question[] | any> | undefined;
  subscription: Subscription | undefined;
  idKviz: string | any;
  questionForm1: any;
  editam: boolean = false;
  pitanje1: Question| any;
  pitanje2:any = {questionText: "",a:"",b:"",c:"",d:"",correctAnswer:"",quizId:"",idCategory:""};
  dodavanje: boolean = false;

  authenticated: boolean = false;
  korisnik: User | any;
  questions: any = [];



  constructor(private questionService: QuestionService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private quizService: QuizzesService,private authenticatedService: AuthService) {
  }

  ngOnInit(): void {
    this.authenticated = this.authenticatedService.checkIfAuthenticated();
    if (this.authenticated) {
      this.korisnik = this.authenticatedService.getUser();
    } else {
      this.router.navigate(['']);
    }

    this.idKviz = this.route.snapshot.paramMap.get('id');
    this.questionSubject = this.questionService.getQuestion();
    this.subscription = this.questionSubject
      .subscribe(res => {
        console.log(res);
        let polje = res;
        console.log(polje);
        this.pitanja = [];
        if (polje != null) {
          for (let i = 0; i < polje.length; ++i) {
            if (polje[i].quizId === this.idKviz) {
              this.pitanja.push(polje[i])
            }
          }
        }


        if(this.pitanja != null){
          for(let i = 0; i < this.pitanja.length; ++i){
            let question = {questionText: this.pitanja[i].questionText,
              correctAnswer: this.pitanja[i].correctAnswer,
              quizId: this.pitanja[i].quizId,
              id: this.pitanja[i].id,
              a: "", b: "", c: "", d:""}
            if(this.pitanja[i].answers?.length == 4)
              // @ts-ignore
              question.a = this.pitanja[i].answers[0];
            // @ts-ignore
            question.b = this.pitanja[i].answers[1];
            // @ts-ignore
            question.c = this.pitanja[i].answers[2];
            // @ts-ignore
            question.d = this.pitanja[i].answers[3];
            this.questions.push(question);

          }
        }
      });


  }

  pokretanjedodavanja(){
    this.dodavanje = !this.dodavanje;
  }

  addQuestion(){
    let tocan;
    // @ts-ignore
    if(document.getElementById('dodaj').value != null){
      // @ts-ignore
      tocan = document.getElementById('dodaj').value;
    } else {
      tocan = "";
    }
    let question: Question|any= {quizId:this.idKviz,answers:[this.pitanje2.a,this.pitanje2.b,this.pitanje2.c,this.pitanje2.d],
    correctAnswer:tocan,questionText:this.pitanje2.questionText}
    this.questions = [];
    this.questionService.addQuestion(question);
    this.pitanje2.quizId = "";
    this.pitanje2.a = "";
    this.pitanje2.b = "";
    this.pitanje2.c = "";
    this.pitanje2.d = "";
    this.pitanje2.correctAnswer="";
    this.dodavanje = !this.dodavanje;
  }

  deleteQuestion(id:any,i: any){
    if(this.pitanja.length == 1){
      if (confirm('Kviz se mora sastojati od barem jednog pitanja. Prihvaćanjem briše, i kviz')) {
        this.pitanja.splice(i, 1);
        this.questions = [];
        this.questionService.deleteQuestion(id, i);
        this.quizService.deleteQuiz(this.idKviz);
        this.router.navigate(['myquizzes']);
      } else {

      }

    } else {
      this.questions = [];
      this.pitanja.splice(i, 1);
      this.questionService.deleteQuestion(id, i);
    }
  }

  editanje(i: any){
    this.editam = true;
    let forma = document.getElementById("forma"+i);
    // @ts-ignore
    forma.style.display="block";
  }

  updateQuestion(i: any) {
   // @ts-ignore
    let tocan = document.getElementById("tocan"+i).value;
   console.log(tocan);
   this.pitanje1 = {
      questionText:this.questions[i].questionText,
     answers:[this.questions[i].a,this.questions[i].b,this.questions[i].c,this.questions[i].d],
     correctAnswer: tocan,
     quizId:this.questions[i].quizId,
     id: this.questions[i].id
   }
   console.log(this.pitanje1);
    // @ts-ignore
    this.questionService.updateQuestion(this.pitanje1);
    let forma = document.getElementById("forma"+i);
    this.editam=false;
    // @ts-ignore
    forma.style.display="none";
  }

  prekiniEditanje(i: any){
    this.editam=false;
    let forma = document.getElementById("forma"+i);
    // @ts-ignore
    forma.style.display="none";
  }



}
