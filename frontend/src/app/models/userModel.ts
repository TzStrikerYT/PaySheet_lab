export class User {
  _id: string;
  email: string;
  name: string;
  lastname: string;
  document: string;
  salary: string;
  arlType: string;
  compensationBox: any;
  password: string;
  phone: string;
  username: string;
  admin: boolean;
  verified: boolean;
  isLogged: boolean;
  confirmPassword: string;
  isActive: boolean;
  eps: string;

  constructor(
    _id = '',
    email = '',
    name = '',
    lastname = '',
    document = '',
    salary = '',
    arlType = '',
    compensationBox = '',
    password = '',
    phone = '',
    username = '',
    admin = false,
    verified=false,
    isLogged = false,
    confirmPassword = '',
    isActive = false,
    eps = ''
  ) {
    this._id = _id;
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.document = email;
    this.salary = salary;
    this.arlType = arlType;
    this.document = document;
    this.compensationBox = compensationBox
    this.password = password;
    this.phone = phone;
    this.username = username;
    this.admin = admin;
    this.verified = verified
    this.isLogged = isLogged;
    this.confirmPassword = confirmPassword;
    this.isActive = isActive
    this.eps = eps
  }
}
