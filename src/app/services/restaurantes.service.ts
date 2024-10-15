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
                "estadoRestaurante": "Acre",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Sal e Brasa",
                "estadoRestaurante": "Alagoas",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Spot",
                "estadoRestaurante": "Amapá",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Restaurante Tavares",
                "estadoRestaurante": "Amazonas",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Lazio",
                "estadoRestaurante": "Bahia",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Ceará",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Espírito Santo",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Goiás",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Maranhão",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Mato Grosso",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Mato Grosso Sul",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Minas Gerais",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Pará",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Paraíba",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Pernambuco",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Piauí",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Rio de Janeiro",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Rio Grande do Norte",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Rio Grande do Sul",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Rondônia",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Roraima",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Santa Catarina",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "São Paulo",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Sergipe",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Tocantins",
                "dtadmissao": "10/10/2024"
            },
            {
                "nomeRestaurante": "Inforno",
                "estadoRestaurante": "Paraná",
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