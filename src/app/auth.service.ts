import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './User';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url="http://localhost:3000/api/";

  isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _http:HttpClient,private _router:Router) { }

  httpOptions = {
    headers : new HttpHeaders({"Content-Type":"Application/json"})
  };

  // registration/signup process
  register(user:User):Observable<any>{
    return this._http.post<any>(this.url+"register",user);
  }

  // login process
  login(user:User){
    return this._http.post<any>(this.url+"login",user)
    .subscribe((res:any)=>{
      localStorage.setItem("access-token",res.token);
      this._router.navigate(['/book']);
    });
  }

  // to check is user is logged in or not
  isLoggedIn():boolean{
    let authToken = localStorage.getItem("access-token");
    return (authToken) !== null ? true : false;
  }

  // logout process
  logout(){
    if(localStorage.removeItem("access-token")==null){
      this._router.navigate(['/login']);
    }
  }

  // getBooks
  getBooks():Observable<any>{
    return this._http.get(this.url+"books",this.httpOptions);
  }

  // get token fom the localStorage
  getAccessToken(){
    return localStorage.getItem("access-token");
  }


}
