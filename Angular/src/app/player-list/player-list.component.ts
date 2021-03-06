import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerViewService } from '../shared/player-view.service';
import { PlayerEditDialogComponent } from '../player/player-edit-dialog.component';

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

  playerList : any;
  playerListColumns : string[] = ['Name', 'Gender', 'Handed', 'Dob', 'Country', 'HomeTown','Action'];

  constructor(
    public playerViewService : PlayerViewService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { 
    this.getPlayersCountryList(); 
  }

  refreshList() {
    this.getPlayersCountryList();
  }

  getPlayersCountryList() {
    this.playerViewService.getPlayersCountryList().subscribe(
      res => {
        this.playerList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  openPlayerEditDialog(action, obj) {
    obj.action = action;
    obj.PlayerId = obj.Id;
    const dialogRef = this.dialog.open(PlayerEditDialogComponent, {
      width: '500px',
      height: '550px',
      data: obj
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.refreshList();
    });
  }


}
