import { Injectable } from '@angular/core';
import { User } from '../../models/userModel'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'; 
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  slectedUser: User
  //url_api = 'http://localhost:5000/api/user'
  url_api = `${environment.API_URL}/user`

  constructor(private http: HttpClient, private router: Router) {
    this.slectedUser = new User()
  }

  // conexion para login
  /*
  credentials = {
    email: "",
    password: "",
  }
  */

  login(credentials: any){
    return this.http.post(`${this.url_api}/login`, credentials)
  }

  /*
  formUser = {
    email: "",
    password: "",
    phone: "",
    username: ""
  }
  */
  register(formUser: any){
    return this.http.post(`${this.url_api}/create-user`, formUser)
  }

  loggedIn(){
    return localStorage.getItem('token') ? true : false 
  }

  isAdmin(){
    const { admin } = this.getDataFromToken()

    if(admin){
      return true
    }
    return false

  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getDataFromToken() :any {
    const token = this.getToken()
    const decoded = jwtDecode(token ? token : "Error in token")
    return decoded
  }

  numberSeparators(number: string | number) {
    if (typeof number === 'number') return number.toLocaleString('es-MX');
    let value = parseInt(number)
    return value.toLocaleString('es-MX');
  }

  bruteSalary(salary: string, arlType: string) {
    let value = parseInt(salary)
    let total = value - environment.EPS - environment.COMPENSATION_BOX

    if(arlType === '1') return (total - environment.ARL_TYPE1).toLocaleString('es-MX');
    if(arlType === '2') return (total - environment.ARL_TYPE2).toLocaleString('es-MX');
    if(arlType === '3') return (total - environment.ARL_TYPE3).toLocaleString('es-MX');
    if(arlType === '4') return (total - environment.ARL_TYPE4).toLocaleString('es-MX');
    if(arlType === '5') return (total - environment.ARL_TYPE5).toLocaleString('es-MX');

    return total

  }

  getArlValue(arlType: string) {
    if(arlType === '1') return (environment.ARL_TYPE1).toLocaleString('es-MX');
    if(arlType === '2') return (environment.ARL_TYPE2).toLocaleString('es-MX');
    if(arlType === '3') return (environment.ARL_TYPE3).toLocaleString('es-MX');
    if(arlType === '4') return (environment.ARL_TYPE4).toLocaleString('es-MX');
    if(arlType === '5') return (environment.ARL_TYPE5).toLocaleString('es-MX');
    return 
  }

}



