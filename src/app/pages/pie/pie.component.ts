import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { OlympicCountry } from '../../core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss'
})
export class PieComponent implements OnInit{
  constructor(private router : Router,private olympicService: OlympicService){}
  
  @Input() olympicCountries!: OlympicCountry[];
  
  colorScheme!: Color;
  data!: {name: string, value: number}[];

  ngOnInit(){
    this.data = this.formatDataForPieChart(this.olympicCountries);
    this.colorScheme = {
      name: 'myScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#647c8a',
        '#3f51b5',
        '#2196f3',
        '#00b862',
        '#afdf0a',
        '#a7b61a',
        '#f3e562',
        '#ff9800',
        '#ff5722',
        '#ff4514']
    };
  }

  formatDataForPieChart(data:OlympicCountry[]):{name: string, value: number}[]{
    let list:{name: string, value: number}[] =[]
    if(data!=undefined){
      for(const value of data) {
        list.push({name : value.country, value: this.olympicService.getTotalMedals(value)})
      };
    }
    return list;
  }

  onSelect(event:{name: string, value: number}){
    this.router.navigateByUrl(event.name.toLowerCase())
  }  
}
