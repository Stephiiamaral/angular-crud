import { CadastroService } from './../cadastro/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/models/atendimento.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  displayedColumns = ['nomeCliente', 'apelidoCliente', 'dataAtendimento', 'horarioAtendimento', 'nomeFuncionario', 'nomeServico', 'valorServico']

  atendimentos: Atendimento[];
  isLoading: boolean;

  constructor(private cadastroService: CadastroService, private router: Router) { }

  ngOnInit(): void {
    this.buscarDados();
  }

  buscarDados(){
    this.isLoading = true;
    this.cadastroService.listar().subscribe(atendimentos => {
      this.atendimentos = atendimentos
      console.log(atendimentos)
    }).add(() => this.isLoading = false)
  }

  editar(id: number){
    this.router.navigate(['/editar', id]);
  }

  excluir(id: number){
    if(confirm("Deseja realmente excluir o atendimento?")){
      this.cadastroService.excluir(id).subscribe(
        () => { 
          alert("Excluído com sucesso!")
          this.buscarDados();
        },
        () => alert("Não foi possível excluir atendimento")
      );
    }        
  }

  incluir(){
    this.router.navigate(['/cadastro']);
  }
}
