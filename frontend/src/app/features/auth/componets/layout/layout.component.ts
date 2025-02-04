import { Component } from '@angular/core';
import { UserBarComponent } from '../user-bar/user-bar.component';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [SideNavigationComponent,RouterOutlet,UserBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
