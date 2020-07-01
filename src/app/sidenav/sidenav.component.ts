import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }
  @ViewChild('drawer', { static: false }) 
  drawer: MatSidenav;
  ngOnInit(): void {
  }
 
}
