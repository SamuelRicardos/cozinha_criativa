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
                "descricao": "A feijoada é um dos pratos mais tradicionais do Brasil...",
                "imagemUrl": "../../../../../assets/Feijoada.jpg",
                "dtlancamento": "23/09/2024",
                "livroNome": "Viagem ao centro da terra"
            },
            {
                "nomeReceitas": "Parmegiana",
                "descricao": "A parmegiana, um prato clássico de origem italiana...",
                "imagemUrl": "../../../../../assets/Parmegiana.jpg",
                "dtlancamento": "24/09/2024",
                "livroNome": "Mil léguas submarinas"
            },
            {
                "nomeReceitas": "Cuscuz",
                "descricao": "O cuscuz é muito mais do que um simples prato...",
                "imagemUrl": "../../../../../assets/cuscuz.jpg",
                "dtlancamento": "04/11/2024",
                "livroNome": "Dom Casmurro"
            }
        ];
    
        return of(dataReceitas);
    }
}