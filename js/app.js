const criptomonedasSelect = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

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

  consultarAPI();
}
function mostraAlerta(mensaje) {
  const alerta = document.querySelector(".error");
  if (!alerta) {
    const mensajeAlerta = document.createElement("div");
    mensajeAlerta.classList.add("error");
    mensajeAlerta.textContent = mensaje;

    formulario.appendChild(mensajeAlerta);

    setTimeout(() => {
      mensajeAlerta.remove();
    }, 3000);
  }
}
function consultarAPI() {
  const { moneda, criptomoneda } = objBusqueda;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  spinner();
  setTimeout(() => {
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((cotizacion) => {
        imprimirCotizacion(cotizacion.DISPLAY[criptomoneda][moneda]);
        console.log(cotizacion.DISPLAY[criptomoneda][moneda]);
      });
  }, 2500);
}
function imprimirCotizacion(cotizacion) {
  // limpiar html
  limpiarHTML();
  const { PRICE, HIGHDAY, LOWDAY, MKTCAP, CHANGEPCT24HOUR } = cotizacion;

  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.innerHTML = `El precio es: </span>${PRICE}</span>`;

  const precioAltoDia = document.createElement("p");
  precioAltoDia.classList.add("precio");
  precioAltoDia.innerHTML = `<p>Precio más alto del día: <span>${HIGHDAY}</span></p>`;

  const precioBajoDia = document.createElement("p");

  precioBajoDia.innerHTML = `<p>Precio más bajo del día: <span>${LOWDAY}</span></p>`;

  const capitalMarket = document.createElement("p");

  capitalMarket.innerHTML = `<p>Capitalización de mercado: <span>${MKTCAP}</span></p>`;

  const variacionUltimas24 = document.createElement("p");

  variacionUltimas24.innerHTML = `<p> Variacion últimas 24H: <span>${CHANGEPCT24HOUR}%</span></p>`;

  resultado.appendChild(precio);
  resultado.appendChild(precioAltoDia);
  resultado.appendChild(precioBajoDia);
  resultado.appendChild(capitalMarket);
  resultado.appendChild(variacionUltimas24);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
function spinner() {
  limpiarHTML();

  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
  
  
  `;

  resultado.appendChild(spinner);
}
