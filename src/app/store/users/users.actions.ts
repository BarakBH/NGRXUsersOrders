import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User, UserDetails } from 'src/app/models/user.models';

export const loadUsers = createAction(
    '[Users] Load Users'
);

export const loadUsersSuccess = createAction(
    '[Users] Load Users Success',
    props<{ users: User[] }>()
);

export const setSelectedUser = createAction(
    '[Users] Set Selected User',
    props<{ userId: number | null }>()
);

export const upsertUser = createAction(
    '[Users] Upsert User',
    props<{ user: User }>()
);

export const updateUser = createAction(
    '[Users] Update User',
    props<{ update: Update<User> }>() // { id, changes }
);

export const deleteUser = createAction(
    '[Users] Delete User',
    props<{ id: number }>()
);

export const loadUserDetails = createAction(
  '[Users] Load User Details',
  props<{ userId: number }>()
);

export const loadUserDetailsSuccess = createAction(
  '[Users] Load User Details Success',
  props<{ details: UserDetails }>()
);

export const loadUserDetailsFailure = createAction(
  '[Users] Load User Details Failure',
  props<{ error: string }>()
);