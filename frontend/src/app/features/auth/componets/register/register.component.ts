// import { CommonModule, NgIf } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserService } from 'src/app/user.service';
// import * as crypto from 'crypto-js';
// @Component({
//   selector: 'app-register',
//   imports: [ReactiveFormsModule,ReactiveFormsModule,CommonModule,FormsModule,NgIf],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss'
// })


// export class RegisterComponent {
//   regForm!: FormGroup;

//   constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
//     this.initiateForm();
//   }
//   decryptPayload(encryptedData: string): any {
//     const bytes = crypto.AES.decrypt(encryptedData, 'AkriviaHCM'); // Same secret used in backend
//     const decryptedData = bytes.toString(crypto.enc.Utf8);
//     return JSON.parse(decryptedData);  // Return the decrypted data as an object
//   }
//   initiateForm() {
//     this.regForm = this.fb.group({
//       username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z.*]')]),
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

//   get UserName(): FormControl {
//     return this.regForm.get('username') as FormControl;
//   }
//   get Email(): FormControl {
//     return this.regForm.get('email') as FormControl;
//   }
//   get Phone(): FormControl {
//     return this.regForm.get('phone') as FormControl;
//   }
//   get Pass(): FormControl {
//     return this.regForm.get('password') as FormControl;
//   }

//   onSubmit() {
//     const formData = this.regForm.value;

//     this.userService.register(formData).subscribe({
//       next: (response:any) => {
//         console.log("hey"+response.data);
//         const decryptedResponse=this.decryptPayload(response.data);
//         //console.log('User registered successfully', response);
//         console.log('Decrypted response:', decryptedResponse);
//         this.router.navigate(['/login']);
//       },
//       error: (error) => {
//         console.error('Error registering user', error);
//       },
//     });
//   }
// }


import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import * as crypto from 'crypto-js';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,ReactiveFormsModule,CommonModule,FormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {
  regForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.initiateForm();
  }
  decryptPayload(encryptedData: string): any {
    const bytes = crypto.AES.decrypt(encryptedData, 'AkriviaHCM'); 
    const decryptedData = bytes.toString(crypto.enc.Utf8);
    return JSON.parse(decryptedData);  
  }
  initiateForm() {
    this.regForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z.*]')]),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get UserName(): FormControl {
    return this.regForm.get('username') as FormControl;
  }
  get Email(): FormControl {
    return this.regForm.get('email') as FormControl;
  }
  get Phone(): FormControl {
    return this.regForm.get('phone') as FormControl;
  }
  get Pass(): FormControl {
    return this.regForm.get('password') as FormControl;
  }

  onSubmit() {
    const formData = this.regForm.value;

    this.userService.register(formData).subscribe({
      next: (response:any) => {
        //console.log("hey"+response.data);
        //const decryptedResponse=response.message;
        //console.log('User registered successfully', response);
        console.log('Decrypted response:', response.message);

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user', error);
      },
    });
  }
}

