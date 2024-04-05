import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';
import { TripStore } from '../main/trip-main/trip.store';
import { map, switchMap, take, withLatestFrom } from 'rxjs';

export const canViewTripGuard: CanActivateChildFn = (childRoute, state) => {
  // console.log(childRoute, state)
  const authStore = inject(AuthStore)
  // const tripStore = inject(TripStore)
  const router = inject(Router)
  return true;
};
