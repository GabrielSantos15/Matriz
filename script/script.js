const n1 = document.querySelector("#n1")
const n2 = document.querySelector("#n2")
const n3 = document.querySelector("#n3")
const n4 = document.querySelector("#n4")
const n5 = document.querySelector("#n5")
const n6 = document.querySelector("#n6")
const n7 = document.querySelector("#n7")
const n8 = document.querySelector("#n8")
const n9 = document.querySelector("#n9")

function calcular() {
    let matriz =
        [
            [n1.value, n2.value, n3.value],
            [n4.value, n5.value, n6.value],
            [n7.value, n8.value, n9.value]
        ]

    console.table(matriz)
}
