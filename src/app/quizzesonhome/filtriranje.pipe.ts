import { Pipe, PipeTransform } from '@angular/core';
import {Quiz} from "./quiz.model";

@Pipe({
  name: 'filtriranje'
})
export class FiltriranjePipe implements PipeTransform {

  transform(kvizovi: Quiz[], categorijaId: any, atributfiltriranja: any): any {
    console.log(atributfiltriranja);
    if(!kvizovi || !categorijaId){
      return kvizovi;
    }
    if(categorijaId){
      if(atributfiltriranja){
        if(categorijaId == "All"){
          return kvizovi
        }else {
          // @ts-ignore
          return kvizovi.filter(kviz => kviz[atributfiltriranja] == categorijaId);
        }
      }

    }
  }


}
