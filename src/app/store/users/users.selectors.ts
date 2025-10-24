import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersAdapter, UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectAllUsers = createSelector(
    selectUsersState,
    selectAll
);

export const selectUserEntities = createSelector(
    selectUsersState,
    selectEntities
);

export const selectSelectedUserId = createSelector(selectUsersState, s => s.selectedUserId);
export const selectSelectedUser = createSelector(
    selectUserEntities,
    selectSelectedUserId,
    (entities, id) => (id != null ? entities[id] ?? null : null)
);

export const selectSelectedUserDetails = createSelector(
    selectUsersState,
    s => s.selectedUserDetails
);

export const selectLoadingUserDetails = createSelector(
    selectUsersState,
    s => s.loadingUserDetails
);

export const selectUserDetailsError = createSelector(
    selectUsersState,
    s => s.userDetailsError
);