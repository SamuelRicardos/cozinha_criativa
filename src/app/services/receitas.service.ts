import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap, throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ReceitaService {
    apiUrl: string = "http://localhost:8080/receitas";
    apiUrlNota: string = "http://localhost:8080/avaliacao"
    
    constructor(private httpClient: HttpClient) { }

    // Método para obter todas as receitas
    getReceitas(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.apiUrl}/`).pipe(
            tap(data => console.log("Receitas carregadas:", data)),
            catchError(error => {
                console.error("Erro ao carregar receitas:", error);
                return throwError(() => error);
            })
        );
    }
    getAvaliacao(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.apiUrlNota}/`).pipe(
            tap(data => console.log("Comentarios carregados:", data)),
            catchError(error => {
                console.error("Erro ao carregar comentarios:", error);
                return throwError(() => error);
            })
        );
    }

    // Método para adicionar uma avaliação
    adicionarAvaliacao(avaliacao: any): Observable<any> {
        const token = sessionStorage.getItem("auth-token");

        if (!token) {
            console.error("Token de autenticação não encontrado!");
            return throwError(() => new Error("Token de autenticação não encontrado!"));
        }

        const headers = {
            Authorization: `Bearer ${token}`
        };

        // Enviar a requisição para o endpoint de avaliação
        return this.httpClient.post<any>(
            `${this.apiUrlNota}/`,
            avaliacao,
            { headers, responseType:'text' as 'json'}
        ).pipe(
            tap(response => {
                console.log("Avaliação adicionada com sucesso", response);
            }),
            catchError(error => {
                console.error("Erro ao adicionar avaliação", error);
                return throwError(() => error);
            })
        );
    }

    // Método para adicionar uma nova receita
    adicionarReceitas(
        nome: string,
        descricao: string,
        nome_categoria: string,
        modo_preparo: string,
        num_porcao: number,
        ingredientes: string
    ) {
        const token = sessionStorage.getItem("auth-token");

        if (!token) {
            console.error("Token de autenticação não encontrado!");
            return throwError(() => new Error("Token de autenticação não encontrado!"));
        }

        const headers = {
            Authorization: `Bearer ${token}`
        };

        return this.httpClient.post<string>(
            `${this.apiUrl}/`,
            { nome, descricao, nome_categoria, modo_preparo, num_porcao, ingredientes },
            { headers, responseType: 'text' as 'json' } // Adicionando responseType como 'text'
        ).pipe(
            tap(response => {
                console.log("Resposta recebida:", response);
            }),
            catchError(error => {
                console.error("Erro ao adicionar receita:", error);
                return throwError(() => error);
            })
        );
    }
}
