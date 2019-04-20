import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  public categorias: any;

  public colunasVisiveis: string[] = [
    'descricao',
    'excluir'
  ];

  // Injeção de dependência no parâmetro do construtor
  constructor(
    private categoriaSrv: CategoriaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Chamando o service
    this.categoriaSrv.listar().subscribe(
       dados => this.categorias = dados, // Callback do bem
       erro => console.error(erro) // Callback do mal
    );
  }

  excluir(id: String) {
    if (confirm('Deseja realmente excluir esta categoria?')) {
      this.categoriaSrv.excluir(id).subscribe(
        () => {
          this.snackBar.open('Categoria excluída com sucesso', 'OK', { duration: 2000});
          this.ngOnInit(); // Recarrega a lista
        },
        erro => this.snackBar.open('ERRO AO EXCLUIR CATEGORIA: ' + erro.message, 'OK')
      );
    }
  }

}
