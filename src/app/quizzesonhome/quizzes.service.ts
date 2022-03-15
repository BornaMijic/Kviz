import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";
import {Quiz} from "./quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  kvizovi : Quiz[] = [];
  kvizSubject : BehaviorSubject<Quiz[]|any> = new BehaviorSubject(null);
  kvizSubject1 : BehaviorSubject<Quiz[]|any> = new BehaviorSubject(null);
  idKviz: any;

  constructor(private http: HttpClient,private dataService:DataService) {
    this.init();
  }

  init(){
    this.dataService.getQuizzes()
      .subscribe(res => {
        this.kvizovi=res;
        this.kvizSubject.next(this.kvizovi);
      })
  }

  getQuizzes(){
    return this.kvizSubject;
  }


   addQuiz(kviz: any) {
     this.dataService.addQuiz(kviz)
      .subscribe((res => {
        // @ts-ignore
        let id = res["name"];
        kviz.id = id;
        this.idKviz= id;
        console.log(this.idKviz + "aaa");
        this.kvizovi.push(kviz);
        console.log(this.kvizovi);
        this.kvizSubject1.next(res);
      }));
     console.log(this.kvizSubject1.asObservable());

     return this.kvizSubject1.asObservable();
  }

  deleteQuiz(id: any){
    this.dataService.deleteQuiz(id)
      .subscribe(
        res => {
          console.log('received ok response from patch request');
          console.log(res);
          for(let i = 0; i < this.kvizovi.length; i++){
            if(id == this.kvizovi[i].id){
              this.kvizovi.splice(i,1);
            }
          }
          this.kvizSubject.next(this.kvizovi);
        },
        error => {
          console.error('There was an error during the request');
          console.log(error);
        });
  }

  updateQuiz(quiz: any){
    this.dataService.updateQuiz(quiz)
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
