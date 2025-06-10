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

  barbeiros: string[] = [];
  servicos: any[] = [];

  ngOnInit() {
    this.barbeiros = JSON.parse(localStorage.getItem('profissionais') || '[]');
    const todosServicos = JSON.parse(localStorage.getItem('servicos') || '[]');
    const hoje = new Date().toISOString();

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
