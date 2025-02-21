import { Component } from '@angular/core';
import { action } from '@storybook/addon-actions';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-auth-service-mock',
  template: `
    <div style="padding: 20px; border: 1px solid #ddd; width: 300px;">
      <h3>AuthService Storybook</h3>
      <p *ngIf="user">Logged in as: {{ user?.email }}</p>
      <button (click)="onLogin()">Login</button>
      <button (click)="onCheckAuth()">Check Auth</button>
      <button (click)="onLogout()">Logout</button>
    </div>
  `,
})
export class AuthServiceMockComponent {
  user: any;

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login('test@example.com', 'password').subscribe(user => {
      this.user = user;
      action('Login Called')(user);
    });
  }

  onCheckAuth() {
    this.authService.checkAuthentication().subscribe(isAuthenticated => {
      action('Check Auth Called')(isAuthenticated);
    });
  }

  onLogout() {
    this.authService.logout();
    this.user = undefined;
    action('Logout Called')();
  }
}
