import { Component, Inject, OnInit, Optional, ChangeDetectorRef  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ranking } from '../models/Ranking.model';
import { PlayerViewService } from '../shared/player-view.service';
import { ToastrService } from 'ngx-toastr';

export interface RankingData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-ranking-edit-dialog',
  templateUrl: './ranking-edit-dialog.component.html',
  styleUrls: ['./ranking-edit-dialog.component.css'],
  providers: []
})

export class RankingEditDialogComponent implements OnInit {

  action : string;
  id : number;
  ranking : any = new Ranking();
  local_data : any;

  constructor(
    public playerViewService : PlayerViewService,
    public rankingEditDialog: MatDialogRef<RankingEditDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RankingData,
    private changeDetectorRef:ChangeDetectorRef,
    private toastr : ToastrService) {
    //console.log(data);
    this.local_data = {...data};
    this.id = this.local_data.id;
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.playerViewService.getRanking(this.id).subscribe(
      res => {
        this.ranking = res["ranking"] as Ranking;
      },
      err => {
        console.log(err);
      }
    );

  }

  // ChangeDetectorRef stuff removes the ExpressionChangedAfterItHasBeenCheckedError JS error
  ngAfterViewChecked()
  {
      this.changeDetectorRef.detectChanges();
  }

  doAction() {
    this.playerViewService.updateRanking(this.id, this.ranking).subscribe(
      res => {
        this.toastr.info("Record updated");
        this.rankingEditDialog.close({event:this.action, data:this.id});
      },
      err => {
        console.log(err);
        this.toastr.error(this.formatError(err));
      }
    );
  }

  closeDialog() {
    this.rankingEditDialog.close({event:'Cancel'});
  }

  formIsValid() {
    let anyInvalid : Boolean = document.getElementsByClassName('ng-invalid').length > 0;
    if (anyInvalid) {
      return !anyInvalid;
    }
    return true;
  }

  formatError(err : any) {
    var errorText : string = "";
    if (typeof err.error == 'string') {
      errorText = err.error;
    } else {
      errorText = err.error.errors[Object.keys(err.error.errors)[0]];
    }
    var idx = errorText.indexOf("Exception: ");
    if (idx > -1) {
      errorText = errorText.substring(idx + "Exception: ".length);
    }
    idx = errorText.indexOf("\r\n   at ");
    if (idx > -1) {
      errorText = errorText.substring(0, idx);
    }

    return errorText;
  }
  
}
