import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CanActivate, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  public canActivate(): Promise<boolean> {
    const that = this;
    return new Promise<boolean>((resolve, reject) => {
      if (!that.auth.isAuthenticated()) {
        that.auth.refresh().subscribe((response: any) => {
          if (response.access_token) {
            localStorage.setItem('access_token', response.access_token);
          }
          return that.auth.isAuthenticated();
        });
      }
      resolve(true);
    });
    // if (!this.auth.isAuthenticated()) {
    //   return this.auth.refresh().pipe(
    //     map((response) => {
    //       if (response.access_token) {
    //         localStorage.setItem('access_token', response.access_token);
    //       }
    //       return true;
    //     }),
    //     catchError((err) => {
    //       this.router.navigate(['/sign-in']);
    //       return of(false);
    //     })
    //   );
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['sign-in']);
    //   return false;
    // }
    // }
    // of(true);
  }

}
