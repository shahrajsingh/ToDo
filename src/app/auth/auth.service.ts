import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
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

  autoAuthUser() {
    console.log('autoauth');
    const authInformation = this.getAuthData();
    console.log(authInformation);
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

  signup(name: string, email: string, pass: string) {
    const authData = { name: name, email: email, password: pass };
    this.http.post<{ message: string }>(BACKEND_URL + "", authData).subscribe(
      (res) => {
        console.log(res.message);
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

}
