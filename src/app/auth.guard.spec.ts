import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy },
      ],
    });
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access when logged in', () => {
    localStorage.setItem('isLoggedIn', 'true');
    expect(authGuard.canActivate()).toBeTrue();
  });

  it('should deny access and redirect when not logged in', () => {
    localStorage.removeItem('isLoggedIn');
    expect(authGuard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});