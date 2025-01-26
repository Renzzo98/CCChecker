import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(username: string, password: string): boolean {
    // In production, this should be an API call
    if (username === 'admin' && password === 'admin123') {
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
  }
} 