import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = environment.apiUrl;
  private nameLeague = new BehaviorSubject('');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  nameLeague$ = this.nameLeague.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  addNameLeague(nameLeague: string) {
    this.nameLeague.next(nameLeague);
  }

  getAllLeagues(){
    return this.http.get<any>(`${this.apiUrl}search_all_leagues.php?c=England&s=Soccer`);
  }
  getSeasonsLeagueById(id: string){
    return this.http.get<any>(`${this.apiUrl}search_all_seasons.php?id=${id}`);
  }
  getSeason(id: string, season: string){
    return this.http.get<any>(`${this.apiUrl}lookuptable.php?l=${id}&s=${season}`);
  }

}
