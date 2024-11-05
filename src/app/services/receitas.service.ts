import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ReceitaService {
    constructor(private httpClient: HttpClient) { }

    getReceitasPorLivroId(livroId: number): Observable<any[]> {
        const dataReceitas = [
            { id: 1, nomeReceitas: "Feijoada", descricao: "Descrição da Feijoada", imagemUrl: "../../../../../assets/Feijoada.jpg", dtlancamento: "23/09/2024", livroId: 1 },
            { id: 2, nomeReceitas: "Parmegiana", descricao: "Descrição da Parmegiana", imagemUrl: "../../../../../assets/Parmegiana.jpg", dtlancamento: "24/09/2024", livroId: 1 },
            { id: 3, nomeReceitas: "Cuscuz", descricao: "Descrição do Cuscuz", imagemUrl: "../../../../../assets/cuscuz.jpg", dtlancamento: "04/11/2024", livroId: 2 },
        ];
        
        const receitasFiltradas = dataReceitas.filter(receita => receita.livroId === livroId);
        return of(receitasFiltradas);
    }

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