import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";


@Injectable({
    providedIn: "root"
})


export class RestauranteService {
    constructor(private httpClient: HttpClient){}

    getRestaurante(): Observable<any[]> {
        const dataRestaurante = [
            {
                "nomeRestaurante": "Mangai",
                "estadoRestaurante": "Distrito Federal",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Sal e Brasa",
                "estadoRestaurante": "Distrito Federal",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Spot",
                "estadoRestaurante": "Distrito Federal",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Restaurante Tavares",
                "estadoRestaurante": "Distrito Federal",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Lazio",
                "estadoRestaurante": "Distrito Federal",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Distrito Federal",
                "dtadmissao": "10/10/2024"
            },
        ];

        return of(dataRestaurante);
    }
}