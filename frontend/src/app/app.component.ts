import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthentication();
    this.router.events.subscribe(() => {
      this.checkAuthentication();
    });
  }


  checkAuthentication() {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token');
      this.isAuthenticated = !!token;
    }
    // else{
    //   console.warn('localStorage is not available.');
    // }
  }
}
