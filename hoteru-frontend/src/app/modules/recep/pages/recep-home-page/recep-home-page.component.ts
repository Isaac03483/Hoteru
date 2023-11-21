import {AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoomService} from "../../../../services/room/room.service";
import {Room} from "../../../../core/models/Room";
import {MatTableDataSource} from "@angular/material/table";
import {ReservationService} from "../../../../services/reservation/reservation.service";
import {ClientService} from "../../../../services/client/client.service";
import {RoomTypeService} from "../../../../services/room/room-type.service";
import {RoomType} from "../../../../core/models/ModelType";
import {Reservation} from "../../../../core/models/Reservation";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-recep-home-page',
  templateUrl: './recep-home-page.component.html',
  styleUrls: ['./recep-home-page.component.css']
})
export class RecepHomePageComponent implements OnInit, AfterViewInit {
  total: number = 0;
  costPerDay: number = 0;

  reservationForm: FormGroup;
  columns: string[] = ['id', 'type', 'costPerDay', 'state', 'options'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  typeColumns: string[] = ['id', 'type', 'costPerDay'];
  typeDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;
  todayColumns: string[] = ['id', 'nit', 'roomId', 'date', 'endDate', 'total'];

  todayDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild('paginatorType') paginatorType!: MatPaginator;
  @ViewChild('paginatorToday') paginatorToday!: MatPaginator;
  @ViewChild('sortType') sortType!: MatSort;
  @ViewChild('sortToday') sortToday!: MatSort;

  constructor(private cookieService: CookieService, private router: Router, private builder: FormBuilder,
              private matDialog: MatDialog, private snackBar: MatSnackBar, private roomService: RoomService,
              private reservationService: ReservationService, private clientService: ClientService,
              private roomTypeService: RoomTypeService) {
    this.reservationForm = this.builder.group({
      nit: ['', Validators.required],
      name: ['', Validators.required],
      initDate: [null, Validators.required],
      endDate: [null, Validators.required],
      roomId: [null, Validators.required],
      type: ['']
    });
  }

  ngOnInit(): void {
    this.getTypes();
    this.getTodayReservations();
  }

  ngAfterViewInit(): void {
    this.typeDataSource.paginator = this.paginatorType;
    this.typeDataSource.sort = this.sortType;
    this.todayDataSource.paginator = this.paginatorToday;
    this.todayDataSource.sort = this.sortToday;
  }

  logout() {
    this.cookieService.delete('id');
    this.router.navigate(['/','auth'])
  }

  saveReservation() {
    const { nit, name, initDate, endDate, roomId } = this.reservationForm.value;

    console.log(this.reservationForm.value);

    this.reservationService.save(nit, name, roomId, initDate, endDate)
      .subscribe({
        next: response => {
          this.snackBar.open('Reservación agregada con éxito.', 'Aceptar');
          this.formDir.resetForm(this.reservationForm);
          this.total = 0;
          this.costPerDay = 0;
          this.getTodayReservations();
        },
        error: err => {
          this.snackBar.open(`No se pudo agregar la reservación. ${err.error.message}`, 'Cerrar');
          console.log(err)
        }
      })
  }

  getTodayReservations() {
    this.reservationService.todayReservation()
      .subscribe({
        next: (response: Reservation[]) => {
          this.todayDataSource.data = response;
        }
      })
  }

  getTypes() {
    this.roomTypeService.findAll()
      .subscribe({
        next: (response: RoomType[]) => {
          this.typeDataSource.data = response;
        }
      })
  }

  getRooms() {
    this.roomService.findAll()
      .subscribe({
        next: (rooms: Room[]) => {
          this.dataSource.data = rooms;
        }
      })
  }

  selectRoom(templateRef: TemplateRef<any>) {
    this.getRooms();
    this.matDialog.open(templateRef).afterClosed()
      .subscribe({
        next: (data: Room) => {
          if(data) {
            this.reservationForm.get('roomId')?.setValue(data.id);
            this.reservationForm.get('type')?.setValue(data.type);
            this.reservationForm.markAsTouched();
            this.costPerDay = data.cost;
            this.calcTotal();
          }
        }
      })
  }

  calcTotal() {
    const { initDate, endDate } = this.reservationForm.value;


    if(initDate === null || endDate === null) {
      return;
    }

    const init = new Date(initDate);
    const end = new Date(endDate);


    const days = Math.floor((end.getTime() - init.getTime()) / 1000 / 60 / 60 / 24) + 1;

    this.total = days * this.costPerDay;
  }

  findClient() {
    const { nit } = this.reservationForm.value;
    this.clientService.findByNit(nit)
      .subscribe({
        next: value => {
          console.log(value);
          this.reservationForm.get('name')?.setValue(value.name);
        },
        error: err => {
          this.snackBar.open('No se encontró al cliente.', 'Cerrar');
        }
      })
  }

  applyTypeFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.typeDataSource.filter = filterValue.trim().toLowerCase();

    if (this.typeDataSource.paginator) {
      this.typeDataSource.paginator.firstPage();
    }
  }

  applyTodayFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.todayDataSource.filter = filterValue.trim().toLowerCase();

    if (this.todayDataSource.paginator) {
      this.todayDataSource.paginator.firstPage();
    }
  }
}
