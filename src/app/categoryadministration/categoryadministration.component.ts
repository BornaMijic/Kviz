import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../quizzesonhome/category.service";
import {Category} from "../quizzesonhome/category.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "../register/user.model";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categoryadministration',
  templateUrl: './categoryadministration.component.html',
  styleUrls: ['./categoryadministration.component.css']
})
export class CategoryadministrationComponent implements OnInit {

  kategorije : Category[] = [];
  kategorijaSubject : BehaviorSubject<Category[]|any> = new BehaviorSubject(null);
  subscription2 : Subscription | undefined;
  editanje:boolean = false;
  indexNaKojemSeEdita: any;

  kategorija: Category = new Category();

  authenticated: boolean = false;
  korisnik: User | any;




  constructor(private categoryService: CategoryService,private authenticatedService: AuthService,private router: Router) { }

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
    this.kategorijaSubject = this.categoryService.getCategories();
    this.subscription2 = this.kategorijaSubject
      .subscribe(res => {
        this.kategorije = res;
        console.log(this.kategorije);
      })

  }

  deleteCategory(id:any,index: any){
    this.kategorije.slice(index,1);
    this.categoryService.deleteCategory(id);
  }

  updateCategory(kategorija: any){
    this.categoryService.updateCategory(kategorija);
    this.editanje=false;
  }

  editCategory(i: any){
    this.editanje=true;
    this.indexNaKojemSeEdita=i;
  }

  addCategory(){
    this.categoryService.addCategory(this.kategorija);

  }






}
