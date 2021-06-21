import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from './../../models/atendimento.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {
 
  atendimento: Atendimento = new Atendimento();  
  formGroup: FormGroup;

  constructor(
    private formBuild: FormBuilder, 
    private service: CadastroService, 
    private router: Router,
    private activateRouter: ActivatedRoute) { 
      activateRouter.params.subscribe(param =>{
        if(param.id){
          this.buscarId(param.id);         
        }
      })
    }

  ngOnInit(): void {
    this.formGroup = this.formBuild.group(
      {
        nomeCliente: [this.atendimento.nomeCliente, Validators.required],
        apelidoCliente: [this.atendimento.apelidoCliente],
        dataAtendimento:[this.atendimento.dataAtendimento],
        horarioAtendimento: [this.atendimento.horarioAtendimento],
        nomeFuncionario: [this.atendimento.nomeFuncionario],
        nomeServico: [this.atendimento.nomeServico],
        valorServico: [this.atendimento.valorServico]
      }
    );
  }

  salvarAtendimento(): void {
    this.atendimento.nomeCliente = this.formGroup.get('nomeCliente')!.value;
    this.atendimento.apelidoCliente = this.formGroup.get('apelidoCliente')!.value;
    this.atendimento.dataAtendimento = this.formGroup.get('dataAtendimento')!.value;
    this.atendimento.horarioAtendimento = this.formGroup.get('horarioAtendimento')!.value;
    this.atendimento.nomeFuncionario = this.formGroup.get('nomeFuncionario')!.value;
    this.atendimento.nomeServico = this.formGroup.get('nomeServico')!.value;
    this.atendimento.valorServico = this.formGroup.get('valorServico')!.value;

    if (this.atendimento.id == null) {
      this.service.salvar(this.atendimento).subscribe(
        (atendimento) => {
          alert('Cliente ' + atendimento.nomeCliente+ ' cadastrada com sucesso!')
          this.router.navigate(['/listagem']);
        },
        (erro) => alert('O atendimento não pode ser salvo, tente novamente!')
      );    
    } else {
      this.service.editar(this.atendimento.id, this.atendimento).subscribe(
        (atendimento) => {
          alert('Cliente ' + atendimento.nomeCliente+ ' alterado com sucesso!')
          this.router.navigate(['/listagem']);
        },
        (erro) => alert('O atendimento não pode ser alterado, tente novamente!')
      ); 
    }   
  }

  private buscarId(id: number){
    this.service.buscarId(id).subscribe((atendimento)=>{
      this.atendimento = atendimento;
      this.ngOnInit(); 
    });
  }
}