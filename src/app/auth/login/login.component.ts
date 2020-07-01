import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: Boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 1000);
  }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    } else {

      this.authService.login(form.value.email, form.value.password);
    }
  }

}
