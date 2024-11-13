import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class CargosService {

    constructor(private httpClient: HttpClient) { }

    getCargos(): Observable<any[]> {
        const cargos = [
            {
                
                nome_cargo: "degustador"
            },
            {
                
                nome_cargo: "cozinheiro"
            },
            {
                
                nome_cargo: "editor"
            }
        ]

        return of(cargos);
    }

}