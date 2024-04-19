import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //console.log('HttpConfigInterceptor request',request);
    
    const xAccessTtoken = localStorage.getItem('token');
    if (request.url.includes('/login')) {
      console.log('/login');
      return next.handle(request);
   }
    let newHeaders = request.headers;
    if (xAccessTtoken) {
      // If we have a token, we append it to our new headers
      newHeaders = newHeaders.append('x-access-token', xAccessTtoken);
      //newHeaders = newHeaders.append('Access-Control-Allow-Headers', 'Content-Type:application/json');
      //newHeaders = newHeaders.append('Access-Control-Allow-Origin', '*');
      //newHeaders = newHeaders.append('Access-Control-Allow-Methods', '*');
    }else{
      this.router.navigate(['/login']);
    }
    const authReq = request.clone({ headers: newHeaders });
    return next.handle(authReq);
  }
}
