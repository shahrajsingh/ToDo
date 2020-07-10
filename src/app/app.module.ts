import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/auth.guard'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { TaskCreateComponent } from './task/task-create/task-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppcontainerComponent } from './appcontainer/appcontainer.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { AuthService } from './auth/auth.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    TaskCreateComponent,
    LoginComponent,
    SignupComponent,
    AppcontainerComponent,
    TaskListComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
