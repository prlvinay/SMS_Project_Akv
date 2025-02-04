// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpResponse,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import * as CryptoJS from 'crypto-js';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private encryptionKey = 'AkriviaHCM';
//   constructor() {}

//   intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//   // return next.handle(request);
//   if (req.body) {
//     console.log(req.body);
//     const encryptedBody = this.encryptPayload(req.body);
//     console.log('hey');
//     const encryptedReq = req.clone({
//       body: encryptedBody
//     });
//     return next.handle(encryptedReq).pipe(
//       map((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//           // Decrypt the response payload
//           event = event.clone({
//             body: this.decryptPayload(event.body)
//           });
//         }
//         return event;
//       })
//     );
//   } else {
//     return next.handle(req);
//   }
//   }

//   private encryptPayload(payload: any): string {
//     return CryptoJS.AES.encrypt(JSON.stringify(payload), this.encryptionKey).toString();
//   }

//   private decryptPayload(encryptedPayload: any): any {
//     const bytes = CryptoJS.AES.decrypt(encryptedPayload, this.encryptionKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private encryptionKey = 'AkriviaHCM';
  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   // console.log(req.headers);
  if (req.body) {
    const encryptedBody = this.encryptPayload(req.body);
    const encryptedReq = req.clone({
      body:{data: encryptedBody},
      
    });
    return next.handle(encryptedReq).pipe(
      map((event:HttpEvent<any>)=>{
        if(event instanceof HttpResponse && event.body?.data){
          const decryptedBody=this.decryptPayload(event.body.data);
          return event.clone({body:decryptedBody});
        }
        return event;
      })
    );
  } else {
    return next.handle(req);
  }
  }

  private encryptPayload(payload: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(payload), this.encryptionKey).toString();
  }

  private decryptPayload(encryptedPayload: any): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPayload, this.encryptionKey);
    return  JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // try {
    //   return JSON.parse(decryptedText);
    // } catch (e) {
    //   console.error('Failed to parse decrypted payload:', e);
    //   return {}; // or handle error if parsing failed
    // }
  }
}



// .pipe(
//   map((event: HttpEvent<any>) => {
//     if (event instanceof HttpResponse) {   
//       console.log('Response Body:', event.body);
//       event = event.clone({
//         body: this.decryptPayload(event.body)
//       });
//     }
//     return event;
//   })
// );