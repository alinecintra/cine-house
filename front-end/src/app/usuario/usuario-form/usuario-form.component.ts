import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private usuarioSrv: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  public titulo: String = 'Novo Usuário';

  public usuario: any = {}; // Vetor vazio

  ngOnInit() {

    // Pedimos para que o ActivatedRoute busque para nós os parâmetros da url
    this.actRoute.params.subscribe(  // Chamada assíncrona
      params => {
        if (params.id) { // Se existir um parâmetro chamado id
          // 1) Vamos buscar os dados do objeto no back-end
          this.usuarioSrv.obterUm(params.id).subscribe(
            obj => { // Callback se OK
              this.usuario = obj;
              this.usuario.senha = '';
              console.log(obj);
              this.titulo = 'Editar usuário';
            },
            erro => console.error(erro) // Callback se erro
          );
        }
      }
    );
  }

  salvar() {
    let retorno: any;
    if (this.usuario._id) {
      retorno = this.usuarioSrv.atualizar(this.usuario._id, this.usuario);
    } else {
      retorno = this.usuarioSrv.novo(this.usuario);
    }
    retorno.subscribe(
      () => {
        this.snackBar.open('Usuário salvo com sucesso', 'OK', { duration: 2000 });
        this.router.navigate(['usuario']); // Volta à listagem
      },
      erro => {
        if(erro.status === 201) {
          this.snackBar.open('Usuário salvo com sucesso', 'OK', { duration: 2000 });
          this.router.navigate(['usuario']);
        } else {
          this.snackBar.open('Erro ao salvar o usuário: ' + erro.message, 'OK');
          console.error(erro);
        }
      }
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['usuario']);
    }
  }


}