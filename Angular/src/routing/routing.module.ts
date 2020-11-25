import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { PlayerListComponent } from '../app/player-list/player-list.component';
import { RankingListComponent } from '../app/ranking-list/ranking-list.component';

const routes: Routes = [
  { path: 'home', component: RankingListComponent},
  { path: 'playerList', component: PlayerListComponent},
  { path: 'rankingList', component: RankingListComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
