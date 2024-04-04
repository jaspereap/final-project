import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AuthStore } from '../auth/auth.store';
import { map, take } from 'rxjs';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authStore = inject(AuthStore)
  const router = inject(Router)
  return authStore.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['auth/login']);
        return false;
      }
      return true;
    })
  )
};
