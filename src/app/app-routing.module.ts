import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {QuizzesonhomeComponent} from "./quizzesonhome/quizzesonhome.component";
import {CreateComponent} from "./create/create.component";
import {CreatequestionComponent} from "./create/createquestion/createquestion.component";
import {SolvingquizComponent} from "./quizzesonhome/solvingquiz/solvingquiz.component";
import {RegisterComponent} from "./register/register.component";
import {MyquizzesComponent} from "./myquizzes/myquizzes.component";
import {EditquizComponent} from "./myquizzes/editquiz/editquiz.component";
import {QuizadministrationComponent} from "./quizadministration/quizadministration.component";
import {CategoryadministrationComponent} from "./categoryadministration/categoryadministration.component";
import {UseradministrationComponent} from "./useradministration/useradministration.component";

const routes: Routes = [
  {path:'',component:QuizzesonhomeComponent},
  {path:'solvingquiz/:id',component:SolvingquizComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'create',component:CreateComponent},
  {path:'create/createquestion/:name/:idCategory',component:CreatequestionComponent},
  {path:'myquizzes',component:MyquizzesComponent},
  {path:'myquizzes/editquiz/:id',component:EditquizComponent},
  {path:'quizadministration',component: QuizadministrationComponent},
  {path:'categoryadministration',component: CategoryadministrationComponent},
  {path:'useradministration',component: UseradministrationComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
