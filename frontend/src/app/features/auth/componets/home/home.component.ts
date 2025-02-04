import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  router=inject(Router)
  goToRegister():void{
  this.router.navigate(['register']);
}
goToLog():void{
  this.router.navigate(['login']);
}


}
