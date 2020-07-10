import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task/task.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-appcontainer',
  templateUrl: './appcontainer.component.html',
  styleUrls: ['./appcontainer.component.css']
})
export class AppcontainerComponent implements OnInit {

  isExpanded: boolean = false;
  tabs: String[] = ['My Day', 'Important', 'Tasks'];
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  tab: String = this.tabs[0];
  day: String = "";
  month: String = "";
  date: Number;
  d: Date;
  UserId: string;
  constructor(private taskservice:TaskService,private authService: AuthService) {
    this.d = new Date();
    this.day += this.days[this.d.getDay()];
    this.month += this.months[this.d.getMonth()];
    this.date = this.d.getDate();
    this.UserId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.taskservice.gettask(this.UserId);
  }

  menu() {

    if (this.isExpanded) {

      this.off();
      this.isExpanded = false;
    } else {

      this.on();
      this.isExpanded = true;
    }
  }
  on() {
    if (window.innerWidth < 520) {
      document.getElementById("col").style.width = "150px";
      document.getElementById("overlay").style.display = "block";


    } else {
      document.getElementById("col").style.width = "150px";
      document.getElementById("app-container").style.margin = "0px 0px 0px 150px";
    }

  }
  off() {



    document.getElementById("col").style.width = "58px";
    document.getElementById("app-container").style.margin = "0px 0px 0px 58px";
    document.getElementById("overlay").style.display = "none";



  }
  settab(n) {
    this.tab = this.tabs[n];
    this.taskservice.settab(this.tab);
    if(n == 0){
      this.taskservice.getMyDayTask(this.UserId);
    }else if(n == 1){
      this.taskservice.getImpTask(this.UserId);
    }else{
      this.taskservice.gettask(this.UserId);
    }
  }
}
