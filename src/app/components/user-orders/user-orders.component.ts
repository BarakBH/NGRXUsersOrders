import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedUserNameAndTotal } from '../../store/orders/orders.selectors';
import { selectLoadingUserDetails, selectSelectedUserDetails } from 'src/app/store/users/users.selectors';

interface UserOrdersVM {
  userName: string | null;
  total: number;
}

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrdersComponent {
  vm$: Observable<UserOrdersVM> = this.store.select(selectSelectedUserNameAndTotal);

  loadingDetails$ = this.store.select(selectLoadingUserDetails);
  details$ = this.store.select(selectSelectedUserDetails);
  
  constructor(private store: Store) { }
}
