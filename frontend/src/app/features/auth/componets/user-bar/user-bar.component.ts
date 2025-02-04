import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-user-bar',
  imports: [],
  templateUrl: './user-bar.component.html',
  styleUrl: './user-bar.component.scss'
})
export class UserBarComponent {
  user: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
    this.userService.getUserDetails().subscribe({
      next:(data) => {
        this.user = data;
        //console.log(this.user?.name);
      },
      error:(error) => {
        console.error('Error fetching user details:', error);
      }
  });
}else{
  console.warn('localStorage is not available.');
}
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }
  
}
