import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap, throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ReceitaService {
    apiUrl: string = "http://localhost:8080/receitas"
    constructor(private httpClient: HttpClient) { }

    getReceitas() {
        return this.httpClient.get<any>(`${this.apiUrl}/`);
    }

    adicionarReceitas(
        nome: string,
        descricao: string,
        nome_categoria: string,
        modo_preparo: string,
        num_porcao: number,
        ingredientes: string
    ) {
        // Obtenha o token do sessionStorage (ou de outro lugar onde está armazenado)
        const token = sessionStorage.getItem("auth-token");
    
        if (!token) {
            console.error("Token de autenticação não encontrado!");
            return throwError(() => new Error("Token de autenticação não encontrado!"));
        }
    
        // Configure os headers com o token
        const headers = {
            Authorization: `Barear ${token}`
        };
    
        return this.httpClient.post<string>(
            `${this.apiUrl}/`,
            { nome, descricao, nome_categoria, modo_preparo, num_porcao, ingredientes },
            { headers, responseType: 'text' as 'json' } // Adicionando responseType como 'text'
        ).pipe(
            tap((response) => {
                console.log("Resposta recebida:", response);
                // Você pode adicionar qualquer lógica de manipulação aqui
            }),
            catchError((error) => {
                console.error("Erro ao adicionar receita:", error);
                return throwError(() => error);
            })
        );
    }

    atualizarReceita(
        id: number,
        nome: string,
        descricao: string,
        nome_categoria: string,
        modo_preparo: string,
        num_porcao: number,
        ingredientes: string
    ) {
        return this.httpClient.put<any>(
            `${this.apiUrl}/${id}`, // Envia o ID no endpoint
            { nome, descricao, nome_categoria, modo_preparo, num_porcao, ingredientes },
            { responseType: 'text' as 'json' }
        ).pipe(
            tap(() => console.log('Receita atualizada com sucesso')),
            catchError((error) => {
                console.error('Erro ao atualizar receita:', error);
                return throwError(() => error);
            })
        );
    }
}