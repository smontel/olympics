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

  ngOnInit(): void {
    const country = this.route.snapshot.params['country'];
    this.olympicService.getCountry(country).subscribe({
      next: (detailCountry) => {
        if (detailCountry !== undefined) {
          this.olympicCountry = this.formatCountry(detailCountry);
        }
      },
      error: (error) => {
        console.error(error);
        this.router.navigateByUrl('error');
      }
    });
  }

  formatCountry( detailCountry:OlympicCountry):OlympicCountry{
    const participationList = detailCountry.participations.map((participation:Participation) =>
      new Participation(
        participation.id,
        participation.year,
        participation.city,
        participation.medalsCount,
        participation.athleteCount
      )
    );
  
    return new OlympicCountry(detailCountry.id, detailCountry.country, participationList);
  }
  
}
