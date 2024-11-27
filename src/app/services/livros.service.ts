import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LivroService {

    apiUrl: string = "http://localhost:8080/livros"

    constructor(private httpClient: HttpClient) { }

    getLivros() {
        return this.httpClient.get<any>(`${this.apiUrl}/`);
    }
    
    criarLivro(livro: any): Observable<any> {
        const token = sessionStorage.getItem("auth-token");
    
        if (!token) {
            console.error("Token de autenticação não encontrado!");
            return throwError(() => new Error("Token de autenticação não encontrado!"));
        }
    
        // Configure os headers com o token
        const headers = {
            Authorization: `Bearer ${token}`
        };

        return this.httpClient.post(`${this.apiUrl}/`, livro, {headers , responseType: 'text' as 'json'})
      }

      getReceitasPorLivroId(livroId: number): Observable<any[]> {
        return new Observable((observer) => {
          this.getLivros().subscribe({
            next: (livros) => {
              // Encontra o livro com o id correspondente e retorna suas receitas
              const livro = livros.find((l: any) => l.id === livroId);
              if (livro) {
                observer.next(livro.receitas || []);  // Caso o livro tenha receitas
              } else {
                observer.next([]);  // Caso não encontre o livro
              }
              observer.complete();
            },
            error: (err) => {
              observer.error(err);  // Propaga erro caso aconteça
            }
          });
        });
      }
}