import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User, UserDetails } from '../models/user.models';
import { API_DELAYS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsers(): Observable<User[]> {
    return of([
      { id: 1, name: 'Barak' },
      { id: 2, name: 'Ben' },
      { id: 3, name: 'hamo' }
    ]).pipe(
      delay(API_DELAYS.USERS) // I want to stimulate like api call so a lil bit of delay
    );
  }

  getUserDetails(userId: number): Observable<UserDetails> {
    // simulate variable latency to make cancellation visible
    const mock: Record<number, UserDetails> = {
      1: { id: 1, email: 'barak@example.com', phone: '050-4545445', address: 'Jerusalem' },
      2: { id: 2, email: 'ben@example.com', phone: '050-2014041', address: 'Tel-Aviv' },
      3: { id: 3, email: 'hamo@example.com', phone: '054-5045050', address: 'Ramat-Gan' }
    };

    return of(mock[userId] ?? { id: userId, email: 'n/a', phone: 'n/a', address: 'n/a' })
      .pipe(
        delay(API_DELAYS.USER_DETAILS)//i think its long enough to show cancelation although its clearly switchmap job
      );
  }

}
