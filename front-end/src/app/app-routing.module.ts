import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';

import { VideoListComponent } from './video/video-list/video-list.component';
import { VideoFormComponent } from './video/video-form/video-form.component';

import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';

const routes: Routes = [
  { path: 'categoria', component: CategoriaListComponent },
  { path: 'categoria/novo', component: CategoriaFormComponent },
  { path: 'categoria/:id', component: CategoriaFormComponent },

  { path: 'video', component: VideoListComponent },
  { path: 'video/novo', component: VideoFormComponent },
  { path: 'video/:id', component: VideoFormComponent },

  { path: 'usuario', component: UsuarioListComponent },
  { path: 'usuario/novo', component: UsuarioFormComponent },
  { path: 'usuario/:id', component: UsuarioFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
