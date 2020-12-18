import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Configuration from "../shared/Configuration.js";


@Injectable({
  providedIn: 'root'
})
export class PlayerViewService {
  readonly rootUrl = Configuration.value("webapiUrl");
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http : HttpClient) { 

  }

  getPlayer(Id) {
    return this.postQuery(`
      player (id: ${Id}) {
        id,
        name,
        countryId,
        handed,
        dob,
        homeTown,
        heightFeet,
        heightInches,
        weight,
        photo,
        gender,
        turnedPro
      }
    `);
  }

  getPlayersCountryList() {
    return this.postQuery(`
      players {
        id,
        name,
        gender,
        handed,
        dob,
        homeTown,
        country {
          name,
          imageLink
        }
      }
    `);
  }

  createPlayer(player) {
    return this.http.post(`${this.rootUrl}/Players`, player);
  }

  updatePlayer(Id, player) {
    return this.http.put(`${this.rootUrl}/Players/${Id}`, player);
  }

  getCountries() {
    return this.postQuery(`
      countries {
        id,
        name
      }
    `);
  }

  getRankingList(year, gender) {
    return this.postQuery(`
      rankings(year:${year}, gender:"${gender}") {
        id,
        rank,
        player {
          id,
          name,
          country {
            name,
            imageLink
          }
        },
        points,
        prizeMoney
      }
    `)
  }

  getRanking(Id) {
    return this.http.get(`${this.rootUrl}/Rankings/${Id}`);
  }

  updateRanking(Id, ranking) {
    return this.http.put(`${this.rootUrl}/Rankings/${Id}`, ranking);
  }

  getYears() {
    return this.postQuery(`
      years {
          value
      }
    `);
  }

  postQuery(s:string) {
    return this.http.post(`${this.rootUrl}`, this.squash(s), this.httpOptions);
  }

  squash(s:string) {
    s = s.replace(/(?:\r\n|\r|\n)/g, '').replace(/\"/g, '\\"');
    return `{
      "query":"{ ${s} }"
    }`.replace(/\s\s+/g, ' ');
  }

}
