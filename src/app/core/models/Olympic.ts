import {Participation} from './Participation'

export class OlympicCountry{
    constructor(
        public id: number,
        public country: string,
        public participations: Participation[]
    ){}

    public getTotalMedals(): number {
        let total = 0;
        this.participations.forEach((participation)=>{
            total+= participation.medalsCount;
        });
        return total;
    };

    public getTotalAthlete(): number {
        let total = 0;
        this.participations.forEach((participation)=>{
            total+= participation.athleteCount;
        });
        return total;
    }
}