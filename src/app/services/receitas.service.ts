import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ReceitaService {
    constructor(private httpClient: HttpClient) { }

    getReceitas(): Observable<any[]> {
        const dataReceitas = [
            {
                "nomeReceitas": "Feijoada",
                "descricao": "Uma comida deliciosa",
                "dtlancamento": "23/09/2024"
            },
            {
                "nomeReceitas": "Parmegiana",
                "descricao": "Uma comida deliciosa",
                "dtlancamento": "24/09/2024"
            }
        ]

        return of(dataReceitas);
    }
}