import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/userModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /* valores del formulario */

  constructor(public userService: UserService, public router: Router) {
  }


  ngOnInit(): void {}

  login(form: NgForm) {
    try {
      if (!form.value.username || !form.value.password)
        throw 'Uno o mas campos estan vacios';

      this.userService.login(form.value).subscribe((res: any) => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/home'])
        console.log(res)
      },
      (err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: `${err.error.err}`,
          showConfirmButton: true,
        });
      });
    } catch (error) {
      alert(error);
      return;
    }
  }

}
