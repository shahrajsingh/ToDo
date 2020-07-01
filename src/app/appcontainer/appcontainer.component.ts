import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appcontainer',
  templateUrl: './appcontainer.component.html',
  styleUrls: ['./appcontainer.component.css']
})
export class AppcontainerComponent implements OnInit {

  isExpanded: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  menu(){
    if(this.isExpanded){
      this.off();
      this.isExpanded = false;
    }else{
      this.on();
      this.isExpanded = true;
    }
  }
  on() {
    if (window.innerWidth < 520) {
      document.getElementById("col").style.width = "150px";
      document.getElementById("overlay").style.display = "block";
      document.getElementById("temp").style.display = "none";
    } else {
      document.getElementById("col").style.width = "150px";
    }

  }
  off() {
    if (window.innerWidth < 520) {
      document.getElementById("col").style.width = "58px";
      document.getElementById("overlay").style.display = "none";
      document.getElementById("temp").style.display = "initial";
    } else {
      document.getElementById("col").style.width = "58px";
    }

  }
}
