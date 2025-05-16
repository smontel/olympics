import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { Router } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private olympicService: OlympicService, private router: Router) {}
  olympicCountries!: OlympicCountry[] | undefined;

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe({
    next :(value)=>{ 
      if(value!=undefined){
        this.olympicCountries = this.formatOlympicCountryList(value);
      }
    },error : (error)=>{ 
      console.log(error);
      this.router.navigateByUrl('error');
    }
  });
  }

  formatOlympicCountryList(value:OlympicCountry[]){
    let olympicCountries :OlympicCountry[]=[]; 
    value.map((element: OlympicCountry) => {
      let participationList = []
      for(const participation of element.participations){
        participationList.push({
          id:participation.id, 
          year: participation.year, 
          city:participation.city,
          medalsCount: participation.medalsCount,
          athleteCount: participation.athleteCount
        })
      }
      olympicCountries.push({
        id: element.id,
        country: element.country,
        participations: participationList
      })
    });
    return olympicCountries;
  }
}
