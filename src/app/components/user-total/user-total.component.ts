import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-total',
  templateUrl: './user-total.component.html',
  styleUrls: ['./user-total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTotalComponent {
  @Input({ required: true }) total!: number;
}
