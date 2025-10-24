import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Order } from '../models/order.models';
import { API_DELAYS } from '../constants/api.constants';

@Injectable({ providedIn: 'root' })
export class OrderService {
  getOrders(): Observable<Order[]> {
    return of([// mock data to our other mock data
      { id: 101, userId: 1, total: 120 },
      { id: 102, userId: 1, total: 80 },
      { id: 103, userId: 2, total: 50 },
      { id: 104, userId: 2, total: 300 },
      { id: 105, userId: 3, total: 200 },
      { id: 106, userId: 3, total: 70 },
    ]).pipe(
      delay(API_DELAYS.ORDERS)  // simulate api call
    );
  }
}
