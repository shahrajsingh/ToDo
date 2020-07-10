import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + "/tasks/";
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskaddedListener = new Subject();
  tab: String;
  private task: Task[] = [];
  userId: string;
  taskaddedsub() {
    return this.taskaddedListener.asObservable();
  }

  gettask(userId: string) {
    this.userId = userId;
    this.http.get<{ message: string, task: Task[] }>(BACKEND_URL + userId).subscribe((result) => {
      console.log(result);
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
    console.log(tsk);
    this.http.post<{ message: string }>(BACKEND_URL, tsk).subscribe((res) => {
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
      this.http.put<{ message: string }>(BACKEND_URL + 'completetask/' + UserId, task).subscribe((res) => {
        console.log(res.message);
      });

    } else {
      this.http.put<{ message: string }>(BACKEND_URL + 'uncompletetask/' + UserId, task).subscribe((res) => {
        console.log(res.message)
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

  show(): Observable<{result: any}> {
    return this.http.get<{ result }>(BACKEND_URL + 'ctask/' + this.userId);
  }
  constructor(private http: HttpClient) { }
}
