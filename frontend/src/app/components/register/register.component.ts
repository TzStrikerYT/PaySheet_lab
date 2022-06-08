import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userId = window.location.pathname.split('/')[2] || '';

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit(): void {
    if (this.userId !== '') {
      this.userService.getOneUser(this.userId).subscribe((res) => {
        this.userService.slectedUser = res;
      });
    }
  }

  register(form: NgForm) {
    const {
      email,
      name,
      lastname,
      document,
      salary,
      arlType,
      compensationBox,
      password,
      phone,
      username,
      confirmPassword,
    } = form.value;

    console.log({
      email,
      name,
      lastname,
      document,
      salary,
      arlType,
      compensationBox,
      password,
      phone,
      username,
      confirmPassword,
    });

    if (
      email === '' ||
      name === '' ||
      lastname === '' ||
      document === '' ||
      salary === '' ||
      arlType === '' ||
      compensationBox === '' ||
      password === '' ||
      phone === '' ||
      username === '' ||
      confirmPassword === ''
    ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Todos los campos son requeridos',
        showConfirmButton: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Las contraseñas no coinciden',
        showConfirmButton: true,
      });

      this.userService.slectedUser.password = '';
      this.userService.slectedUser.confirmPassword = '';
      return;
    }

    if (this.userId !== '') {
      this.userService
        .updateUser(this.userId, {
          email,
          name,
          lastname,
          document,
          salary,
          arlType,
          compensationBox,
          password,
          phone,
          username,
          confirmPassword,
        })
        .subscribe(
          (data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: `Usuario Actualizado correctamente`,
              showConfirmButton: true,
            });
            form.reset();
          },
          (err) =>
            Swal.fire({
              position: 'center',
              icon: 'error',
              text: 'El usuario no se ha Actuaizado',
              showConfirmButton: true,
            })
        );
        return;
    }

    this.userService
        .register({
          email,
          name,
          lastname,
          document,
          salary,
          arlType,
          compensationBox,
          password,
          phone,
          username,
          confirmPassword,
        })
        .subscribe(
          (data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: `Usuario creado correctamente`,
              showConfirmButton: true,
            });
            form.reset();
          },
          (err) =>
            Swal.fire({
              position: 'center',
              icon: 'error',
              text: 'El usuario no se ha creado',
              showConfirmButton: true,
            })
        );

    //this.router.navigate(['/login'])

    return;
  }
}
