import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerViewService } from '../shared/player-view.service';
import { PlayerEditDialogComponent } from '../player/player-edit-dialog.component';
import { RankingEditDialogComponent } from '../ranking/ranking-edit-dialog.component';

interface IdValue {
  id: string;
  value: string;
}

@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styles: [
    'table {      width: 100%;    }'
  ]
})
export class PlayerListComponent implements OnInit {

  genders: IdValue[] = [];
  selectedGender;
  years : any;
  selectedYear : number;
  rankingList : any;
  rankingListColumns : string[] = ['Rank', 'PlayerName', 'CountryName', 'Points', 'PrizeMoney','Action'];

  constructor(
    public playerViewService : PlayerViewService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.genders = [
      {id: 'M', value: 'Men\'s'},
      {id: 'F', value: 'Women\'s'}
    ];
    this.selectedGender = this.genders[0].id;
  
    this.playerViewService.getYears().subscribe(
      res => {
        this.years = res;
        this.selectedYear = this.years[1]; 
        this.getRankingList(this.selectedYear, this.selectedGender);
      },
      err => {
        console.log(err);
      }
    );
  }

  refreshRankingList() {
    this.getRankingList(this.selectedYear, this.selectedGender);
  }

  getRankingList(year, gender) {
    this.playerViewService.getRankingList(year, gender).subscribe(
      res => {
        this.rankingList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  openPlayerEditDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(PlayerEditDialogComponent, {
      width: '500px',
      height: '550px',
      data: obj
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.refreshRankingList();
    });
  }

  openRankingEditDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(RankingEditDialogComponent, {
      width: '500px',
      height: '550px',
      data: obj
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.refreshRankingList();
    });
  }


}
