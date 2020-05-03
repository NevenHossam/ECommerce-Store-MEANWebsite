import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private client: HttpClient) { }

  // Register New User
  insertUser(user) {
    return this.client.post(this.baseUrl, user, { observe: 'body' });
  }

  // Login User
  loginUser(loginObject) {
    return this.client.put(this.baseUrl, loginObject, { observe: 'body' });
  }

  // Logout User
  LogOut(){
    localStorage.removeItem('token'); 
    localStorage.removeItem('currentuser'); 
  }

  // Check on if the user still loggedin or not
  isLoggedIn() {   
    let jwtHelper = new JwtHelperService();  
    let token = localStorage.getItem('token');  
    if(!token) return false;  
    let expirationDate = jwtHelper.getTokenExpirationDate(token);  
    let isExpired = jwtHelper.isTokenExpired(token);  
    return !isExpired;  
  } 

  // Get current user
  getCurrentUser(){
    let token = localStorage.getItem('token');  
    if(!token) return null;  
    return new JwtHelperService().decodeToken(token);  
  }

}
