import { Component } from '@angular/core';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { ModuleCardsComponent } from '../module-cards/module-cards.component';
import { NotificationsTrackingComponent } from '../notifications-tracking/notifications-tracking.component';

@Component({
  selector: 'app-dashboard',
  imports: [HeroSectionComponent,ModuleCardsComponent,NotificationsTrackingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
