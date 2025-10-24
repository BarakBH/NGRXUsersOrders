import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { loadOrders, loadOrdersSuccess } from './orders.actions';
import { OrderService } from 'src/app/services/order.service';

@Injectable()
export class OrdersEffects {
    loadOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOrders),
            switchMap(() => this.orderService.getOrders()
                .pipe(
                    map(orders => loadOrdersSuccess({ orders }))
                )
            )
        )
    );

    constructor(private actions$: Actions, private orderService: OrderService) { }
}
