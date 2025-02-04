import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  imports: [NgFor],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
  navItems = [
    { icon: 'fas fa-th-large' }, // Example icon (FontAwesome)
    { icon: 'fas fa-building' },
    { icon: 'fas fa-thumbs-up' },
    { icon: 'fas fa-users' },
    { icon: 'fas fa-calculator' },
    { icon: 'fas fa-chart-line' },
    { icon: 'fas fa-cloud-upload-alt' }
  ];
}
