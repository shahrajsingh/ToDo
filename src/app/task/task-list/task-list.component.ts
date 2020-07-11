import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  show: boolean = false;
  showcompletedheader: boolean;
  tasksub = new Subscription();
  completedsub = new Subscription();
  audio
  constructor(private taskService: TaskService) {
    this.audio = new Audio();
    this.audio.src = "../Completed.wav";
    this.audio.load();
  }

  ngOnInit(): void {
    this.tasksub = this.taskService.taskaddedsub().subscribe((res: Task[]) => {
      this.tasks = res;
    });

    this.completedsub = this.taskService.completedListenersub().subscribe((res: boolean) => {
      if (res) {
        this.showcompletedheader = res;
      } else {
        this.showcompletedheader = res;
        this.show = false;
      }
    });
    this.taskService.show();



  }

  markImortant(task: Task) {
    this.taskService.markImportant(task.userId, task._id, task.important);
  }

  completeTask(task: Task) {
    if(!task.status){
      this.audio.play();
    }
    this.taskService.completeTask(task.userId, task._id, task.status);

  }

  showcompletedtask() {
    if (this.show) {
      this.show = false;
      document.getElementById("arrow").style.transform = "rotate(0deg)";
      document.getElementById('arrow').style.padding = "14px 0px 0px 0px";
    } else {
      this.show = true;
      document.getElementById("arrow").style.transform = "rotate(90deg)";
      document.getElementById('arrow').style.padding = "0px 0px 0px 14px";
    }
  }

  delete(task){
    this.taskService.delete(task);
  }
  ngOnDestroy() {
    this.tasksub.unsubscribe();
    this.completedsub.unsubscribe();
  }


}
