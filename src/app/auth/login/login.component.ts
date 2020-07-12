import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task/task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: Boolean;
  temp = 'changepass';
  constructor(private authService: AuthService, private router: Router, private taskservice: TaskService) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 1300);
    if (this.authService.getIsAuth()) {
      this.router.navigate(['/app']);
    }
  }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    } else {

      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (form.value.email.match(mailformat)) {
        this.authService.login(form.value.email, form.value.password);
      } else {
        alert('invalid mail');
        form.reset();
        return;
      }

    }
  }
  guest() {
    this.taskservice.setlogin(false);
    alert('only task add and complete functionality is provided.All data will be lost on window refresh!' +
      'please signup for proper experience');
    this.router.navigate(['/guest']);
  }

}
