import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { loadUsers, setSelectedUser, upsertUser, updateUser } from 'src/app/store/users/users.actions';
import { selectAllUsers, selectSelectedUser } from 'src/app/store/users/users.selectors';
import { User } from 'src/app/models/user.models';
import { loadOrders } from 'src/app/store/orders/orders.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.store.select(selectAllUsers);
  selectedUser$ = this.store.select(selectSelectedUser);

 nameInput = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadOrders());
  }

  selectUser(id: number | null): void {
    this.store.dispatch(setSelectedUser({ userId: id }));
  }

  trackById = (_: number, user: User) => user.id; // trackby helps us for good searcing in big lists - overkill but just to show

  async onUserClick(u: User): Promise<void> {
    this.store.dispatch(setSelectedUser({ userId: u.id }));
    this.nameInput = u.name;
  }

  clearSelection(): void {
    this.store.dispatch(setSelectedUser({ userId: null }));
    this.nameInput = '';
  }

  async save(): Promise<void> {
    const sel = await firstValueFrom(this.selectedUser$);
    const name = this.nameInput.trim();

    if (sel) {
      this.store.dispatch(updateUser({ update: { id: sel.id, changes: { name } } }));
    } 
    else {
      const all = await firstValueFrom(this.users$);
      const nextId = (all.length ? Math.max(...all.map(u => u.id)) : 0) + 1;
      this.store.dispatch(upsertUser({ user: { id: nextId, name } }));
    }

    this.nameInput = '';
  }

}