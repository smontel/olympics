import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);
  private toto : any;
  constructor(private http: HttpClient, private router : Router) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );

  }

  getOlympics() {
    return this.olympics$.asObservable();
  }



  getCountry(name: string): Observable<OlympicCountry>{
    return this.olympics$.pipe(
      filter(e=>e!=undefined),
      map((element:OlympicCountry[])=>{
        for(const c of element){
         if(c.country.toLowerCase() === name){
           return c;
         }
        }
        throw new Error('Country not found');
      }));
  }




}
