import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class CategoriaService {

    apiUrl: string = "http://localhost:8080/categoria"

    constructor(private httpClient: HttpClient) { }

    getCategoria(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/`);
    }

}