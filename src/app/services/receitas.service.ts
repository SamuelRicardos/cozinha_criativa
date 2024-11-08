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
                categoria: "Carnes",
                descricao: "A feijoada é um dos pratos mais tradicionais do Brasil, famosa por sua riqueza de sabores e ingredientes. Sua origem remonta ao período colonial, quando partes menos nobres dos cortes de carne de porco eram cozidas junto com o feijão preto, criando um prato substancial e saboroso.",
                ingredientes: "500g de feijão preto. 300g de carne-seca. 200g de lombo suíno. 200g de costelinha de porco. 200g de linguiça calabresa. 150g de paio. 100g de bacon 1 pé de porco (opcional). 1 orelha de porco (opcional). 1 rabo de porco (opcional). 1 cebola grande picada. 4 dentes de alho picados. 3 folhas de louro. sal a gosto. pimenta-do-reino a gosto. cheiro-verde (salsa e cebolinha) picado a gosto. água o suficiente para cozinhar.",
                quantidadePessoas: 3,
                imagemUrl: "../../../../../assets/Feijoada.jpg",
                cozinheiroResponsavel: "Bryan Gomes",
                dtlancamento: "23/09/2024",
                livroId: 1
            },
            {
                id: 2,
                nomeReceitas: "Frango à Parmegiana",
                categoria: "Frango",
                descricao: "A parmegiana, um prato clássico de origem italiana, tornou-se um dos favoritos na culinária brasileira. Originalmente chamada de 'parmigiana', a receita tradicional consiste em fatias de berinjela empanadas, cobertas com molho de tomate e gratinadas com queijo parmesão. No Brasil, a versão mais popular é feita com carne bovina, frango ou até mesmo porco.",
                ingredientes: "500g de carne bovina (filé mignon ou alcatra). 100g de farinha de trigo. 100g de farinha de rosca. 2 ovos batidos. 200g de molho de tomate. 200g de queijo muçarela fatiado. 50g de queijo parmesão ralado. óleo para fritar. sal a gosto. pimenta-do-reino a gosto. manjericão fresco para decorar",
                quantidadePessoas: 2,
                imagemUrl: "../../../../../assets/Parmegiana.jpg",
                cozinheiroResponsavel: "Antonio Moraes",
                dtlancamento: "24/09/2024",
                livroId: 1
            },
            {
                id: 3,
                nomeReceitas: "Cuscuz",
                categoria: "Culinária nordestina",
                descricao: "O cuscuz é muito mais do que um simples prato, é um símbolo da cultura brasileira, especialmente do Nordeste. Com sua origem nas terras africanas, ele chegou ao Brasil com os escravizados e se adaptou ao paladar local, tornando-se um dos alimentos mais queridos e versáteis da nossa culinária.",
                ingredientes: "2 xícaras de flocos de milho para cuscuz. 1 xícara de água. 1 colher de chá de sal. 2 colheres de sopa de manteiga. 1 cebola pequena picada. 1 tomate picado sem sementes. 1/2 pimentão picado. cheiro-verde picado a gosto.",
                modoPreparo: "Misture os flocos de milho com a água e o sal, mexendo bem para hidratar os flocos. Deixe descansar por cerca de 10 minutos até que os flocos absorvam a água. Coloque água na parte inferior de uma cuscuzeira e, na parte superior, adicione a mistura de flocos de milho, sem pressionar demais. Leve ao fogo médio e cozinhe por aproximadamente 10 minutos, ou até que o cuscuz esteja macio e cozido. Derreta a manteiga em uma frigideira e refogue a cebola até dourar. Adicione o tomate e o pimentão e refogue até que fiquem levemente murchos. Desenforme o cuscuz e despeje a mistura refogada por cima. Finalize com cheiro-verde picado e sirva quente.",
                quantidadePessoas: 1,
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
                "categoria": "Carnes",
                "descricao": "Uma comida deliciosa",
                "dtlancamento": "23/09/2024"
            },
            {
                "nomeReceitas": "Parmegiana",
                "categoria": "Frangos",
                "descricao": "Uma comida deliciosa",
                "dtlancamento": "24/09/2024"
            }
        ]
        return of(dataReceitas);
    }
}