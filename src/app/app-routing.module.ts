import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { HomeComponent } from './modules/home/home.component';
import { ListagemComponent } from './modules/listagem/listagem.component';

const routes: Routes = [

  {
    path: 'listagem',
    component: ListagemComponent
  },
  {
    path: 'editar/:id',
    component: CadastroComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
