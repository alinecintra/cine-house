import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { MatSnackBar } from '@angular/material';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private videoSrv: VideoService,
    private snackBar: MatSnackBar,
    private categoriaSrv: CategoriaService
  ) { }

  public titulo: String = 'Novo Vídeo';

  public video: any = {}; // Vetor vazio
  public categorias: any = [];

  ngOnInit() {

    this.video = {};
    // Pedimos para que o ActivatedRoute busque para nós os parâmetros da url
    this.actRoute.params.subscribe(  // Chamada assíncrona
      params => {
        if (params.id) { // Se existir um parâmetro chamado id
          // 1) Vamos buscar os dados do objeto no back-end
          this.videoSrv.obterUm(params.id).subscribe(
            obj => { // Callback se OK
              this.video = obj;
              this.video.categoria = (this.video.categoria || {})._id;
              console.log(this.video);
              this.titulo = 'Editar vídeo';
            },
            erro => console.error(erro) // Callback se erro
          );
        }
      }
    );

    this.categoriaSrv.listar().subscribe(
      list => {
        this.categorias = list;
      },
      erro => console.log(erro)
    );
  }

  salvar() {
    let retorno: any;
    console.log(this.video)
    if (this.video._id) {
      retorno = this.videoSrv.atualizar(this.video._id, this.video);
    } else {
      retorno = this.videoSrv.novo(this.video);
    }
    retorno.subscribe(
      () => {
        this.snackBar.open('Vídeo salvo com sucesso', 'OK', { duration: 2000 });
        this.router.navigate(['video']); // Volta à listagem
      },
      erro => {
        if(erro.status === 201) {
          this.snackBar.open('Vídeo salvo com sucesso', 'OK', { duration: 2000 });
          this.router.navigate(['video']);
        } else {
          this.snackBar.open('Erro ao salvar o vídeo: ' + erro.message, 'OK');
          console.error(erro);
        }
      }
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['video']);
    }
  }


}