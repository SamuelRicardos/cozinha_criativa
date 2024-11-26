import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class FuncionarioService {

    apiUrl: string = "http://localhost:8080/funcionario"
    apiUrlSoftDelete: string = "http://localhost:8080/funcionario/softDelete"

    constructor(private httpClient: HttpClient) { }

    listarTodosFuncionarios(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/`).pipe(
          catchError(this.handleError)
        );
      }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
          // Erro no lado do cliente
          console.error('Ocorreu um erro no cliente:', error.error.message);
        } else {
          // Erro no lado do servidor
          console.error(
            `Erro no servidor: Código ${error.status}, ` +
            `Mensagem: ${error.message}`
          );
        }
        // Retorna uma mensagem de erro para o consumidor do serviço
        return throwError(() => new Error('Erro ao processar a solicitação. Por favor, tente novamente mais tarde.'));
      }

    adicionarFuncionarios(nome: string, email: string, senha: string, nome_cargo: string, rg: string, salario: number) {
        return this.httpClient.post<any>(`${this.apiUrl}/`, { nome, email, senha, nome_cargo, rg, salario }, { responseType: 'json' }).pipe(
            tap((value: { nome: string; email: string; senha: string; nome_cargo:string; rg: string; salario: number }) => {
                sessionStorage.setItem("nome", value.nome),
                sessionStorage.setItem("rg", value.rg)
            }));
    }

    updateFuncionario(funcionario: any, id: number) {
      return this.httpClient.put(`${this.apiUrl}/${id}`, funcionario).pipe(
          catchError((error) => {
              console.error('Erro ao atualizar funcionário:', error);
              return throwError(() => error);
          })
      );
  }

  deletarFuncionario(id: number) {
    return this.httpClient.put<any>(
        `${this.apiUrlSoftDelete}/${id}`, // URL com o ID
        {}, // Corpo vazio
        { responseType: 'json' } // Opcional: define o tipo de resposta
    ).pipe(
        tap(() => {
            console.log(`Funcionário com ID ${id} deletado com sucesso.`);
        }),
        catchError((error) => {
            console.error(`Erro ao deletar o funcionário com ID ${id}:`, error);
            return throwError(() => new Error('Erro ao deletar funcionário, por favor tente novamente.'));
        })
    );
}
    
}