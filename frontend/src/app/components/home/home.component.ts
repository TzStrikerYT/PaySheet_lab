import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productService/product.service';
import { UserService } from 'src/app/services/userService/user.service';
import { User } from 'src/app/models/userModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userInfo = new User();
  epsValue = environment.EPS
  boxValue = environment.COMPENSATION_BOX

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    console.log({ data: this.getUserInfo() });
    this.userInfo = this.getUserInfo();
  }

  getUserInfo() {
    const info = this.userService.getDataFromToken();
    return info;
  }

}
