import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadUsers, setSelectedUser, upsertUser, updateUser } from 'src/app/store/users/users.actions';
import { selectAllUsers, selectSelectedUser, selectLoadingUsers, selectUsersError } from 'src/app/store/users/users.selectors';
import { User } from 'src/app/models/user.models';
import { loadOrders } from 'src/app/store/orders/orders.actions';
import { VALIDATION_RULES } from 'src/app/constants/api.constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.store.select(selectAllUsers);
  selectedUser$ = this.store.select(selectSelectedUser);
  loadingUsers$ = this.store.select(selectLoadingUsers);
  usersError$ = this.store.select(selectUsersError);

 nameInput = '';

  constructor(private store: Store, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Show loading notification
    this.snackBar.open(
      'Loading users and orders...',
      'Close',
      { 
        duration: 2000, 
        panelClass: ['info-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'center'
      }
    );
    
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadOrders());
    
    // Subscribe to error states and show snackbars
    this.usersError$.subscribe(error => {
      if (error) {
        this.snackBar.open(
          `Error loading users: ${error}`,
          'Close',
          { 
            duration: 4000, 
            panelClass: ['error-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'center'
          }
        );
      }
    });
  }

  selectUser(id: number | null): void {
    this.store.dispatch(setSelectedUser({ userId: id }));
  }

  trackById = (_: number, user: User) => user.id; // trackby helps us for good searcing in big lists - overkill but just to show

  async onUserClick(u: User): Promise<void> {
    this.store.dispatch(setSelectedUser({ userId: u.id }));
    this.nameInput = u.name;
    this.snackBar.open(
      `Selected user: ${u.name}`,
      'Close',
      { 
        duration: 1500, 
        panelClass: ['info-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'center'
      }
    );
  }

  clearSelection(): void {
    this.store.dispatch(setSelectedUser({ userId: null }));
    this.nameInput = '';
    this.snackBar.open(
      'Selection cleared',
      'Close',
      { 
        duration: 1500, 
        panelClass: ['info-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'center'
      }
    );
  }

  async save(): Promise<void> {
    const sel = await firstValueFrom(this.selectedUser$);
    const name = this.nameInput.trim();

    // Input validation
    if (!name || name.length < VALIDATION_RULES.MIN_NAME_LENGTH) {
      this.snackBar.open(
        `Name must be at least ${VALIDATION_RULES.MIN_NAME_LENGTH} characters long`,
        'Close',
        { 
          duration: 3000, 
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center'
        }
      );
      return;
    }

    if (name.length > VALIDATION_RULES.MAX_NAME_LENGTH) {
      this.snackBar.open(
        `Name must be less than ${VALIDATION_RULES.MAX_NAME_LENGTH} characters`,
        'Close',
        { 
          duration: 3000, 
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center'
        }
      );
      return;
    }

    if (sel) {
      this.store.dispatch(updateUser({ update: { id: sel.id, changes: { name } } }));
      this.snackBar.open(
        `User "${name}" updated successfully!`,
        'Close',
        { 
          duration: 2000, 
          panelClass: ['success-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center'
        }
      );
    } 
    else {
      const all = await firstValueFrom(this.users$);
      const nextId = (all.length ? Math.max(...all.map(u => u.id)) : 0) + 1;
      this.store.dispatch(upsertUser({ user: { id: nextId, name } }));
      this.snackBar.open(
        `User "${name}" added successfully!`,
        'Close',
        { 
          duration: 2000, 
          panelClass: ['success-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center'
        }
      );
    }

    this.nameInput = '';
  }

}