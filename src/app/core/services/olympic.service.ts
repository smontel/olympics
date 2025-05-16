import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);
  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
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

     getTotalMedals(olympicCountry:OlympicCountry): number {
        let total = 0;
        olympicCountry.participations.forEach((participation)=>{
            total+= participation.medalsCount;
        });
        return total;
    };

    getTotalAthlete(olympicCountry:OlympicCountry): number {
        let total = 0;
        olympicCountry.participations.forEach((participation)=>{
            total+= participation.athleteCount;
        });
        return total;
    }



}
