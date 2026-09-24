const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
toggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  if (glow) glow.style.transform = `translate(${event.clientX - 210}px, ${event.clientY - 210}px)`;
});

const form = document.querySelector('#diagnostic-form');
const result = document.querySelector('#diagnostic-result');
const whatsappNumber = '5561984505306';
let briefing = '';

const diagnosticRoutes = [
  {
    terms: ['site', 'website', 'landing page', 'página', 'pagina', 'presença digital', 'presenca digital', 'portfólio', 'portfolio'],
    type: 'Site & experiência digital',
    description: 'O caminho mais provável é estruturar uma presença digital que explique sua proposta, transmita confiança e conduza o visitante a uma ação clara.',
    flow: ['Objetivo comercial', 'Conteúdo e estrutura', 'Design e construção', 'Publicação e melhoria']
  },
  {
    terms: ['whatsapp', 'lead', 'cliente', 'orçamento', 'orcamento', 'venda', 'follow-up', 'atendimento', 'proposta'],
    type: 'Organização comercial',
    description: 'Seu relato aponta para uma jornada comercial mais organizada, com informações centralizadas e próximos passos visíveis para ninguém ficar sem retorno.',
    flow: ['Entrada do contato', 'Qualificação', 'Próxima ação', 'Histórico e acompanhamento']
  },
  {
    terms: ['planilha', 'papel', 'manual', 'repetitiv', 'copiar', 'digitar', 'demora', 'retrabalho'],
    type: 'Automação de processo',
    description: 'Existe potencial para reduzir trabalho manual conectando as etapas do processo e automatizando apenas o que for previsível e seguro.',
    flow: ['Mapear a rotina', 'Identificar repetição', 'Automatizar etapas', 'Acompanhar exceções']
  },
  {
    terms: ['agendamento', 'agenda', 'reserva', 'horário', 'horario', 'fila', 'espera', 'cancelamento'],
    type: 'Experiência de atendimento',
    description: 'O desafio parece estar na organização da demanda e na comunicação com o cliente. Uma experiência simples pode reduzir espera, conflitos e horários perdidos.',
    flow: ['Solicitação', 'Disponibilidade', 'Confirmação', 'Acompanhamento']
  },
  {
    terms: ['controle', 'estoque', 'equipamento', 'chave', 'inventário', 'inventario', 'checklist', 'turno', 'projeto', 'tarefa'],
    type: 'Sistema de controle operacional',
    description: 'Seu cenário pede uma ferramenta enxuta para registrar responsáveis, status e histórico sem depender de memória ou informações espalhadas.',
    flow: ['Registrar', 'Atribuir responsável', 'Atualizar status', 'Consultar histórico']
  }
];

function analyzeProblem(problem) {
  const normalized = problem.toLocaleLowerCase('pt-BR');
  return diagnosticRoutes.find(route => route.terms.some(term => normalized.includes(term))) || {
    type: 'Mapeamento digital sob medida',
    description: 'O problema precisa ser entendido dentro da rotina do negócio antes de escolher a tecnologia. O primeiro passo é mapear causas, pessoas envolvidas e impacto.',
    flow: ['Entender o contexto', 'Mapear o processo', 'Prototipar uma saída', 'Validar com uso real']
  };
}

form?.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const business = document.querySelector('#business').value.trim();
  const contact = document.querySelector('#contact').value.trim();
  const problem = document.querySelector('#problem').value.trim();
  const diagnosis = analyzeProblem(problem);
  briefing = `Pré-diagnóstico — ${business}\nNome: ${name}\nContato: ${contact}\nProblema: ${problem}\nCaminho sugerido: ${diagnosis.type}\nLeitura inicial: ${diagnosis.description}\nFluxo: ${diagnosis.flow.join(' → ')}`;
  document.querySelector('#send-whatsapp').href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(briefing)}`;
  document.querySelector('#result-title').textContent = `${name}, identificamos um caminho inicial.`;
  document.querySelector('#result-problem').textContent = diagnosis.description;
  document.querySelector('#result-type').textContent = diagnosis.type;
  document.querySelector('#result-flow').innerHTML = diagnosis.flow
    .map((step, index) => `${index ? '<b>→</b>' : ''}<span>${step}</span>`)
    .join('');
  form.hidden = true;
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
document.querySelector('#restart')?.addEventListener('click', () => {
  result.hidden = true;
  form.hidden = false;
  document.querySelector('#send-whatsapp').href = '#';
});
document.querySelector('#copy-result')?.addEventListener('click', async event => {
  await navigator.clipboard.writeText(briefing);
  const button = event.currentTarget;
  const previous = button.textContent;
  button.textContent = 'Pré-diagnóstico copiado ✓';
  setTimeout(() => button.textContent = previous, 1800);
});
document.querySelector('#year').textContent = new Date().getFullYear();
