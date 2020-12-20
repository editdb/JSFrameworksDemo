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

  updatePlayer(id, record) {
    return this.postMutation(`
      updatePlayer(input: {
        id: ${id},
        name: "${record.name}",
        countryId: ${record.countryId}, 
        handed: "${record.handed}",
        dob: "${this.formatDate(record.dob)}",
        homeTown: "${record.homeTown}",
        heightFeet: ${record.heightFeet},
        heightInches: ${record.heightInches},
        weight: ${record.weight},
        photo: [${this.base64ToIntArray(record.photo)}],
        gender: "${record.gender}",
        turnedPro: ${record.turnedPro}
      })
    `);
  }

  base64ToIntArray(b64:string) {
    return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
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
        year,
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
    return this.postQuery(`
      ranking (id: ${Id}) {
        id,
        playerId,
        year,
        movement,
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
        prizeMoney,
        singlesTitles,
        doublesTitles,
        singlesWin,
        singlesLoss
      }
    `)
  }

  updateRanking(id, record) {
    return this.postMutation(`
      updateRanking(input: {
        id: ${id},
        movement: ${record.movement},
        rank: ${record.rank},
        points: ${record.points},
        prizeMoney: ${record.prizeMoney},
        singlesTitles: ${record.singlesTitles},
        doublesTitles: ${record.doublesTitles},
        singlesWin: ${record.singlesWin},
        singlesLoss: ${record.singlesLoss},
      })
    `);
  }

  getYears() {
    return this.postQuery(`
      years {
          value
      }
    `);
  }

  formatDate(d:string) {
    if (d == null) {
      return "";
    }
    return d.substr(0,4) + "-" + d.substr(5,2) + "-" + d.substr(8,2);
  }

  postQuery(s:string) {
    var cmd:string = this.squash(s);
    cmd = `{
      "query":"{ ${cmd} }"
    }`;
    return this.http.post(`${this.rootUrl}`, cmd, this.httpOptions);
  }

  postMutation(s:string) {
    var cmd:string = this.squash(s);
    cmd = `{
      "query": "mutation { ${cmd} {id} }"
    }`;
    return this.http.post(`${this.rootUrl}`, cmd, this.httpOptions);
  }

  squash(s:string) {
    s = s.replace(/(?:\r\n|\r|\n)/g, '').replace(/\"/g, '\\"').replace(/\s\s+/g, ' ');
    return s;
  }

}
