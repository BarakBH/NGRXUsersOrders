import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/models/order.models';
import { loadOrders, loadOrdersSuccess, loadOrdersFailure } from './orders.actions';

export interface OrdersState extends EntityState<Order> {
    loadingOrders: boolean;
    ordersError: string | null;
}

export const ordersAdapter = createEntityAdapter<Order>({ selectId: o => o.id });

export const initialState: OrdersState = ordersAdapter.getInitialState({
    loadingOrders: false,
    ordersError: null
});

export const ordersReducer = createReducer(
    initialState,
    on(loadOrders, (state) => ({ ...state, loadingOrders: true, ordersError: null })),
    on(loadOrdersSuccess, (state, { orders }) => ordersAdapter.setAll(orders, { ...state, loadingOrders: false })),
    on(loadOrdersFailure, (state, { error }) => ({ ...state, loadingOrders: false, ordersError: error }))
);
