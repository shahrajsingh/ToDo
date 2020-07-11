import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';

const BACKEND_URL = environment.apiUrl + "/tasks/";
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskaddedListener = new Subject();
  private completedListener = new Subject();
  tab: String;
  private task: Task[] = [];
  userId: string;
  taskaddedsub() {
    return this.taskaddedListener.asObservable();
  }
  completedListenersub() {
    return this.completedListener.asObservable();
  }
  gettask(userId: string) {
    this.userId = userId;
    this.http.get<{ message: string, task: Task[] }>(BACKEND_URL + userId).subscribe((result) => {

      this.task = result.task;
      this.taskaddedListener.next([...this.task]);
    });
  }

  getMyDayTask(userId: string) {
    this.userId = userId;
    this.http.get<{ message: string, task: Task[] }>(BACKEND_URL + 'md/' + userId).subscribe((result) => {
      this.task = result.task;
      this.taskaddedListener.next([...this.task]);
    });
  }

  getImpTask(userId: string) {
    this.userId = userId;
    this.http.get<{ message: string, task: Task[] }>(BACKEND_URL + 'imp/' + userId).subscribe((result) => {
      this.task = result.task;
      this.taskaddedListener.next([...this.task]);
    });
  }

  addtask(tsk: Task) {

    this.http.post<{ message: string,result:Task }>(BACKEND_URL, tsk).subscribe((res) => {
   
      tsk._id = res.result._id;
      this.task.unshift(tsk);
      this.taskaddedListener.next([...this.task]);
    });
  }

  completeTask(UserId: string, taskId: string, status: boolean) {
    const task = {
      _id: taskId,
      status: status
    }
    if (!status) {
      this.http.put<{ message: string, result }>(BACKEND_URL + 'completetask/' + UserId, task).subscribe((res) => {
        
        if (res.result) {
          this.completedListener.next(true);
        } else {
          this.completedListener.next(false);
        }
      });

    } else {
      this.http.put<{ message: string, result }>(BACKEND_URL + 'uncompletetask/' + UserId, task).subscribe((res) => {
        if (res.result) {
          this.completedListener.next(true);
        } else {
          this.completedListener.next(false);
        }
      });
    }
    const len = this.task.length;
    for (let i = 0; i < len; i++) {
      if (this.task[i]._id == task._id) {
        if (task.status) {
          this.task[i].status = false;
        } else {
          this.task[i].status = true;
        }
        break;
      }
    }
    this.taskaddedListener.next([...this.task]);
  }

  markImportant(UserId: string, taskId: string, imp: boolean) {
    const task = {
      _id: taskId,
      important: imp
    }
    if (imp) {
      this.http.put<{}>(BACKEND_URL + 'nimp/' + UserId, task).subscribe();
    } else {
      this.http.put<{}>(BACKEND_URL + 'imp/' + UserId, task).subscribe();
    }
    const len = this.task.length;
    for (let i = 0; i < len; i++) {
      if (this.task[i]._id == task._id) {
        if (task.important) {
          this.task[i].important = false;
        } else {
          this.task[i].important = true;
        }
        break;
      }
    }
    this.taskaddedListener.next([...this.task]);
  }

  settab(tab: String) {
    this.tab = tab;
  }
  gettab() {
    return this.tab;
  }

  show() {
    this.http.get<{ result }>(BACKEND_URL + 'ctask/' + this.userId).subscribe((res) => {
      if (res.result) {
        this.completedListener.next(true);
      } else {
        this.completedListener.next(false);
      }
    });
  }

  search(query: string) {
    const params={
      userId: this.userId,
      search: query
    }
    this.http.get<{message: string,result:Task[]}>(BACKEND_URL + 'search/'+query+'/'+this.userId).subscribe((res) => {
      if(res.result.length > 0){
        this.task = res.result;
        this.taskaddedListener.next([...this.task]);
      }else{
        alert('No results found');
      }
    });
  }

  delete(task:Task){
      this.http.delete<{message: string}>(BACKEND_URL+'/'+task._id+'/'+task.userId).subscribe((res)=>{
        if(res.message === 'deleted'){
          const len = this.task.length;
          for(let i=0;i<len;i++){
            if(this.task[i]._id == task._id){
              this.task.splice(i,1);
              break;
            }
          }
          this.taskaddedListener.next([...this.task]);
        }else{
          alert('task not deleted');
        }
      });
  }
  constructor(private http: HttpClient) { }
}
