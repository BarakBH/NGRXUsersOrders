import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User, UserDetails } from 'src/app/models/user.models';
import { loadUsersSuccess, setSelectedUser, upsertUser, updateUser, deleteUser, loadUserDetails, loadUserDetailsSuccess, loadUserDetailsFailure } from './users.actions';

export interface UsersState extends EntityState<User> {
    selectedUserId: number | null;
    selectedUserDetails: UserDetails | null;
    loadingUserDetails: boolean;
    userDetailsError: string | null;
}

export const usersAdapter = createEntityAdapter<User>({ // (O(1) search)
    selectId: (u) => u.id
});

export const initialState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null,
    selectedUserDetails: null,
    loadingUserDetails: false,
    userDetailsError: null
});


export const usersReducer = createReducer(
    initialState,

    // load
    on(loadUsersSuccess, (state, { users }) => usersAdapter.setAll(users, state)),

    // select
    on(setSelectedUser, (state, { userId }) => ({
        ...state,
        selectedUserId: userId,
        // clear details when selection changes or clears
        selectedUserDetails: null,
        loadingUserDetails: !!userId, // show spinner only when not null
        userDetailsError: null
    })),

    // CRUD
    on(upsertUser, (state, { user }) => usersAdapter.upsertOne(user, state)),
    on(updateUser, (state, { update }) => usersAdapter.updateOne(update, state)),
    on(deleteUser, (state, { id }) => usersAdapter.removeOne(id, state)),

    on(loadUserDetails, (state) => ({
        ...state,
        loadingUserDetails: true,
        userDetailsError: null
    })),
    on(loadUserDetailsSuccess, (state, { details }) => ({
        ...state,
        selectedUserDetails: details,
        loadingUserDetails: false
    })),
    on(loadUserDetailsFailure, (state, { error }) => ({
        ...state,
        userDetailsError: error,
        loadingUserDetails: false
    }))

);
