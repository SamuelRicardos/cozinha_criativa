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
                "descricao": "A feijoada é um dos pratos mais tradicionais do Brasil, famosa por sua riqueza de sabores e ingredientes. Sua origem remonta ao período colonial, quando partes menos nobres dos cortes de carne de porco eram cozidas junto com o feijão preto, criando um prato substancial e saboroso.",
                "imagemUrl": "../../../../../assets/Feijoada.jpg",
                "dtlancamento": "23/09/2024"
            },
            {
                "nomeReceitas": "Parmegiana",
                "descricao": "A parmegiana, um prato clássico de origem italiana, tornou-se um dos favoritos na culinária brasileira. Originalmente chamada de 'parmigiana', a receita tradicional consiste em fatias de berinjela empanadas, cobertas com molho de tomate e gratinadas com queijo parmesão. No Brasil, a versão mais popular é feita com carne bovina, frango ou até mesmo porco.",
                "imagemUrl": "../../../../../assets/Parmegiana.jpg",
                "dtlancamento": "24/09/2024"
            }
        ]

        return of(dataReceitas);
    }
}