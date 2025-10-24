import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.models';

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
