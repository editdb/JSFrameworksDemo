import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { PlayerListComponent } from '../app/player-list/player-list.component';

const routes: Routes = [
  { path: 'home', component: PlayerListComponent},
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
