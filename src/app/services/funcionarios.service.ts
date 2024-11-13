import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class FuncionarioService {

    apiUrl: string = "http://localhost:8080/funcionario"

    constructor(private httpClient: HttpClient) { }

    listarTodosFuncionarios(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/`);
    }

    adicionarFuncionarios(nome: string, rg: string, salario: number) {
        return this.httpClient.post<any>(`${this.apiUrl}/`, { nome, rg, salario }).pipe(
            tap((value: { nome: string; rg: string; salario: number }) => {
                sessionStorage.setItem("nome", value.nome),
                sessionStorage.setItem("rg", value.rg)
            }));
    }
}