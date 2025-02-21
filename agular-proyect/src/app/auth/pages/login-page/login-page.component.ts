import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  standalone: false,
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  
  @Input() email = '';
  @Input() password = '';

  onLogin(): void {

    this.authService.login(this.email,this.password)
      .subscribe( user => {

        this.router.navigate(['/']);

      });

  }

}
