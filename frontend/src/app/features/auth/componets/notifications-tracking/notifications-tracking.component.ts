import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-tracking',
  imports: [NgFor],
  templateUrl: './notifications-tracking.component.html',
  styleUrl: './notifications-tracking.component.scss'
})
export class NotificationsTrackingComponent {
  notifications = [
    { date: '21.08.2023', message: 'Hi ' },
    { date: '21.08.2023', message: 'You have a message from Vinay' },
    { date: '21.08.2023', message: 'Last login at 12 Dec 2024 13:23:44 am' },
  ];

  trackingHistory = [
    { date: '21.08.2023', title: 'Profile Update', description: 'Name changed "PRL Vinay" to "Vinay"' },
    { date: '21.08.2023', title: 'Profile description Update', description: 'Profile description update by UserName' },
    { date: '21.08.2023', title: 'Data Created', description: 'New user created' },
  ];
}
