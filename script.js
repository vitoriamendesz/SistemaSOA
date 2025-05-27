const ufMap = {
  "AC": 12, "AL": 27, "AP": 16, "AM": 13,
  "BA": 29, "CE": 23, "DF": 53, "ES": 32,
  "GO": 52, "MA": 21, "MT": 51, "MS": 50,
  "MG": 31, "PA": 15, "PB": 25, "PR": 41,
  "PE": 26, "PI": 22, "RJ": 33, "RN": 24,
  "RS": 43, "RO": 11, "RR": 14, "SC": 42,
  "SP": 35, "SE": 28, "TO": 17
};

async function buscarNome() {
  const nome = document.getElementById('nome').value;
  const decadaInicio = parseInt(document.getElementById('decadaInicio').value);
  const decadaFim = parseInt(document.getElementById('decadaFim').value);

  if (!nome || isNaN(decadaInicio) || isNaN(decadaFim)) {
    alert('Preencha o nome e o intervalo de décadas.');
    return;
  }
  if (decadaInicio > decadaFim) {
    alert('A década inicial deve ser menor ou igual à final.');
    return;
  }

  document.getElementById('resultado').innerHTML = 'Carregando...';

  const resposta = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}?localidade=all`);
  const dados = await resposta.json();

  const filtrados = dados[0].res.filter(item => {
    const decada = parseInt(item.periodo.substring(0, 4));
    return decada >= decadaInicio && decada <= decadaFim;
  });

  const periodos = filtrados.map(item => item.periodo);
  const frequencias = filtrados.map(item => item.frequencia);

  const ctx = document.getElementById('graficoNome').getContext('2d');
  if (window.graficoAtual) window.graficoAtual.destroy();

  window.graficoAtual = new Chart(ctx, {
    type: 'line',
    data: {
      labels: periodos,
      datasets: [{
        label: `Frequência do nome "${nome}" entre ${decadaInicio} e ${decadaFim}`,
        data: frequencias,
        fill: false,
        borderColor: 'blue',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });

  document.getElementById('resultado').innerHTML = `<p>Gráfico gerado para o nome: <strong>${nome}</strong></p>`;
}

async function buscarTop3() {
  const uf = document.getElementById('uf').value.toUpperCase();
  const ufCodigo = ufMap[uf];

  if (!ufCodigo) {
    alert('UF inválida. Selecione uma opção da lista.');
    return;
  }

  const resposta = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking?localidade=${ufCodigo}`);
  const dados = await resposta.json();
  const top3 = dados[0].res.slice(0, 3);

  const tbody = document.querySelector("#tabelaUF tbody");
  tbody.innerHTML = "";

  top3.forEach(item => {
    const linha = `<tr><td>${item.nome}</td><td>${item.frequencia}</td></tr>`;
    tbody.innerHTML += linha;
  });
}

async function compararNomes() {
  const nome1 = document.getElementById('nome1').value;
  const nome2 = document.getElementById('nome2').value;

  if (!nome1 || !nome2) {
    alert('Digite os dois nomes para comparar!');
    return;
  }

  const nomes = [nome1, nome2];
  const datasets = [];
  let labels = [];

  for (const nome of nomes) {
    const resposta = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}?localidade=all`);
    const dados = await resposta.json();
    const res = dados[0].res;
    labels = res.map(r => r.periodo);
    datasets.push({
      label: nome,
      data: res.map(r => r.frequencia),
      borderWidth: 2,
      fill: false
    });
  }

  const ctx = document.getElementById('graficoComparacao').getContext('2d');

  if (window.graficoComparacaoAtual) {
    window.graficoComparacaoAtual.destroy();
  }

  window.graficoComparacaoAtual = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });
}
