import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LivroService {
    private dataLivros = [
        { id: 1, nomeLivro: 'Receitas da vovó', autorLivro: 'Dona Márcia', isbn: '978-3-16-148410-0' },
        { id: 2, nomeLivro: 'Isso é comida de verdade', autorLivro: 'Bryan Gomes', isbn: '978-0-14-312755-0' }
    ];

    getLivros(): Observable<any[]> {
        return of(this.dataLivros);
    }

    getLivroPorId(id: number): Observable<any | undefined> {
        const livro = this.dataLivros.find(l => l.id === id);
        return of(livro);
    }
    
}