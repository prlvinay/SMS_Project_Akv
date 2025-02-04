import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-module-cards',
  imports: [NgFor,NgStyle],
  templateUrl: './module-cards.component.html',
  styleUrl: './module-cards.component.scss'
})
export class ModuleCardsComponent {
  cards = [
    { title: 'App Settings', description: 'Customise the app.', color: 'lightblue' },
    { title: 'Attendance', description: 'Monitor and manage student attendance records.', color: 'lightgreen' },
    { title: 'Grades', description: 'Record and analyze student performance.', color: 'lightcoral' },
    { title: 'Courses', description: 'Manage courses and schedules.',  color: 'lightpink' },
    { title: 'Fees', description: 'Track and process fee payments.',  color: 'lightgray' },
    { title: 'Notifications', description: 'Send and manage notifications.', color: 'lightyellow' },
  ];
}
