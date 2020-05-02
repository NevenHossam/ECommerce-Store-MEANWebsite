import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:3000/api/users';


  constructor(private client: HttpClient) { }

  // Register New User
  insertUser(user) {
    console.log(user);
    return this.client.post(this.baseUrl, user, { observe: 'body' });
  }

  // Login User
  loginUser(loginObject) {
    console.log("Service: " + loginObject);
    return this.client.put(this.baseUrl, loginObject, { observe: 'body' });
  }

}
