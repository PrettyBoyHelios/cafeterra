import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import { AngularFireAuth } from "@angular/fire/auth";
import { isNullOrUndefined } from 'util';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const currentUser = this.authService.isLoggedIn;
      if (currentUser && this.authService.isVerified) {
          // authorised so return true
          return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/tabs/profile']);
      return false;
  }
}