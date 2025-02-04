// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';
// import { map } from 'rxjs/operators';
// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private apiUrl = 'http://localhost:3000';
//   private encryptionKey = 'AkriviaHCM';

//   constructor(private http: HttpClient) {}

//   encryptPayload(payload: any): string {
//     return CryptoJS.AES.encrypt(JSON.stringify(payload), this.encryptionKey).toString();
//   }

//   decryptPayload(encryptedPayload: string): any {
//     const bytes = CryptoJS.AES.decrypt(encryptedPayload, this.encryptionKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   }

//   login(username: string, password: string) {
//     const loginData = { username, password };
//     const encryptedData = this.encryptPayload(loginData); 

//     return this.http.post<{ message: string; token?: string }>(
//       `${this.apiUrl}/user/login`,
//       { data: encryptedData } 
//     );
//   }

//   register(formData: any) {
//     const encryptedData = this.encryptPayload(formData); 
//     return this.http.post(`${this.apiUrl}/user/create`, { data: encryptedData });
//   }

//   getUserDetails() {
//     return this.http.get(`${this.apiUrl}/dashboard`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     }).pipe(map(response => this.decryptPayload((response as { data: any })['data']))  // decrypting res
//     );
//   }
// }



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  private encryptionKey = 'AkriviaHCM';

  constructor(private http: HttpClient) {}


  login(username: string, password: string) {
    const loginData = { username, password };

    return this.http.post<{ message: string; token?: string }>(
      `${this.apiUrl}/user/login`,
      loginData
    );
  }

  register(formData: any) {
    return this.http.post(`${this.apiUrl}/user/create`, formData);
  }

  getUserDetails() {
    return this.http.get(`${this.apiUrl}/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
