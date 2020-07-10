import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  input: string;
  d
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  day: string = "";
  month: string = "";
  date: string = "";
  UserId: string;
  constructor(private taskService: TaskService, private Authservice: AuthService) {
    this.d = new Date();
    this.day += this.days[this.d.getDay()];
    this.month += this.months[this.d.getMonth()];
    this.date += this.d.getDate();
  }

  ngOnInit(): void {
    this.UserId = this.Authservice.getUserId();
  }
  addtsk(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      const tsk:Task = {
        _id: null,
        status: false,
        task: form.value.taskinput,
        important: false,
        timeStamp: this.d.getHours() + ":" + this.d.getMinutes() + ":" + this.d.getSeconds(),
        date: this.day + ", " + this.date + " " + this.month + " " + this.d.getFullYear(),
        userId: this.UserId
      };
      if(this.taskService.gettab() ==='Important'){
        tsk.important = true;
      }
      console.log(tsk);
      this.taskService.addtask(tsk);
    }
    form.reset();
  }

}
