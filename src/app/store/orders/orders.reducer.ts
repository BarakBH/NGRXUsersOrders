import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/models/order.models';
import { loadOrdersSuccess } from './orders.actions';

export interface OrdersState extends EntityState<Order> { }

export const ordersAdapter = createEntityAdapter<Order>({ selectId: o => o.id });

export const initialState: OrdersState = ordersAdapter.getInitialState();

export const ordersReducer = createReducer(
    initialState,
    on(loadOrdersSuccess, (state, { orders }) => ordersAdapter.setAll(orders, state)),
);
