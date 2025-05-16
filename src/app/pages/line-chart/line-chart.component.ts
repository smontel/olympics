import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit{
  
  @Input() olympicCountry!: OlympicCountry;

  data!: {name:string, series:{name:number, value: number}[]}[];

  ngOnInit(){
    this.data = [this.formatDataForLineChart(this.olympicCountry)];
  }

    formatDataForLineChart(data: OlympicCountry){
      let listmedals: {name : number, value: number}[]= []
      data.participations.map((element)=>{
        listmedals.push({name: element.year, value: element.medalsCount})
      });
      let formatedData = {
        name: data.country, series: listmedals
      }
      return formatedData;
    }
}

