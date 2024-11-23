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

    adicionarReceitas(nome: string, descricao: string, nome_categoria: string, modo_preparo: string, num_porcao: number, ind_inedita: number) {
        return this.httpClient.post<any>(`${this.apiUrl}/`, { nome, descricao, nome_categoria, modo_preparo, num_porcao, ind_inedita }).pipe(
            tap((value: { nome: string; descricao: string, nome_categoria: string, modo_preparo: string, num_porcao: number, ind_inedita: number}) => {
                sessionStorage.setItem("nome", value.nome),
                sessionStorage.setItem("descricao", value.descricao),
                sessionStorage.setItem("nome_categoria", value.nome_categoria),
                sessionStorage.setItem("modo_preparo", value.modo_preparo)
            }));
    }
}