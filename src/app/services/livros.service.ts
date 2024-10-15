import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LivroService {
    getLivros(): Observable<any[]> {
        const dataLivros = [
            {
                'nomeLivro': 'Viagem ao centro da terra',
                'autorLivro': 'Julio Verne',
                'isbn': '978-3-16-148410-0'
            },
            {
                'nomeLivro': 'Mil léguas submarinas',
                'autorLivro': 'Julio Verne',
                'isbn': '978-0-14-312755-0'
            },
            {
                'nomeLivro': 'Dom Casmurro',
                'autorLivro': 'Machado de Assis',
                'isbn': '978-1-86197-876-9'
            },
            {
                'nomeLivro': 'Vidas secas',
                'autorLivro': 'Graciliano Ramos',
                'isbn': '978-0-452-28423-4'
            },
            {
                'nomeLivro': 'O Cortiço',
                'autorLivro': 'Aluísio Azevedo',
                'isbn': '978-1-4088-5797-2'
            },
        ]

        return of(dataLivros);
    }
}