import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl + "/users/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private token: string;
  private userId: string;
  private tokenTimer: any;
  constructor(private http: HttpClient, private router: Router) { }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getToken() {
    return this.token;
  }

  getuserdata(): Observable<{ name: string, email: string }> {
    return this.http.get<{ name: string, email: string }>(BACKEND_URL+"getuser/" + this.userId);
  }
  autoAuthUser() {

    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  signup(name: string, email: string, pass: string, ques: string, ans: string) {
  
    const authData = { name: name, email: email, password: pass,question: ques,answer: ans };
    this.http.post<{ message: string }>(BACKEND_URL + "", authData).subscribe(
      (res) => {
       
        this.router.navigate(["/"]);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  
  }

  login(email: string, pass: string) {
    const authData: AuthData = { email: email, password: pass };
    this.http.post<{ token: string; expiresIn: number; userId: string; message: string }>(
      BACKEND_URL + "/login", authData
    )
      .subscribe(
        res => {
          const token = res.token;
          this.token = token;
          if (token) {
            const expiresInDuration = res.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = res.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(["/app"]);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  updateinfo(name: string, email: string, ques: string, ans: string) {
    const body = {
      name: name,
      email: email,
      question: ques,
      answer: ans
    }
    this.http.put<{ message: string, result: number }>(BACKEND_URL + this.userId, body).subscribe((res) => {
      if (res.result != 0) {
        this.router.navigate(['/app']);
      } else if (res.result == 0) {
        alert('no data has been updated!');
      } else {
        alert('error occured! try after some time');
      }
    });
  }
  verify(name:string,email: string,secret: string):Observable<{result}>{
    return this.http.get<{result}>(BACKEND_URL+name+'/'+email+'/'+secret);
  }

  changepass(a:string,email:string){
    const body={
      a: a,
      email: email
    }
    this.http.put<{result}>(BACKEND_URL,body).subscribe((res)=>{
  
      if(res.result > 0){
        alert('password change successful');
        this.router.navigate(['']);
      }else if(res.result == 0){
        alert('old password cannot be your new password');
      }else{
        alert('error occured');
      }
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private setAuthTimer(expiresInDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    },
      expiresInDuration * 1000
    );
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
  account() {
    this.router.navigate(['/account', this.userId]);
  }
}
