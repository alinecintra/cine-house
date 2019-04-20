import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  public usuarios: any;

  public colunasVisiveis: string[] = [
    'nome',
    'email',
    'excluir'
  ];

  // Injeção de dependência no parâmetro do construtor
  constructor(
    private usuarioSrv: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Chamando o service
    this.usuarioSrv.listar().subscribe(
       dados => this.usuarios = dados, // Callback do bem
       erro => console.error(erro) // Callback do mal
    );
  }

  excluir(id: String) {
    if (confirm('Deseja realmente excluir este usuário?')) {
      this.usuarioSrv.excluir(id).subscribe(
        () => {
          this.snackBar.open('Usuário excluído com sucesso', 'OK', { duration: 2000});
          this.ngOnInit(); // Recarrega a lista
        },
        erro => this.snackBar.open('ERRO AO EXCLUIR USUARIO: ' + erro.message, 'OK')
      );
    }
  }
}
