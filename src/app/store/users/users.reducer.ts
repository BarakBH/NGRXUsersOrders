import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.models';
import { loadUsersSuccess, setSelectedUser } from './users.actions';

export interface UsersState extends EntityState<User> {
    selectedUserId: number | null;
}

export const usersAdapter = createEntityAdapter<User>({ // (O(1) search)
    selectId: (u) => u.id
});

export const initialState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null,
});

export const usersReducer = createReducer(
    initialState,
    on(loadUsersSuccess, (state, { users }) => usersAdapter.setAll(users, state)),
    on(setSelectedUser, (state, { userId }) => ({
        ...state,
        selectedUserId: userId
    }))
);
