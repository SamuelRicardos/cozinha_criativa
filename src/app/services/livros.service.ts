import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LivroService {
    getLivros(): Observable<any[]> {
        const dataLivros = [
            {
                'nomeLivro': 'Legumes e vegetais',
                'descricaoLivro': 'Bom demais da conta',
                'dtLancamento': '01/10/2025'
            },
            {
                'nomeLivro': 'Tome sopa',
                'descricaoLivro': 'Só tem receita de sopa',
                'dtLancamento': '01/10/2025'
            },
            {
                'nomeLivro': 'Hakuna Matata',
                'descricaoLivro': 'Isso é viver, é aprender!',
                'dtLancamento': '02/10/2025'
            },
            {
                'nomeLivro': 'Legumes e vegetais',
                'descricaoLivro': 'Bom demais da conta',
                'dtLancamento': '01/10/2025'
            },
            {
                'nomeLivro': 'Legumes e vegetais',
                'descricaoLivro': 'Bom demais da conta',
                'dtLancamento': '01/10/2025'
            },
        ]

        return of(dataLivros);
    }
}