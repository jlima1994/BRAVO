let dados = {
  tipoServico: "",
  data: "",
  descricao: "",
  placa: "",
  motorista: "",
  seguranca: "",
  deslocamentoInicio: {},
  servicoInicio: {},
  servicoFim: {},
  deslocamentoFim: {},
  pedagios: []
};

// ================= PAGE 1 =================
function pagina1() {
  app.innerHTML = `
  <div class="container">
    <h2>Escolha a Opção</h2>
    <button onclick="pagina2()">Inserir Registro</button>
    <button onclick="pagina10()">Gerar Relatório</button>
  </div>`;
}

// ================= PAGE 2 =================
function pagina2() {
  app.innerHTML = `
  <div class="container">
    <h2>Tipo de Serviço</h2>

    <input type="date" id="data">

    <label><input type="radio" name="tipo" value="Escolta"> Escolta</label>
    <label><input type="radio" name="tipo" value="Preservação"> Preservação</label>

    <input placeholder="Descrição do Serviço" id="desc">

    <button onclick="salvarPagina2()">Gravar</button>
  </div>`;
}

function salvarPagina2() {
  dados.tipoServico = document.querySelector('input[name="tipo"]:checked')?.value;
  dados.data = document.getElementById("data").value;
  dados.descricao = document.getElementById("desc").value;
  pagina3();
}

// ================= PAGE 3 =================
function pagina3() {
  app.innerHTML = `
  <div class="container">
    <h2>Equipe</h2>

    <input placeholder="Placa" id="placa">
    <input placeholder="Motorista" id="motorista">
    <input placeholder="Segurança" id="seguranca">

    <button onclick="salvarPagina3()">Gravar</button>
  </div>`;
}

function salvarPagina3() {
  let placa = document.getElementById("placa").value.toUpperCase().trim();

  // Regex placa BR (antiga + Mercosul)
  let regex = /^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/;

  if (!regex.test(placa)) {
    alert("PLACA INVÁLIDA! USE EX: ABC-1234 OU ABC-1D23");
    return;
  }

  // Padroniza com hífen
  if (!placa.includes("-")) {
    placa = placa.slice(0,3) + "-" + placa.slice(3);
  }

  dados.placa = placa;
  dados.motorista = document.getElementById("motorista").value;
  dados.seguranca = document.getElementById("seguranca").value;

  pagina4();
}

// ================= PAGE 4 =================
function pagina4() {
  app.innerHTML = `
  <div class="container">
    <h2>Deslocamento Inicial</h2>

    <input type="time" id="hora">
    <input type="number" id="km">

    <button onclick="salvarP4()">Gravar</button>
  </div>`;
}

function salvarP4() {
  dados.deslocamentoInicio = {
    hora: hora.value,
    km: km.value
  };
  pagina5();
}

// ================= PAGE 5 =================
function pagina5() {
  app.innerHTML = `
  <div class="container">
    <h2>Inicio ${dados.tipoServico}</h2>

    <input type="time" id="hora">
    <input type="number" id="km">

    <button onclick="salvarP5()">Gravar</button>
  </div>`;
}

function salvarP5() {
  dados.servicoInicio = { hora: hora.value, km: km.value };
  pagina6();
}

// ================= PAGE 6 =================
function pagina6() {
  app.innerHTML = `
  <div class="container">
    <h2>Final ${dados.tipoServico}</h2>

    <input type="time" id="hora">
    <input type="number" id="km">

    <button onclick="salvarP6()">Gravar</button>
  </div>`;
}

function salvarP6() {
  dados.servicoFim = { hora: hora.value, km: km.value };
  pagina7();
}

// ================= PAGE 7 =================
function pagina7() {
  app.innerHTML = `
  <div class="container">
    <h2>Deslocamento Final</h2>

    <input type="time" id="hora">
    <input type="number" id="km">

    <button onclick="salvarP7()">Gravar</button>
  </div>`;
}

function salvarP7() {
  dados.deslocamentoFim = { hora: hora.value, km: km.value };
  pagina8();
}

// ================= PAGE 8 =================
function pagina8() {
  let html = '<div class="container">';
  html += '<h2>Pedágios</h2>';

  for (let i = 0; i < 10; i++) {
    html += `
      <div style="display:flex; gap:10px; margin-bottom:10px;">
        
        <select id="q${i}" style="flex:1;">
          ${[...Array(21).keys()].map(n => `<option value="${n}">${n}</option>`).join("")}
        </select>

        <input 
          id="v${i}" 
          type="number" 
          step="0.01" 
          max="100" 
          placeholder="Valor (R$)"
          style="flex:2;"
        >

      </div>
    `;
  }

  html += `
    <button onclick="salvarP8()">Gravar</button>
  </div>
  `;

  document.getElementById("app").innerHTML = html;
}

function salvarP8() {
  dados.pedagios = [];

  for (let i = 0; i < 10; i++) {
    let q = parseInt(document.getElementById(`q${i}`).value);
    let v = document.getElementById(`v${i}`).value;

    if (q > 0 && v !== "") {
      dados.pedagios.push({
        quantidade: q,
        valor: v
      });
    }
  }

  pagina9();
}

// ================= PAGE 9 =================
function pagina9() {

  let totalKM = Number(dados.deslocamentoFim.km) - Number(dados.deslocamentoInicio.km);

  let pedagiosTexto = dados.pedagios.map(p =>
    `${p.quantidade}X R$ ${p.valor}`
  ).join("<br>");

  app.innerHTML = `
  <div class="container">

    <p>
      ${formatarDataBR(dados.data)}<br>
      <strong>${dados.tipoServico.toUpperCase()} ${dados.descricao.toUpperCase()}</strong>
    </p>

    <p>
      EQUIPE:<br>
      VEÍCULO: ${dados.placa.toUpperCase()}<br>
      MOT: ${dados.motorista.toUpperCase()}<br>
      SEG: ${dados.seguranca.toUpperCase()}
    </p>

    <p>
      DESLOCAMENTO: ${dados.deslocamentoInicio.km} ${dados.deslocamentoInicio.hora}<br>
      INÍCIO ${dados.tipoServico.toUpperCase()}: ${dados.servicoInicio.km} ${dados.servicoInicio.hora}<br>
      FINAL ${dados.tipoServico.toUpperCase()}: ${dados.servicoFim.km} ${dados.servicoFim.hora}<br>
      DESLOCAMENTO: ${dados.deslocamentoFim.km} ${dados.deslocamentoFim.hora}
    </p>

    <p>
      DESLOCAMENTO TOTAL: ${totalKM} KM
    </p>

    <p>
      PEDÁGIOS:<br>
      ${pedagiosTexto || "NENHUM"}
    </p>

    <button onclick="pagina1()">FINALIZAR</button>
    <button onclick="copiarResenha()">COPIAR RESENHA</button>
    <button onclick="pagina1()">FINALIZAR</button>

  </div>`;
}
// ================= PAGE 10 =================
function pagina10() {
  app.innerHTML = `
  <div class="container">
    <h2>Relatório</h2>

    <label><input type="radio" name="tipoPessoa" value="Motorista"> Motorista</label>
    <label><input type="radio" name="tipoPessoa" value="Segurança"> Segurança</label>

    <input type="date" id="de">
    <input type="date" id="ate">

    <input placeholder="Nome">

    <button onclick="pagina11()">Gerar</button>
  </div>`;
}

// ================= PAGE 11 =================
function pagina11() {
  app.innerHTML = `
  <div class="container">
    <h2>Tabela (Exemplo)</h2>

    <table border="1" width="100%">
      <tr>
        <th>Data</th>
        <th>Tipo</th>
        <th>KM Inicial</th>
        <th>KM Final</th>
        <th>KM Total</th>
        <th>Diária</th>
      </tr>
      <tr>
        <td>${dados.data}</td>
        <td>${dados.tipoServico}</td>
        <td>${dados.deslocamentoInicio.km}</td>
        <td>${dados.deslocamentoFim.km}</td>
        <td>${dados.deslocamentoFim.km - dados.deslocamentoInicio.km}</td>
        <td>190</td>
      </tr>
    </table>

    <button onclick="window.print()">Imprimir</button>
  </div>`;
}

// INIT
pagina1();

function formatarDataBR(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}
