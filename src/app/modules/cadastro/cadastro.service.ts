import { Atendimento } from './../../models/atendimento.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CadastroService {
  private baseUrl = "/api/atendimento";

  constructor(private http: HttpClient) {

  }

  salvar(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(this.baseUrl, atendimento);
  }

  listar(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(this.baseUrl);
  }

  buscarId(id: number): Observable<Atendimento>{
    return this.http.get<Atendimento>(this.baseUrl + "/" + id); //http://localhost:8080/atemdimento/id
  }

  editar(id: number , atendimento: Atendimento): Observable<Atendimento>{
    return this.http.put<Atendimento>(this.baseUrl + "/" + id, atendimento); //http://localhost:8080/atemdimento/id
  }

  excluir(id: number): Observable<any>{    
    return this.http.delete<any>(this.baseUrl + "/" + id);
  }

  incluir(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(this.baseUrl, atendimento);
  }
}
