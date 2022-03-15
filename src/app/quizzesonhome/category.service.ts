import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";
import {Quiz} from "./quiz.model";
import {BehaviorSubject} from "rxjs";
import {Category} from "./category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  kategorije : Category[] = [];
  kategorijaSubject : BehaviorSubject<Quiz[]|any> = new BehaviorSubject(null);
  kategorijaSubject1 : BehaviorSubject<Quiz[]|any> = new BehaviorSubject(null);
  idCategory: any;

  constructor(private http: HttpClient,private dataService:DataService) {
    this.init();
  }

  init(){
    this.dataService.getCategories()
      .subscribe(res => {
        this.kategorije=res;
        this.kategorijaSubject.next(this.kategorije);
      })
  }

  getCategories(){
    return this.kategorijaSubject;
  }

  deleteCategory(id: any){
    this.dataService.deleteCategory(id)
      .subscribe(
        res => {
          console.log('received ok response from patch request');
          for(let i = 0; i < this.kategorije.length; i++){
            if(id == this.kategorije[i].id){
              this.kategorije.splice(i,1);
            }
          }
          this.kategorijaSubject.next(this.kategorije);
        },
        error => {
          console.error('There was an error during the request');
          console.log(error);
        });
  }

  updateCategory(category: any){
    this.dataService.updateCategory(category)
      .subscribe(
        res => {
          console.log('received ok response from patch request');
        },
        error => {
          console.error('There was an error during the request');
          console.log(error);
        });
  }

  addCategory(kategorija: any) {
    this.dataService.addCategory(kategorija)
      .subscribe((res => {
        // @ts-ignore
        let id = res["name"];
        kategorija.id = id;
        this.idCategory= id;
        this.kategorije.push(kategorija);
        console.log(this.kategorije);
        this.kategorijaSubject1.next(res);
      }));
    console.log(this.kategorijaSubject1.asObservable());

    return this.kategorijaSubject1.asObservable();
  }
}
