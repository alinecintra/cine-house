import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Injeção de dependência nos parâmetros do construtor
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get('http://localhost:9000/usuarios');
  }

  obterUm(id: String) {
    return this.http.get('http://localhost:9000/usuarios/' + id);
  }

  novo(usuario) {
    return this.http.post('http://localhost:9000/usuarios', usuario);
  }

  atualizar(id, usuario) {
    return this.http.put('http://localhost:9000/usuarios/' + id, usuario);
  }

  excluir(id: String) {
    return this.http.delete('http://localhost:9000/usuarios/' + id);
  }

}
