import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUsers, setSelectedUser } from 'src/app/store/users/users.actions';
import { selectAllUsers, selectSelectedUser } from 'src/app/store/users/users.selectors';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.store.select(selectAllUsers);
  selectedUser$ = this.store.select(selectSelectedUser);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  selectUser(id: number | null): void {
    this.store.dispatch(setSelectedUser({ userId: id }));
  }

  trackById = (_: number, user: User) => user.id; //trackby helps us for good searcing in big lists - overkill but just to show
}