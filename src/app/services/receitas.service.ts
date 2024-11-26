import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";

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

        // Configure os headers com o token
        const headers = {
            Authorization: `Barear ${token}`
        };

        return this.httpClient.post<any>(
            `${this.apiUrl}/`,
            { nome, descricao, nome_categoria, modo_preparo, num_porcao, ingredientes },
            { headers } // Adicione os headers à requisição
        ).pipe(
            tap((value: { nome: string; descricao: string, nome_categoria: string, modo_preparo: string, num_porcao: number, ingredientes: string }) => {
                // Armazene as informações no sessionStorage se necessário
                sessionStorage.setItem("nome", value.nome),
                    sessionStorage.setItem("descricao", value.descricao),
                    sessionStorage.setItem("nome_categoria", value.nome_categoria),
                    sessionStorage.setItem("modo_preparo", value.modo_preparo);
            })
        );
    }
}