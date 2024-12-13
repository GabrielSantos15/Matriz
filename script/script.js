const resultsSection = document.querySelector("#resultsSection")

function calcular() {
  // buscando as informações da matriz
  const n1 = parseFloat(document.querySelector("#n1").value);
  const n2 = parseFloat(document.querySelector("#n2").value);
  const n3 = parseFloat(document.querySelector("#n3").value);
  const n4 = parseFloat(document.querySelector("#n4").value);
  const n5 = parseFloat(document.querySelector("#n5").value);
  const n6 = parseFloat(document.querySelector("#n6").value);
  const n7 = parseFloat(document.querySelector("#n7").value);
  const n8 = parseFloat(document.querySelector("#n8").value);
  const n9 = parseFloat(document.querySelector("#n9").value);

  let matriz = [
    [n1, n2, n3],
    [n4, n5, n6],
    [n7, n8, n9],
  ];

  //   mostra o resultado
  resultsSection.style.display = "flex"
  document.querySelector("#det").innerHTML = determinante(matriz);
  document.querySelector("#alinhamento3P").innerHTML = determinante(matriz) === 0 ? "Alinhados":"Não alinhados";

  document.querySelector("#triangular").innerHTML = Math.abs(determinante(matriz))/2;
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

function limpar() {
   if(!confirm("Você tem certeza que quer apagar os dados da matriz?"))return // confirma se o usuario quer limpar a matriz

  const matrizInputs = document.querySelectorAll(".matriz-value");
  for (let i = 0; i < matrizInputs.length; i++) {
    matrizInputs[i].value = ''
  }

  document.querySelector("#resultsSection").style.display = 'none'
}
