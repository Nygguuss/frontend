import { Component } from '@angular/core';
import { Car } from '../car/car.model';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {

  car: Car[] = []; // Zmieniono cars na car

  nowaSamochod: Car = {
    marka: '',
    model: '',
    rok_produkcji: ''
  };

  constructor(private mojaUsluga: ApiService) {}

  ngOnInit() {
    this.mojaUsluga.getAllCars().subscribe(
      (dane) => { this.car = dane; }, // Zmieniono cars na car
      (error) => { console.error(error); }
    );
  }

  dodajSamochod() {
    this.mojaUsluga.addNewCar(this.nowaSamochod).subscribe(
      (res) => {
        this.car.push({...this.nowaSamochod});
        console.log('Dodano samochod: ', res);
      },
      (err) => {
        console.error("Błąd przy dodawaniu samochodu: " + err.message);
      }
    );
  }

  samochodUsuniety(car: Car) {
    this.car = this.car.filter(c => c !== car);
  }
}
