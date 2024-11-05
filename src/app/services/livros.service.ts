import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LivroService {
    getLivros(): Observable<any[]> {
        const dataLivros = [
            { id: 1, nomeLivro: 'Viagem ao centro da terra', autorLivro: 'Julio Verne', isbn: '978-3-16-148410-0' },
            { id: 2, nomeLivro: 'Mil léguas submarinas', autorLivro: 'Julio Verne', isbn: '978-0-14-312755-0' }
        ];
        return of(dataLivros);
    }
    
}