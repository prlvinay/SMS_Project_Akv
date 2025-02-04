// import { Component, NgModule,Injectable, OnInit } from '@angular/core';
// import {FormsModule, NgForm, NgModel} from '@angular/forms';
// import { CommonModule, NgIf } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { UserService } from 'src/app/user.service';
// import * as crypto from 'crypto-js'; 
// @Component({
//   selector: 'app-login',
//   imports: [FormsModule,CommonModule,NgIf],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })


// export class LoginComponent implements OnInit{
//   username: any;
//   password: any;
//   remember: any;
//   passwordVisible = false;
//   loginError = '';

//   constructor(private userService: UserService, private router: Router
//   ) {
//   }

//   ngOnInit(): void {
//     if(typeof window!=='undefined' && localStorage){
//       const token=localStorage.getItem('token');
//       if(token){
//         this.router.navigateByUrl('dashboard');
//       }
//     }
//   }
//   onSubmit(form: NgForm) {
//     if (!form.valid) {
//       this.loginError = 'Please fill out the form correctly.';
//       return;
//     }
//     this.userService.login(form.value.username, form.value.password).subscribe({
//       next: (response:any) => {
//         if (typeof window !== 'undefined') {
//           const decryptedResponse = this.decryptPayload(response.data);
//           if(decryptedResponse.token){
//             console.log("No cmg here why ");
//             localStorage.setItem('token', decryptedResponse.token);
//             alert(decryptedResponse.message);
//             form.reset();
//             this.router.navigate(['/dashboard']);
//           }
//           // localStorage.setItem('token', response.token);
//           // alert(response.message);
//           // form.reset();
//           // //console.log("LoggedIn" +this.authService.isLoggedIn);
//           // this.router.navigate(['/dashboard']);
//         } else {
//           console.log('Why');
//           this.loginError = 'Login failed. Token not received.';
//           this.router.navigate(['/register']);
//         }
//       },
//       error: (error) => {
//         this.loginError = error.error.message || 'An error occurred. Please try again.';
//       },
//     });
//   }


//   decryptPayload(encryptedData: string): any {
//     const bytes = crypto.AES.decrypt(encryptedData, 'AkriviaHCM'); // Use the same secret as the backend
//     const decryptedData = bytes.toString(crypto.enc.Utf8);
//     return JSON.parse(decryptedData);  // Return the decrypted data as an object
//   }

//   togglePasswordVisibility() {
//     this.passwordVisible = !this.passwordVisible;
//     const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
//     if (passwordInput) {
//       passwordInput.type = this.passwordVisible ? 'text' : 'password';
//     }
//   }
// }



// // getImgUrl(){
//   //   return 'src/assets/images/logo1.png'
//   // }
//   // getImg: string="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTX_DjnC1X_E_YVzz9dlTC1bxscW3IIPDELZYVTmlh74jxUjJAjr-Rf_DwGARyijeahJt2KsHYbcYURlKyAexG78mc8ENIfy56O5hBqKgIl";
  


//   // userModel=new User("","",true);
//   // onSubmit(form: NgForm) {
//   //   if (form.valid) {
//   //     console.log('Form Submitted!');
//   //     console.log('Username:', this.username);
//   //     console.log('Password:', this.password);
//   //     console.log('Remember Me:', this.remember);
//   //   } else {
//   //     console.log('Form is invalid');
//   //   }
//   // }





import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm, NgModel} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import * as crypto from 'crypto-js'; 
@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})


export class LoginComponent implements OnInit{
  username: any;
  password: any;
  remember: any;
  passwordVisible = false;
  loginError = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if(typeof window!=='undefined' && localStorage){
      const token=localStorage.getItem('token');
      if(token){
        this.router.navigateByUrl('dashboard');
      }
    }
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.loginError = 'Please fill out the form correctly.';
      return;
    }
    this.userService.login(form.value.username, form.value.password).subscribe({
      next: (response:any) => {
        if (typeof window !== 'undefined') {
          const decryptedResponse = response;
          if(decryptedResponse.token){
            localStorage.setItem('token', decryptedResponse.token);
            alert(decryptedResponse.message);
            form.reset();
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.loginError = 'Login failed. Token not received.';
          this.router.navigate(['/register']);
        }
      },
      error: (error) => {
        this.loginError = error.error.message || 'An error occurred. Please try again.';
      },
    });
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.passwordVisible ? 'text' : 'password';
    }
  }
}



// getImgUrl(){
  //   return 'src/assets/images/logo1.png'
  // }
  // getImg: string="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTX_DjnC1X_E_YVzz9dlTC1bxscW3IIPDELZYVTmlh74jxUjJAjr-Rf_DwGARyijeahJt2KsHYbcYURlKyAexG78mc8ENIfy56O5hBqKgIl";
  


  // userModel=new User("","",true);
  // onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     console.log('Form Submitted!');
  //     console.log('Username:', this.username);
  //     console.log('Password:', this.password);
  //     console.log('Remember Me:', this.remember);
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }