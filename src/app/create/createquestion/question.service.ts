import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../../data.service";
import {Question} from "../question.model";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questions : Question[] = [];
  questionSubject : BehaviorSubject<Question[]|any> = new BehaviorSubject(null);



  constructor(private http: HttpClient,private dataService:DataService) {
    this.init()
  }

  init(){
    this.dataService.getQuestion()
      .subscribe(res => {
        this.questions=res;
        this.questionSubject.next(this.questions);
      })
  }

  getQuestion(){
    return this.questionSubject;
  }

  addQuestion(pitanje: any){
    this.dataService.addQuestion(pitanje)
      .subscribe((res => {
        // @ts-ignore
        let id = res["name"];
        pitanje.id = id;
        this.questions.push(pitanje);
        console.log(this.questions);
        this.questionSubject.next(this.questions);
      }));
  }

  deleteQuestion(id: any,index: any){
    this.dataService.deleteQuestion(id)
      .subscribe(
        res => {
          console.log('received ok response from patch request');
          for(let i = 0; i < this.questions.length; i++){
            if(id == this.questions[i].id){
              this.questions.splice(i,1);
            }
          }
          this.questionSubject.next(this.questions);
        },
        error => {
          console.error('There was an error during the request');
          console.log(error);
        });
  }

  updateQuestion(question: any){
    this.dataService.updateQuestion(question)
      .subscribe(
        res => {
          for(let j = 0; j < this.questions.length;++j){
            if(this.questions[j].id == question.id){
              this.questions[j] = question;
            }
          }
          console.log('received ok response from patch request');
        },
        error => {
          console.error('There was an error during the request');
          console.log(error);
        });
  }
}
