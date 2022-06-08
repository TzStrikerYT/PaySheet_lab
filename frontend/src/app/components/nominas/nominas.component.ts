import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nominas',
  templateUrl: './nominas.component.html',
  styleUrls: ['./nominas.component.css'],
})
export class NominasComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getUserByFilter();
  }

  getUserByFilter(filter?: string) {
    try {
      this.userService
        .getUsersByFilter(filter || 'all')
        .subscribe((res: any) => {
          this.userService.listUsers = res;
        });

      console.log(this.userService.listUsers);
    } catch (error) {
      console.log();
    }

    return;
  }

  readyToPay() {

    Swal.fire({
      title: '¿Estas Seguro?',
      text: "Recurda que estas nominas solo seran generadas para los usuarios activos en la empresa",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#01504A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Generar Nominas',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.readyToPay().subscribe((res) => {
          Swal.fire(
            'Exito!',
            'Nominas Generadas correctamente.',
            'success'
          )
          this.getUserByFilter();
        });  
      }
    })
  }

  payDay() {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "Recurda que estas nominas solo seran PAGADAS para los usuarios activos en la empresa",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#01504A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'PAGAR',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.payDay().subscribe((res) => {
          Swal.fire(
            'Exito!',
            'Nominas "PAGADAS" correctamente.',
            'success'
          )
          this.getUserByFilter();
        });  
      }
    })
  }

  activeUser(id: string) {
    try {
      this.userService.activateUser(id).subscribe((res: any) => {
        this.getUserByFilter();
        alert('usuario activado');
      });
    } catch (error) {
      console.log();
    }
    return;
  }

  deactiveUser(id: string) {
    try {
      this.userService.deactivateUser(id).subscribe((res: any) => {
        this.getUserByFilter();
        alert('usuario desactivado');
      });
    } catch (error) {
      console.log();
    }
    return;
  }
}
