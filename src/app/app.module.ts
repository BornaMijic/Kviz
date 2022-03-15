import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation/navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { QuizzesonhomeComponent } from './quizzesonhome/quizzesonhome.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './create/create.component';
import { CreatequestionComponent } from './create/createquestion/createquestion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SolvingquizComponent } from './quizzesonhome/solvingquiz/solvingquiz.component';
import { RegisterComponent } from './register/register.component';
import { MyquizzesComponent } from './myquizzes/myquizzes.component';
import { EditquizComponent } from './myquizzes/editquiz/editquiz.component';
import { QuizadministrationComponent } from './quizadministration/quizadministration.component';
import { CategoryadministrationComponent } from './categoryadministration/categoryadministration.component';
import { UseradministrationComponent } from './useradministration/useradministration.component';
import { FiltriranjePipe } from './quizzesonhome/filtriranje.pipe';




// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    QuizzesonhomeComponent,
    CreateComponent,
    CreatequestionComponent,
    SolvingquizComponent,
    RegisterComponent,
    MyquizzesComponent,
    EditquizComponent,
    QuizadministrationComponent,
    CategoryadministrationComponent,
    UseradministrationComponent,
    FiltriranjePipe,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
