import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class FuncionarioService {

    constructor(private httpClient: HttpClient){}

    getFuncionario(): Observable<any[]> {
        const data = [
            {
            id: '1000',
            nome: 'Samuel Ricardo',
            cargo: 'Administrador',
            dtadmissao: '09/10/2024'
        },
        {
            id: '2000',
            nome: 'Tonhas',
            cargo: 'Cozinheiro',
            dtadmissao: '09/10/2024'
        },
        {
            id: '3000',
            nome: 'Bryan Gomes',
            cargo: 'Editor',
            dtadmissao: '09/10/2024'
        },
        {
            id: '4000',
            nome: 'José',
            cargo: 'Editor',
            dtadmissao: '09/10/2024'
        },
        {
            id: '5000',
            nome: 'João Vitor',
            cargo: 'Cozinheiro',
            dtadmissao: '09/10/2024'
        },
        {
            id: '6000',
            nome: 'Agostinho',
            cargo: 'Cozinheiro',
            dtadmissao: '09/10/2024'
        },
        {
            id: '6000',
            nome: 'Agostinho',
            cargo: 'Cozinheiro',
            dtadmissao: '09/10/2024'
        },
        {
            id: '6000',
            nome: 'Agostinho',
            cargo: 'Cozinheiro',
            dtadmissao: '09/10/2024'
        },
        {
            id: '6000',
            nome: 'Agostinho',
            cargo: 'Cozinheiro',
            dtadmissao: '09/10/2024'
        },
        {
            id: '6000',
            nome: 'Agostinho',
            cargo: 'Cozinheiro',
            dtadmissao: '09/10/2024'
        }
    ];
        return of(data); // Retorna um array com os dados
    }
}