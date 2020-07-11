import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading: Boolean;
  mode = 'create';
  name:string;
  email:string;
  disabeled: boolean = false;
  questions: string[] = ['What was you childhood name?',
  'What was the name of your first pet?',
  'What was the name of city you were born in?'  
];
  question = new FormControl('', Validators.required);
  constructor(private authService: AuthService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 1300);
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('userId')){
        this.mode = 'edit';
        this.disabeled = true;
        this.authService.getuserdata().subscribe( (res)=>{
     
          this.email = res.email;
          this.name = res.name;
        });
      }else if(paramMap.has('user')){
        this.mode = 'reset';
      }
    });

  }
  signup(form: NgForm) {
    if (form.invalid) {
      return;
    } else if(this.mode === 'create') {
      this.authService.signup(form.value.name, form.value.email, form.value.password,this.question.value,form.value.quest);
    }else if(this.mode === 'edit'){
      this.authService.updateinfo(form.value.name, form.value.email,this.question.value,form.value.quest);
    }else if( this.mode === 'reset'){
      this.authService.verify(form.value.name,form.value.email,form.value.quest).subscribe((res)=>{
        
        if(res.result){
          this.email=res.result.email
         this.mode = 'change';
        }else{
          alert('incorrect details');
        }
      })
    }

  }

  resetpassword(form: NgForm){
    if(form.invalid){
      return;
    }else if(form.value.newpass != form.value.confirm){
      alert('passwords dont match.Please try again');
      return;
    }else{
      this.authService.changepass(form.value.newpass,this.email);
    }
  }

}
