import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ordersAdapter, OrdersState } from './orders.reducer';
import { selectSelectedUser, selectSelectedUserId } from '../users/users.selectors';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

const { selectAll, selectEntities } = ordersAdapter.getSelectors();

export const selectAllOrders = createSelector(selectOrdersState, selectAll);
export const selectOrderEntities = createSelector(selectOrdersState, selectEntities);

export const selectOrdersForSelectedUser = createSelector(
    selectAllOrders,
    selectSelectedUserId,
    (orders, userId) => (userId == null ? [] : orders.filter(o => o.userId === userId))
);


export const selectLoadingOrders = createSelector(
    selectOrdersState,
    s => s.loadingOrders
);

export const selectOrdersError = createSelector(
    selectOrdersState,
    s => s.ordersError
);

export const selectSelectedUserNameAndTotal = createSelector(
    selectSelectedUser,
    selectOrdersForSelectedUser,
    (user, orders) => {
        const total = orders.reduce((sum, o) => sum + o.total, 0);
        return { userName: user ? user.name : null, total };
    }
);
