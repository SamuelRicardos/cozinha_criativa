import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

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

    deletarFuncionario(id: number) {
        return this.httpClient.delete<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                console.log(`Funcionário com ID ${id} deletado com sucesso.`);
            }),
            catchError(error => {
                console.error(`Erro ao deletar o funcionário com ID ${id}:`, error);
                return throwError(() => new Error('Erro ao deletar funcionário, por favor tente novamente.'));
            })
        );
    }
    
}