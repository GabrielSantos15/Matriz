const resultsSectionDet = document.querySelector("#resultsSectionDet");
const resultsSectionEqu = document.querySelector("#resultsSectionEqu");
const matrizDet = document.querySelector("#matrizDet");
const matrizEqu = document.querySelector("#matrizEqu");
const inputEqu = document.querySelector("#equacaoInput");

google.charts.load("current", { packages: ["corechart"] });

function calcular() {
  // verifica se a calculadora esta no modo Equação geral da reta
  if (!inputEqu.checked) {
    // buscando as informações da matriz
    const n1 = Number(document.querySelector("#n1").value);
    const n2 = Number(document.querySelector("#n2").value);
    const n3 = Number(document.querySelector("#n3").value);
    const n4 = Number(document.querySelector("#n4").value);
    const n5 = Number(document.querySelector("#n5").value);
    const n6 = Number(document.querySelector("#n6").value);
    const n7 = Number(document.querySelector("#n7").value);
    const n8 = Number(document.querySelector("#n8").value);
    const n9 = Number(document.querySelector("#n9").value);

    let matriz = [
      [n1, n2, n3],
      [n4, n5, n6],
      [n7, n8, n9],
    ];

    //   mostra o resultado
    resultsSectionEqu.style.display = "none";
    resultsSectionDet.style.display = "flex";
    document.querySelector("#det").innerHTML = determinante(matriz);
    document.querySelector("#alinhamento3P").innerHTML =
      determinante(matriz) === 0 ? "Alinhados" : "Não alinhados";

    // Calcula a região trianguar com a formula |D|/2
    document.querySelector("#triangular").innerHTML =
      Math.abs(determinante(matriz)) / 2;
  } else {
    // buscando os dados do ponta A e B
    const xa = Number(document.querySelector("#xa").value);
    const ya = Number(document.querySelector("#ya").value);
    const xb = Number(document.querySelector("#xb").value);
    const yb = Number(document.querySelector("#yb").value);

    resultsSectionEqu.style.display = "flex";
    resultsSectionDet.style.display = "none";

    // formula padrão:
    // Xa*Yb*1 + Ya*1*x + 1*Xb*y - 1*Yb*X - Xa*1*Y - Ya*Xb*1 = 0

    // feito com base no video: https://www.youtube.com/watch?v=j0dU93bKML8
    // y = ax + b

    // a = Δy/Δx
    let a = (yb - ya) / (xb - xa);
    // y = ax + b --> Ya = aXa + b --> b = Ya - aXa
    let b = ya - a * xa;

    // abreviando
    a = Math.round(a*1000)/1000
    b = Math.round(b*1000)/1000

    // y = ax + b --> -ax + y - b = 0
    document.querySelector("#equacao").innerHTML = `${-a}x + y ${
      -b > 0 ? "+ " + -b: "- " + b
    } = 0`;

    // Chamando API do google para adicionar o gráfico
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["X", "Y"],
        [xa, ya],
        [xb, yb],
      ]);

      var options = {
        chartArea: { width: "80%", height: "65%" },
        hAxis: { title: "X", minValue: -10, maxValue: 10 },
        vAxis: { title: "Y", minValue: -10, maxValue: 10 },
        legend: "none",
        colors: ["#147529"],
        trendlines: { 0: {} }, // Draw a trendline for data series 0.
      };

      var chart = new google.visualization.ScatterChart(
        document.getElementById("grafico")
      );
      chart.draw(data, options);
    }
  }
}

function determinante(m) {
  // função calcula a matriz usando a regra de Sarrus
  // a função só funciona para matrizes 3x3
  return (
    m[0][0] * m[1][1] * m[2][2] +
    m[0][1] * m[1][2] * m[2][0] +
    m[0][2] * m[1][0] * m[2][1] -
    (m[0][2] * m[1][1] * m[2][0] +
      m[0][0] * m[1][2] * m[2][1] +
      m[0][1] * m[1][0] * m[2][2])
  );
}

function equacaoSelect() {
  if (inputEqu.checked) {
    matrizDet.style.display = "none";
    matrizEqu.style.display = "grid";
  } else {
    matrizDet.style.display = "grid";
    matrizEqu.style.display = "none";
  }
}

function limpar() {
  resultsSectionEqu.style.display = "none";
  resultsSectionDet.style.display = "none";

  navigator.vibrate(250); // vibra o celular por 250ms.

  const matrizInputs = document.querySelectorAll(".matriz-value");
  for (let i = 0; i < matrizInputs.length; i++) {
    matrizInputs[i].value = "";
  }

  document.querySelector("#resultsSection").style.display = "none";
}

function recuperarDarkMode() {
  const storageDark = localStorage.getItem("dark");
  if (storageDark) darkMode();
}
recuperarDarkMode();

function darkMode() {
  const body = document.querySelector("body");
  const buttonDarkMode = document.querySelector("#darkMode");
  
  localStorage.clear();
  
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    buttonDarkMode.innerHTML = "light_mode";
  } else {
    body.classList.add("dark");
    localStorage.setItem("dark", 1);
    
    buttonDarkMode.innerHTML = "dark_mode";
  }
}