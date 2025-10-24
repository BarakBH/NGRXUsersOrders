import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/models/order.models';

export const loadOrders = createAction('[Orders] Load Orders');

export const loadOrdersSuccess = createAction(
    '[Orders] Load Orders Success',
    props<{ orders: Order[] }>()
);
