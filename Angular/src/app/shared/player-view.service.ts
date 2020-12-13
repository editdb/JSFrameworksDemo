import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Configuration from "../shared/Configuration.js";


@Injectable({
  providedIn: 'root'
})
export class PlayerViewService {
  readonly rootUrl = Configuration.value("webapiUrl");
  
  constructor(private http : HttpClient) { 

  }

  getPlayer(Id) {
    return this.http.get(`${this.rootUrl}/Players/${Id}`);
  }

  getPlayersCountryList() {
    return this.http.get(`${this.rootUrl}/PlayersWithCountry`);
  }

  createPlayer(player) {
    return this.http.post(`${this.rootUrl}/Players`, player);
  }

  updatePlayer(Id, player) {
    return this.http.put(`${this.rootUrl}/Players/${Id}`, player);
  }

  getCountries() {
    return this.http.get(`${this.rootUrl}/Countries`);
  }

  getRankingList(year, gender) {
    return this.http.get(`${this.rootUrl}/RankingsList/${year}/${gender}`);
  }

  getRanking(Id) {
    return this.http.get(`${this.rootUrl}/Rankings/${Id}`);
  }

  updateRanking(Id, ranking) {
    return this.http.put(`${this.rootUrl}/Rankings/${Id}`, ranking);
  }

  getYears() {
    return this.http.get(`${this.rootUrl}/Years`);
  }

}
