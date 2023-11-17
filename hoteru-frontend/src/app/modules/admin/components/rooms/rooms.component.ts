import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {RoomType} from "../../../../core/models/ModelType";
import {RoomService} from "../../../../services/room/room.service";
import {RoomTypeService} from "../../../../services/room/room-type.service";
import {Room} from "../../../../core/models/Room";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  roomControl : FormControl = new FormControl(null, Validators.required);

  roomTypeForm: FormGroup;
  roomTypes: RoomType[] = [];
  columns: string[] = ['id', 'type', 'costPerDay', 'state', 'options'];
  datasource: MatTableDataSource<any> = new MatTableDataSource();

  typeColumns: string[] = ['id', 'type', 'costPerDay', 'options'];
  typeDatasource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;

  constructor(private roomService: RoomService, private roomTypeService: RoomTypeService,
              private snackBar: MatSnackBar, private matDialog: MatDialog, private builder: FormBuilder) {
    this.roomTypeForm = this.builder.group({
      type: ['', Validators.required],
      costPerDay: [null, Validators.required]
    })
  }

  ngOnInit(): void {

    this.getTypes();
    this.getRooms();
  }

  getTypes() {
    this.roomTypeService.findAll()
      .subscribe({
        next: (response: RoomType[]) => {

          console.log('response', response);
          this.roomTypes = response;
          this.typeDatasource.data = response;
        }
      })
  }

  getRooms() {
    this.roomService.findAll()
      .subscribe({
        next: (response: Room[]) => {
          console.log(response);
          this.datasource.data = response;
        }
      })
  }


  saveType() {

    if(this.roomTypeForm.invalid) {
      this.snackBar.open('Los campos están vacíos..', 'Cerrar');
      return;
    }

    const { type, costPerDay } = this.roomTypeForm.value;

    this.roomTypeService.save(type, costPerDay)
      .subscribe({
        next: response => {
          this.snackBar.open('Tipo de habitación agregado con éxito!', 'Aceptar');
          this.getTypes();
          this.formDir.resetForm(this.roomTypeForm);
        },
        error: err => {
          console.log(err)
          this.snackBar.open('No se pudo guardar el tipo de habitación!', 'Cerrar');

        }
      });
  }

  saveRoom() {
    if(this.roomControl.invalid) {
      this.snackBar.open('El campo está vacío.', 'Cerrar');
      return;
    }

    const type = this.roomControl.value;

    this.roomService.save(type)
      .subscribe({
        next: response => {
          this.snackBar.open('habitación agregada con éxito!', 'Aceptar');
          this.getRooms();
          this.roomControl.reset();
        },
        error: err => {
          console.log(err)
          this.snackBar.open('No se pudo guardar la habitación!', 'Cerrar');

        }
      })
  }

  showRoomTypeTable(templateRef: TemplateRef<any>) {
    this.matDialog.open(templateRef);
  }

  deleteType(element: RoomType, templateRef: TemplateRef<any>) {
    const confirmRef = this.matDialog.open(templateRef, {data: element});

    confirmRef.afterClosed().subscribe({
      next: (response: boolean) => {
        if(response) {
          this.roomTypeService.delete(element.id)
            .subscribe({
              next: response => {
                this.snackBar.open('Tipo eliminado con éxito!', 'Aceptar');
                this.getTypes();
              },
              error: err => {
                this.snackBar.open('No se pudo eliminar el tipo de habitación. Está siendo usado por una habitación.', 'Cerrar');
              }
            })
        }
      }
    })
  }


}
