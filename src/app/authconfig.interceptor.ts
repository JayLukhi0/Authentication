import {AuthService} from './auth.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private _authService:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        this._authService.isLoading.next(true);
        const authToken = this._authService.getAccessToken();
        req = req.clone({
            setHeaders:{
                Authorization:'Bearer ' + authToken
            }
        });
        return next.handle(req).pipe(
            map((event:HttpEvent<any>) => {
                if(event instanceof HttpResponse){
                    this._authService.isLoading.next(false);
                    console.log("event----->>>",event.body.err_msg);
                }
                return event;
            })
        );
    }

}
