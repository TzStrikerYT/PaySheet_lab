import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { User } from 'src/app/models/userModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  userInfo: any;
  epsValue = environment.EPS
  boxValue = environment.COMPENSATION_BOX
  userView = (window.location.pathname).split('/')[2]

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userInfo = this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getOneUser(this.userView).subscribe((res) => {
      this.userInfo = res
    });
    return 
  }

}

