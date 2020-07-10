import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  show: boolean = false;
  showcompletedheader: boolean;
  tasksub = new Subscription();
  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.tasksub = this.taskService.taskaddedsub().subscribe((res: Task[]) => {
      this.tasks = res;
    });
    
    this.taskService.show().subscribe((res)=>{
      if(res.result){
        this.showcompletedheader = true;
      }else{
        this.showcompletedheader = false;
      }
    });
    
  }

  markImortant(task: Task) {

    this.taskService.markImportant(task.userId, task._id, task.important);

  }

  completeTask(task: Task) {
    this.showcompletedheader = true;
    this.taskService.completeTask(task.userId, task._id, task.status);
    this.taskService.show().subscribe((res)=>{
      if(res.result){
        this.showcompletedheader = true;
      }else{
        this.showcompletedheader = false;
      }
    });
  }

  showcompletedtask(){
    if(this.show){
      this.show = false;
      document.getElementById("arrow").style.transform = "rotate(0deg)";
      document.getElementById('arrow').style.padding= "14px 0px 0px 0px";
    }else{
      this.show = true;
      document.getElementById("arrow").style.transform = "rotate(90deg)";
      document.getElementById('arrow').style.padding= "0px 0px 0px 14px";
    }
  }

  

}
