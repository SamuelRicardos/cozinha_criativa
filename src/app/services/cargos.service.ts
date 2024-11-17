import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class CargosService {

    apiUrl: string = "http://localhost:8080/cargo"

    constructor(private httpClient: HttpClient) { }

    getCargos(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/`);
    }

}