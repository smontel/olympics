import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { ActivatedRoute, RouterLink,Router } from '@angular/router';
import { LineChartComponent } from '../line-chart/line-chart.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, LineChartComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) {}
  
  olympicCountry!: OlympicCountry | undefined;
  totalMedals:number|undefined;
  totalAthlete:number|undefined;

  ngOnInit(): void {
    const country = this.route.snapshot.params['country'];
    this.olympicService.getCountry(country).subscribe({
      next: (detailCountry) => {
        if (detailCountry !== undefined) {
          this.olympicCountry = this.formatCountry(detailCountry);
          this.totalAthlete = this.olympicService.getTotalAthlete(this.olympicCountry);
          this.totalMedals = this.olympicService.getTotalMedals(this.olympicCountry);
        }
      },
      error: (error) => {
        console.error(error);
        this.router.navigateByUrl('error');
      }
    });
  }

  formatCountry( detailCountry:OlympicCountry):OlympicCountry{
    const participationList = detailCountry.participations.map((participation:Participation) =>{
      return {
        id:participation.id,
        year:participation.year,
        city:participation.city,
        medalsCount:participation.medalsCount,
        athleteCount:participation.athleteCount
      }
    });
    return {id:detailCountry.id, country:detailCountry.country, participations:participationList};
  }
  

}
