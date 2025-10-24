import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadUsers, loadUsersSuccess, loadUsersFailure, setSelectedUser, loadUserDetails, loadUserDetailsSuccess, loadUserDetailsFailure } from './users.actions';
import { UserService } from 'src/app/services/user.service';
import { EMPTY, of } from 'rxjs';


@Injectable()
export class UsersEffects {

    constructor(private actions$: Actions, private userService: UserService) { }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            switchMap(() => this.userService.getUsers().pipe( // switchmap cancel our latest search so perfect for stopping if new arrives
                map((users) => loadUsersSuccess({ users })),
                catchError((error) => of(loadUsersFailure({ error: 'Failed to load users' })))
            ))
        )
    );

    selectionChanges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setSelectedUser),
            switchMap(({ userId }) => {
                if (userId == null) {
                    return EMPTY;
                }
                return of(loadUserDetails({ userId }));
            })
        )
    );


    fetchDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUserDetails),
            // switchMap cancels the previous in-flight call when a new loadUserDetails arrives
            switchMap(({ userId }) =>
                this.userService.getUserDetails(userId).pipe(
                    map(details => loadUserDetailsSuccess({ details })),
                    catchError(() => of(loadUserDetailsFailure({ error: 'Failed to load user details' })))
                )
            )
        )
    );

}
