import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { loadUsers, loadUsersSuccess } from './users.actions';
import { UserService } from 'src/app/services/user.service';


@Injectable()
export class UsersEffects {

    constructor(private actions$: Actions, private userService: UserService) { }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            switchMap(() => this.userService.getUsers().pipe( // switchmap cancel our latest search so perfect for stopping if new arrives
                map((users) => loadUsersSuccess({ users }))
            ))
        )
    );

}
