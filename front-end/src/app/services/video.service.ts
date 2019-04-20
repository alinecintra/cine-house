import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  // Injeção de dependência nos parâmetros do construtor
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get('http://localhost:9000/videos');
  }

  obterUm(id: String) {
    return this.http.get('http://localhost:9000/videos/' + id);
  }

  novo(categoria) {
    return this.http.post('http://localhost:9000/videos', categoria);
  }

  atualizar(id, categoria) {
    return this.http.put('http://localhost:9000/videos/' + id, categoria);
  }

  excluir(id: String) {
    return this.http.delete('http://localhost:9000/videos/' + id);
  }

}
