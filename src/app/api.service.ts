import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Car } from './car/car.model';
//NIE ZMIENIAC
const API_URL = "http://localhost:5555/api/v1"

const mojeNaglowkiHTTP = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
})

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http :HttpClient) { }

  getAllCars() :Observable<Car[]> {
    return this.http.get<Car[]>(`${API_URL}/cars`, {headers: mojeNaglowkiHTTP})
  } 

  addNewCar(car :Car) :Observable<Object> {
    return this.http.post<Car>(`${API_URL}/cars`, car, {headers: mojeNaglowkiHTTP})
  }

  deleteCar(id :string, rev :string) :Observable<Object> {
    return this.http.delete(`${API_URL}/cars/${id}/${rev}`, {headers: mojeNaglowkiHTTP})
  }

  updateCar(car :Car) :Observable<Object> {
    return this.http.patch(`${API_URL}/cars`, car, {headers: mojeNaglowkiHTTP})
  }
}
