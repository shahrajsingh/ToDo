import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService } from '../auth/auth.service';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: Boolean;
  constructor(private authService:AuthService,private taskService:TaskService) { }

  ngOnInit(): void {
    this.isAuth = true;
  }
  
  onSearch(form: NgForm){
    if(form.invalid){
      return;
    }
    this.taskService.search(form.value.search);
    form.reset();
  }
  logout(){
    this.authService.logout();
  }
  account(){
    this.authService.account();
  }
}
