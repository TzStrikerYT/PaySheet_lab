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

  listUsers: any
  slectedUser: any
  //url_api = 'http://localhost:5000/api/user'
  url_api = `${environment.API_URL}`

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
    return this.http.post(`${this.url_api}user/login`, credentials)
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
    return this.http.post(`${this.url_api}user/create-user`, formUser)
  }

  updateUser(id: string, formUser: any){
    return this.http.post(`${this.url_api}user/update-user/${id}`, formUser)
  }

  getUsersByFilter(filter: string) {
    return this.http.get(`http://localhost:5000/api/payments/getByFilter?filter=${filter}`)
  }

  getOneUser(id: string) {
    return this.http.get(`http://localhost:5000/api/user/get-one-user/${id}`)
  }

  activateUser(id: string){
    return this.http.get(`${this.url_api}user/activate/${id}`)
  }
  
  deactivateUser(id: string){
    return this.http.get(`${this.url_api}user/deactivate/${id}`)
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

  readyToPay(){
    return this.http.get(`http://localhost:5000/api/payments/generate`)
  }

  payDay(){
    return this.http.get(`http://localhost:5000/api/payments/payEmployes`)
  }
}



