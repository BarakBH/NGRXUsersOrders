import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsers(): Observable<User[]> {
    return of([
      { id: 1, name: 'Barak' },
      { id: 2, name: 'Ben' },
      { id: 3, name: 'Noa' }
    ]).pipe(
      delay(600) // I want to stimulate like api call so a lil bit of delay
    );
  }
}
