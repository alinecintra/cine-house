import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // Injeção de dependência nos parâmetros do construtor
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get('http://localhost:9000/categorias');
  }

  obterUm(id: String) {
    return this.http.get('http://localhost:9000/categorias/' + id);
  }

  novo(categoria) {
    return this.http.post('http://localhost:9000/categorias', categoria);
  }

  atualizar(id, categoria) {
    return this.http.put('http://localhost:9000/categorias/' + id, categoria);
  }

  excluir(id: String) {
    return this.http.delete('http://localhost:9000/categorias/' + id);
  }

}
