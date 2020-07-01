import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  addtask(tsk: { userId: String; status: boolean; task_name: any; important: boolean; timeStamp: string; date: string; index: any; }) {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
