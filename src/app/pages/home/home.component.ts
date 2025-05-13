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

  formatOlympicCountryList(value:any){
    let olympicCountries :OlympicCountry[]=[]; 
    value.map((element: any) => {
      let participationList = []
      for(const participation of element.participations){
        participationList.push(new Participation(participation.id, participation.year,participation.city, participation.medalsCount, participation.athleteCount))
      }
      olympicCountries.push(new OlympicCountry(element.id, element.country, participationList));
    });
    return olympicCountries;
  }
}
