import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';
import { TripStore } from '../main/trip-main/trip.store';
import { Observable, map, of, switchMap, take, withLatestFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserDTO } from '../models/dtos';
import { LocalStorageService } from '../shared/services/local-storage.service';

export const canViewTripGuard: CanActivateChildFn = (childRoute, state) => {
  const authSvc = inject(AuthService)
  const router = inject(Router)
  const localStore = inject(LocalStorageService)
  const tripId = childRoute.params['tripId'];
  const currentUserId = localStore.getUserId();
  
  return authSvc.checkIsAllowed(tripId, currentUserId.toString()).pipe(
    switchMap( isAllowed => {
      // Check if currentUserId is in the list of allowed user IDs
      if (isAllowed) {
        return of(true);
      } else {
        return router.navigate(['/home']);
      }
    })
  );
};
