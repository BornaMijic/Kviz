import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../shared/auth.service";
import {User} from "../register/user.model";
import {Router} from "@angular/router";
import {Category} from "../quizzesonhome/category.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {CategoryService} from "../quizzesonhome/category.service";



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  quizForm: any;
  naslov: any;

  authenticated: boolean = false;
  korisnik: User | any;

  kategorije : Category[] = [];
  kategorijaSubject : BehaviorSubject<Category[]|any> = new BehaviorSubject(null);
  subscription2 : Subscription | undefined;

  kategorijaId: any;

  constructor( private authenticatedService: AuthService,private router: Router,private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.authenticated = this.authenticatedService.checkIfAuthenticated();
    if (this.authenticated) {
      this.korisnik = this.authenticatedService.getUser();
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

  onClick(){
    // @ts-ignore
    let idCategory = document.getElementById("idCategory").value;
    this.router.navigate(['create/createquestion',this.naslov,idCategory])

  }






}

