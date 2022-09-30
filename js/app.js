const criptomonedasSelect = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");

const objBusqueda = {
  moneda: "",
  criptomoneda: "",
};

document.addEventListener("DOMContentLoaded", () => {
  consultarCriptomonedas();

  formulario.addEventListener("submit", submitFormulario);

  criptomonedasSelect.addEventListener("change", leerValor);
  monedaSelect.addEventListener("change", leerValor);
});

function consultarCriptomonedas() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log(resultado.Data);
      selectCriptomonedas(resultado.Data);
    });
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;

    const option = document.createElement("option");

    option.value = Name;
    option.textContent = FullName;
    criptomonedasSelect.appendChild(option);
  });
}
function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;

  console.log(objBusqueda);
}
function submitFormulario(e) {
  e.preventDefault();

  //validar

  const { moneda, criptomoneda } = objBusqueda;

  if (moneda === "" || criptomoneda === "") {
    mostraAlerta("Ambos campos son obligatorios");
    return;
  }

  // consultamos la api
}
function mostraAlerta(mensaje) {
  const alerta = document.querySelector(".alert");
  if (!alerta) {
    const mensajeAlerta = document.createElement("div");
    mensajeAlerta.classList.add("error", "alert");
    mensajeAlerta.textContent = mensaje;

    formulario.appendChild(mensajeAlerta);

    setTimeout(() => {
      mensajeAlerta.remove();
    }, 3000);
  }
}
