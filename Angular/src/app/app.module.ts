import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { RoutingModule } from '../routing/routing.module';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';

import { RankingListComponent } from './ranking-list/ranking-list.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { HeaderComponent } from './navigation/header.component';
import { SidenavListComponent } from './navigation/sidenav-list.component';

import { PlayerViewService } from './shared/player-view.service';
import { PlayerEditDialogComponent } from './player/player-edit-dialog.component';
import { RankingEditDialogComponent } from './ranking/ranking-edit-dialog.component';
import { FileUploadDDComponent } from './file-upload-dd/file-upload-dd.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    RankingListComponent,
    PlayerListComponent,
    HeaderComponent,
    SidenavListComponent,
    PlayerEditDialogComponent,
    RankingEditDialogComponent,
    FileUploadDDComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports:[
    RoutingModule
  ],
  providers: [
    PlayerViewService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
