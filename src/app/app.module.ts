import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { usersReducer } from './store/users/users.reducer';
import { UsersEffects } from './store/users/users.effects';
import { ordersReducer } from './store/orders/orders.reducer';
import { OrdersEffects } from './store/orders/orders.effects';


import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserNameComponent } from './components/user-name/user-name.component';
import { UserTotalComponent } from './components/user-total/user-total.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserOrdersComponent,
    UserNameComponent,
    UserTotalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    StoreModule.forRoot({
      users: usersReducer,
      orders: ordersReducer
    }, {}),
    EffectsModule.forRoot([
      UsersEffects,
      OrdersEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), trace: true, traceLimit: 25 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
