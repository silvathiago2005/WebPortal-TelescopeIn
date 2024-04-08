import { CustomerByUserId_Api } from '../app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer.model';
import { AuthService } from './auth.service';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    getAllCustomer(): Observable<Customer[]> {
        return this.http.post<Customer[]>(`${CustomerByUserId_Api}`, this.auth.getUser().idUsuario)
    }
}