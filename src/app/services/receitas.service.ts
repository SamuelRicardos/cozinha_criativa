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
            {
                id: 1,
                nomeReceitas: "Feijoada",
                descricao: "A feijoada é um dos pratos mais tradicionais do Brasil, famosa por sua riqueza de sabores e ingredientes. Sua origem remonta ao período colonial, quando partes menos nobres dos cortes de carne de porco eram cozidas junto com o feijão preto, criando um prato substancial e saboroso.",
                ingredientes: "500g de feijão preto. 300g de carne-seca. 200g de lombo suíno. 200g de costelinha de porco. 200g de linguiça calabresa. 150g de paio. 100g de bacon 1 pé de porco (opcional). 1 orelha de porco (opcional). 1 rabo de porco (opcional). 1 cebola grande picada. 4 dentes de alho picados. 3 folhas de louro. sal a gosto. pimenta-do-reino a gosto. cheiro-verde (salsa e cebolinha) picado a gosto. água o suficiente para cozinhar.",
                imagemUrl: "../../../../../assets/Feijoada.jpg",
                cozinheiroResponsavel: "Bryan Gomes",
                dtlancamento: "23/09/2024",
                livroId: 1
            },
            {
                id: 2,
                nomeReceitas: "Parmegiana",
                descricao: "A parmegiana, um prato clássico de origem italiana, tornou-se um dos favoritos na culinária brasileira. Originalmente chamada de 'parmigiana', a receita tradicional consiste em fatias de berinjela empanadas, cobertas com molho de tomate e gratinadas com queijo parmesão. No Brasil, a versão mais popular é feita com carne bovina, frango ou até mesmo porco.",
                imagemUrl: "../../../../../assets/Parmegiana.jpg",
                cozinheiroResponsavel: "Antonio Moraes",
                dtlancamento: "24/09/2024",
                livroId: 1
            },
            {
                id: 3,
                nomeReceitas: "Cuscuz",
                descricao: "O cuscuz é muito mais do que um simples prato, é um símbolo da cultura brasileira, especialmente do Nordeste. Com sua origem nas terras africanas, ele chegou ao Brasil com os escravizados e se adaptou ao paladar local, tornando-se um dos alimentos mais queridos e versáteis da nossa culinária.",
                imagemUrl: "../../../../../assets/cuscuz.jpg",
                cozinheiroResponsavel: "Samuel Ricardo",
                dtlancamento: "04/11/2024",
                livroId: 2
            },
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