const resultsSectionDet = document.querySelector("#resultsSectionDet");
const resultsSectionEqu = document.querySelector("#resultsSectionEqu");
const matrizDet = document.querySelector("#matrizDet");
const matrizEqu = document.querySelector("#matrizEqu");
const inputEqu = document.querySelector("#equacaoInput");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 1000;
canvas.width = 1000;
ctx.translate(canvas.width/2,canvas.height/2)

function calcular() {
  // buscando as informações da matriz
  if (!inputEqu.checked) {
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
    const a = (yb - ya) / (xb - xa);
    // y = ax + b --> Ya = aXa + b --> b = Ya - aXa
    const b = ya - a * xa;

    // y = ax + b --> -ax + y - b = 0
    document.querySelector("#equacao").innerHTML = `${-a}x + y ${
      -b > 0 ? "+ " + -b : -b
    } = 0`;
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
  if (!confirm("Você tem certeza que quer apagar os dados da matriz?")) return; // confirma se o usuario quer limpar a matriz

  const matrizInputs = document.querySelectorAll(".matriz-value");
  for (let i = 0; i < matrizInputs.length; i++) {
    matrizInputs[i].value = "";
  }

  document.querySelector("#resultsSection").style.display = "none";
}
