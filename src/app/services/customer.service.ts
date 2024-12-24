import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly apiUrl = 'http://localhost:5107/api/Customers';
  
    constructor(private readonly http: HttpClient) { }
  
    getCustomers(): Observable<Customer[]> {
      return this.http.get<Customer[]>(this.apiUrl);
    }
  
    getCustomer(id: number): Observable<Customer> {
      return this.http.get<Customer>(`${this.apiUrl}/${id}`);
    }
  
    createCustomer(customer: Customer): Observable<Customer> {
      return this.http.post<Customer>(this.apiUrl, customer);
    }
  
    updateCustomer(id: number, customer: Customer): Observable<Customer> {
      return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
    }
  
    deleteCustomer(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
