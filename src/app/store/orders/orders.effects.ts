import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { loadOrders, loadOrdersSuccess, loadOrdersFailure } from './orders.actions';
import { OrderService } from 'src/app/services/order.service';
import { of } from 'rxjs';

@Injectable()
export class OrdersEffects {
    loadOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOrders),
            switchMap(() => this.orderService.getOrders()
                .pipe(
                    map(orders => loadOrdersSuccess({ orders })),
                    catchError((error) => of(loadOrdersFailure({ error: 'Failed to load orders' })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private orderService: OrderService) { }
}
