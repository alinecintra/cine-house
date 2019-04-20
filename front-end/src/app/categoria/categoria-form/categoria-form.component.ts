import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private categoriaSrv: CategoriaService,
    private snackBar: MatSnackBar
  ) { }

  public titulo: String = 'Nova Categoria';
  public categoria: any = {};

  ngOnInit() {

    // Pedimos para que o ActivatedRoute busque para nós os parâmetros da url
    this.actRoute.params.subscribe(  // Chamada assíncrona
      params => {
        if (params.id) { // Se existir um parâmetro chamado id
          // 1) Vamos buscar os dados do objeto no back-end
          this.categoriaSrv.obterUm(params.id).subscribe(
            obj => { // Callback se OK
              this.categoria = obj;
              console.log(obj);
              this.titulo = 'Editar categoria';
            },
            erro => console.error(erro) // Callback se erro
          );
        }
      }
    );
  }

  salvar() {
    let retorno: any;
    if (this.categoria._id) {
      retorno = this.categoriaSrv.atualizar(this.categoria._id, this.categoria);
    } else {
      retorno = this.categoriaSrv.novo(this.categoria);
    }
    retorno.subscribe(
      () => {
        this.snackBar.open('Categoria salva com sucesso', 'OK', { duration: 2000 });
        this.router.navigate(['categoria']); // Volta à listagem
      },
      erro => {
        if(erro.status === 201) {
          this.snackBar.open('Categoria salva com sucesso', 'OK', { duration: 2000 });
          this.router.navigate(['categoria']);
        } else {
          this.snackBar.open('Erro ao salvar a categoria: ' + erro.message, 'OK');
          console.error(erro);
        }
      }
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['categoria']);
    }
  }


}