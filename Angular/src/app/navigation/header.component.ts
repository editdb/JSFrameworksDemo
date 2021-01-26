import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Configuration from "../shared/Configuration.js";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'
  ]
})
export class HeaderComponent implements OnInit {

  readonly databaseType = Configuration.value("databaseType");

  @Output() public sidenavToggle = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }
}
