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
      console.log('firing login request');
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(form.value.email.match(mailformat)){
        this.authService.login(form.value.email, form.value.password);
      }else{
        alert('invalid mail');
        form.reset();
        return;
      }
      
    }
  }

}
