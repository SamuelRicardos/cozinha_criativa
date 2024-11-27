import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";


@Injectable({
    providedIn: "root"
})


export class RestauranteService {
    apiUrl: string = "http://localhost:8080/restaurantes"

    constructor(private httpClient: HttpClient){}

    getRestaurante(): Observable<any[]> {
        return this.httpClient.get<any>(`${this.apiUrl}/`);
    }

    postRestaurante(restauranteData: any): Observable<any> {
        return this.httpClient.post<any>(`${this.apiUrl}/`, restauranteData, { responseType: 'text' as 'json'});
      }

      deletarRestaurante(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json'});
      }

      putRestaurante(id: number, restauranteData: any): Observable<any> {
        return this.httpClient.put<any>(`${this.apiUrl}/${id}`, restauranteData, { responseType: 'text' as 'json' });
    }
}