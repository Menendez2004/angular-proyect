import { Injectable } from '@angular/core';
import { CanMatch, CanActivate, Router, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    private checkAuthStatus(): boolean | Observable<boolean> {

        return this.authService.checkAuthentication()
            .pipe(
                tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
                tap(isAuthenticated => {
                    if (isAuthenticated) {
                        this.router.navigate(['./'])
                    }
                }),
                map(isAuthenticated => !isAuthenticated)
            )

    }


    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {

        return this.checkAuthStatus();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {


        return this.checkAuthStatus();
    }

}
