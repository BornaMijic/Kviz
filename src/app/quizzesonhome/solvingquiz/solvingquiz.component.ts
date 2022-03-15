import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../create/createquestion/question.service";
import {Question} from "../../create/question.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../register/user.model";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-solvingquiz',
  templateUrl: './solvingquiz.component.html',
  styleUrls: ['./solvingquiz.component.css']
})
export class SolvingquizComponent implements OnInit {

  pitanja: Question[] = [];
  questionSubject : BehaviorSubject<Question[]|any> | undefined;
  subscription : Subscription | undefined;
  idKviz: string|any;

  brojPitanja = 0;
  bodovi = 0;
  krajKviza: boolean = false;



  constructor(private questionService:QuestionService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {


    this.idKviz = this.route.snapshot.paramMap.get('id');
    this.questionSubject=this.questionService.getQuestion();
    this.subscription=this.questionSubject
      .subscribe(res => {
        console.log(res);
        let polje = res;
        console.log(polje);
        if(polje != null){
          for(let i = 0;i < polje.length;++i){
            if(polje[i].quizId === this.idKviz){
              this.pitanja.push(polje[i])
            }
          }
        }
        console.log("evo");
        console.log(this.pitanja);
      });
  }

  provjeravanjeOdgovora(indexPitanja:any,indexOdgovora:any){
    // @ts-ignore
    if(this.pitanja[indexPitanja].answers[indexOdgovora] == this.pitanja[indexPitanja].correctAnswer){
      this.bodovi += 1;
    }
    this.brojPitanja += 1;
    if(this.brojPitanja >= this.pitanja.length){
      this.krajKviza = true;
    }
  }

  calculatingPercentage(){
    if(this.pitanja.length>=1){
      return (this.bodovi/this.pitanja.length*100).toFixed(2);
    }
    return "";
  }

  return(){
    this.router.navigate(['']);

  }


}
