import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  public videos: any;

  public colunasVisiveis: string[] = [
    'descricao',
    'duracao',
    'resumo',
    'categoria',    
    'excluir'
  ];

  // Injeção de dependência no parâmetro do construtor
  constructor(
    private videoSrv: VideoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Chamando o service
    this.videoSrv.listar().subscribe(
       dados => this.videos = dados, // Callback do bem
       erro => console.error(erro) // Callback do mal
    );
  }

  excluir(id: String) {
    if (confirm('Deseja realmente excluir este vídeo?')) {
      this.videoSrv.excluir(id).subscribe(
        () => {
          this.snackBar.open('Vídeo excluído com sucesso', 'OK', { duration: 2000});
          this.ngOnInit(); // Recarrega a lista
        },
        erro => this.snackBar.open('ERRO AO EXCLUIR VÍDEO: ' + erro.message, 'OK')
      );
    }
  }

}
