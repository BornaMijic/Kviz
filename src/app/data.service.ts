import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Quiz} from "./quizzesonhome/quiz.model";
import {Question} from "./create/question.model";
import {Category} from "./quizzesonhome/category.model";
import {User} from "./register/user.model";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getQuizzes() {
    return this.http.get("https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/quizzes.json")
      .pipe(map(res => {
        console.log(res);
        const quizzes:Quiz[] = [];
        for (let key in res) {
          // @ts-ignore
          quizzes.push({...res[key], id: key});
        }
        console.log(quizzes);
        return quizzes;
      }))
  }

  getCategories() {
    return this.http.get("https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/categories.json")
      .pipe(map(res => {
        console.log(res);
        const categories:Category[] = [];
        for (let key in res) {
          // @ts-ignore
          categories.push({...res[key], id: key});
        }
        console.log(categories);
        return categories;
      }))
  }

  getQuestion() {
    return this.http.get("https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/questions.json")
      .pipe(map(res => {
        console.log(res);
        const questions:Question[] = [];
        for (let key in res) {
          // @ts-ignore
          questions.push({...res[key], id: key});
        }
        console.log(questions);
        return questions;
      }))
  }

  addQuestion(pitanja: any){
      return this.http.post('https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/questions.json',pitanja)
  }

  addQuiz(kviz: any){
    return this.http.post('https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/quizzes.json',kviz)
  }

  getUsers() {
    return this.http.get("https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/users.json")
      .pipe(map(res => {
        console.log(res);
        const korisnici: User[] =[];
        for (let key in res){
          // @ts-ignore
          korisnici.push({...res[key], id:key});
        }
        console.log(korisnici);
        return korisnici;
      }))
  }

  updateUser(user: any){
    return this.http.patch(`https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}/.json`, user)
  }

  addUser(korisnik: any){
    return this.http.post('https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/users.json',korisnik)
  }

  deleteQuiz(id: any){
    return this.http.delete(`https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/quizzes/${id}.json`);
  }

  deleteQuestion(id: any){
    return this.http.delete(`https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/questions/${id}.json`);
  }

  updateQuestion(question: any){
    return this.http.patch(`https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/questions/${question.id}/.json`, question)
  }

  updateQuiz(quiz: any){
    return this.http.patch(`https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/quizzes/${quiz.id}/.json`, quiz)
  }

  addCategory(kategorija: any){
    return this.http.post('https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/categories.json',kategorija)
  }

  deleteCategory(id: any){
    return this.http.delete(`https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/categories/${id}.json`);
  }


  updateCategory(kategorija: any){
    return this.http.patch(`https://kvizapp-f1b04-default-rtdb.europe-west1.firebasedatabase.app/categories/${kategorija.id}/.json`, kategorija)
  }
}
