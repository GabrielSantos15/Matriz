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
  document.querySelector("#det").innerHTML = determinante(matriz);
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
