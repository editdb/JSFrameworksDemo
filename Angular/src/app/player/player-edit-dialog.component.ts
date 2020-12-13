import { Component, Inject, OnInit, Optional, ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../models/Player.model';
import { PlayerViewService } from '../shared/player-view.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { ToastrService } from 'ngx-toastr';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-player-edit-dialog',
  templateUrl: './player-edit-dialog.component.html',
  styleUrls: ['./player-edit-dialog.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})

export class PlayerEditDialogComponent implements OnInit {

  action : string;
  Id : number;
  player : any = new Player();
  countries : any;
  turnedProYears : number[] = Array.from({length: 40}, (_, i) => i - 40 + new Date().getFullYear());


  constructor(
    public playerViewService : PlayerViewService,
    public playerEditDialog: MatDialogRef<PlayerEditDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private changeDetectorRef:ChangeDetectorRef,
    private toastr : ToastrService) {
    //console.log(data);
    var local_data : any = {...data};
    this.Id = local_data.PlayerId;
    this.action = local_data.action;
  }

  ngOnInit(): void {
    this.playerViewService.getPlayer(this.Id).subscribe(
      res => {
        this.player = res as Player;
        this.playerViewService.getCountries().subscribe(
          res => {
            this.countries = res;
          },
          err => {
            console.log(err);
          }
        );
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
    this.playerViewService.updatePlayer(this.Id, this.player).subscribe(
      res => {
        this.toastr.info("Record updated");
        this.playerEditDialog.close({event:this.action, data:this.Id});
      },
      err => {
        console.log(err);
        this.toastr.error(this.formatError(err.error));
      }
    );
  }

  closeDialog() {
    this.playerEditDialog.close({event:'Cancel'});
  }

  receiveFileUploaded($event) {
    this.player['Photo'] = $event;
  }

  formIsValid() {
    document.getElementById('Dob').classList.remove('ng-invalid');
    let anyInvalid : Boolean = document.getElementsByClassName('ng-invalid').length > 0;
    if (anyInvalid) {
      return !anyInvalid;
    }
    
    if (this.player.Dob && new Date(this.player.Dob).getFullYear() < 1970) {
      document.getElementById('Dob').classList.add('ng-invalid');
      return false;
    } 

    return true;
  }

  formatError(errorText : string) {
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
