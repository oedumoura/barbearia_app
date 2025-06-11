import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {
  selectedDate: string = '';
  selectedTime: string = '';
  selectedBarber: string = '';
  selectedService: any = null;

  horariosDisponiveis: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  barbeiros: { nome: string }[] = [];
  servicos: any[] = [];


  minDate: string = '';
  maxDate: string = '';

  

  ngOnInit() {

    if (!localStorage.getItem('servicos')) {
    const servicosIniciais = [
      {
        nome: 'Corte + Barba',
        preco: 50.00,
        promocao: null
      },

      {
        nome: 'Apenas Barba',
        preco: 25.00,
        promocao: null
      },

      {
        nome: 'Apenas Corte',
        preco: 30.00,
        promocao: null
      }
    ];
    localStorage.setItem('servicos', JSON.stringify(servicosIniciais));
    }

    if (!localStorage.getItem('profissionais')) {
  const profissionaisIniciais = [
    { nome : 'Claudio' },
    { nome : 'João' },
    { nome : 'Flavio' }
  ];
  localStorage.setItem('profissionais', JSON.stringify(profissionaisIniciais));
  }

    this.barbeiros = JSON.parse(localStorage.getItem('profissionais') || '[]');
    console.log('Barbeiros carregados:', this.barbeiros);
    const todosServicos = JSON.parse(localStorage.getItem('servicos') || '[]');
    
    const hoje = new Date();
    this.minDate = hoje.toISOString().split('T')[0]; 
    
    const dataMax = new Date();
    dataMax.setMonth(dataMax.getMonth() + 2); 
    this.maxDate = dataMax.toISOString().split('T')[0];
    const hojeISO = hoje.toISOString();

    this.servicos = todosServicos.map((s: any) => {
      if (
        s.promocao &&
        hoje >= s.promocao.inicio &&
        hoje <= s.promocao.fim
      ) {
        const precoComDesconto = s.preco - (s.preco * (s.promocao.desconto / 100));
        return {
          ...s,
          precoOriginal: s.preco,
          preco: parseFloat(precoComDesconto.toFixed(2)),
          emPromocao: true
        };
      }
      return {
        ...s,
        emPromocao: false
      };
    });
  }

  confirmarAgendamento() {

    if (!this.selectedDate || !this.selectedTime || !this.selectedBarber || !this.selectedService) {
    alert('Por favor, preencha todos os campos para realizar o agendamento.');
    return;
  }
    const cliente = localStorage.getItem('usuarioLogado') || 'Desconhecido';
    const novoAgendamento = {
      data: this.selectedDate,
      hora: this.selectedTime,
      barbeiro: this.selectedBarber,
      servico: this.selectedService?.nome,
      valor: this.selectedService?.preco,
      cliente: cliente
    };

    const agendamentosSalvos = JSON.parse(localStorage.getItem('agendamentos') || '[]');

    const conflito = agendamentosSalvos.find((a: any) =>
      a.data === novoAgendamento.data &&
      a.hora === novoAgendamento.hora &&
      a.barbeiro === novoAgendamento.barbeiro
    );

    if (conflito) {
      alert('Este horário já está agendado com esse barbeiro.');
      return;
    }

    agendamentosSalvos.push(novoAgendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentosSalvos));
    alert('Agendamento confirmado com sucesso!');
  }
}
