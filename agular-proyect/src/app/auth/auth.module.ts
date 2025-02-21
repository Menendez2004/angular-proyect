import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
    declarations: [
        RegisterPageComponent,
        LoginPageComponent,
        LayoutPageComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        RouterModule,
    ]
        
})
export class AuthModule { }
