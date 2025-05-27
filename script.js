document.addEventListener("DOMContentLoaded", () => {
    carregarUFs();
  });
  
  async function buscarEvolucaoNome() {
    const nome = document.getElementById("nome1").value;
    const inicio = parseInt(document.getElementById("inicio1").value);
    const fim = parseInt(document.getElementById("fim1").value);
  
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}`);
    const data = await response.json();
  
    const decadas = [];
    const quantidades = [];
  
    data[0].res.forEach((item) => {
      const periodo = item.periodo.match(/\d{4}/g);
      const decada = parseInt(periodo[0]);
      if (decada >= inicio && decada <= fim) {
        decadas.push(decada);
        quantidades.push(item.frequencia);
      }
    });
  
    const ctx = document.getElementById("graficoEvolucao").getContext("2d");
    if (window.graficoEvolucaoChart) {
      window.graficoEvolucaoChart.destroy();
    }
    window.graficoEvolucaoChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: decadas,
        datasets: [{
          label: `Frequência de '${nome}'`,
          data: quantidades,
          backgroundColor: "rgba(0, 64, 128, 0.2)",
          borderColor: "#004080",
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Década'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Frequência'
            },
            beginAtZero: true
          }
        }
      },
    });
  }
  
  async function buscarTopNomesUF() {
    const uf = document.getElementById("uf").value;
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking?localidade=${uf}`);
    const data = await response.json();
  
    const tabela = document.getElementById("tabelaLocalidade");
    tabela.innerHTML = "<tr><th>Nome</th><th>Frequência</th></tr>";
  
    data[0].res.slice(0, 3).forEach((item) => {
      const row = `<tr><td>${item.nome}</td><td>${item.frequencia}</td></tr>`;
      tabela.innerHTML += row;
    });
  }
  
  async function compararNomes() {
    const nome1 = document.getElementById("nome2a").value;
    const nome2 = document.getElementById("nome2b").value;
  
    const response1 = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome1}`);
    const response2 = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome2}`);
    const data1 = await response1.json();
    const data2 = await response2.json();
  
    const labels = data1[0].res.map(r => r.periodo.substring(0, 4));
    const dados1 = data1[0].res.map(r => r.frequencia);
    const dados2 = data2[0].res.map(r => r.frequencia);
  
    const ctx = document.getElementById("graficoComparacao").getContext("2d");
    if (window.graficoComparacaoChart) {
      window.graficoComparacaoChart.destroy();
    }
    window.graficoComparacaoChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: nome1,
            data: dados1,
            borderColor: "#ff6384",
            borderWidth: 2,
          },
          {
            label: nome2,
            data: dados2,
            borderColor: "#36a2eb",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Década'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Frequência'
            },
            beginAtZero: true
          }
        }
      },
    });
  }
  
  function carregarUFs() {
    const ufs = [
      { sigla: "12", nome: "Acre" }, { sigla: "27", nome: "Alagoas" },
      { sigla: "13", nome: "Amazonas" }, { sigla: "16", nome: "Amapá" },
      { sigla: "29", nome: "Bahia" }, { sigla: "23", nome: "Ceará" },
      { sigla: "53", nome: "Distrito Federal" }, { sigla: "32", nome: "Espírito Santo" },
      { sigla: "52", nome: "Goiás" }, { sigla: "21", nome: "Maranhão" },
      { sigla: "51", nome: "Mato Grosso" }, { sigla: "50", nome: "Mato Grosso do Sul" },
      { sigla: "31", nome: "Minas Gerais" }, { sigla: "15", nome: "Pará" },
      { sigla: "25", nome: "Paraíba" }, { sigla: "41", nome: "Paraná" },
      { sigla: "26", nome: "Pernambuco" }, { sigla: "22", nome: "Piauí" },
      { sigla: "33", nome: "Rio de Janeiro" }, { sigla: "24", nome: "Rio Grande do Norte" },
      { sigla: "43", nome: "Rio Grande do Sul" }, { sigla: "11", nome: "Rondônia" },
      { sigla: "14", nome: "Roraima" }, { sigla: "42", nome: "Santa Catarina" },
      { sigla: "35", nome: "São Paulo" }, { sigla: "28", nome: "Sergipe" },
      { sigla: "17", nome: "Tocantins" }
    ];
    const select = document.getElementById("uf");
    ufs.forEach((uf) => {
      const option = document.createElement("option");
      option.value = uf.sigla;
      option.text = uf.nome;
      select.add(option);
    });
  }
