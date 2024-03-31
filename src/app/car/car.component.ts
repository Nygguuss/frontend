import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from './car.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  @Input() car!: Car;
  @Output() carDeleted = new EventEmitter<Car>();
  @Output() carUpdated = new EventEmitter();

  originalCar!: Car;

  editMode = false;

  constructor(private mojaUsluga :ApiService) {}

  usunSamochod() {
    if(this.car._id && this.car._rev) {
      this.mojaUsluga.deleteCar(this.car._id, this.car._rev).subscribe(
        (res) => {
          this.carDeleted.emit(this.car)
        },
        (err) => {
          console.error(err)
        }
      )
    }
  }
  edytujSamochod() {
    this.originalCar = structuredClone(this.car)
    this.editMode = true
  }
  anulujEdycje() {
    this.car = this.originalCar
    this.editMode = false
  }
  zapiszEdycje() {
    this.mojaUsluga.updateCar(this.car).subscribe(
      (res) => {
        this.carUpdated.emit(this.car)
        this.editMode = false
      },
      (err) => {
        console.error(err)
      }
    )

  }
}
