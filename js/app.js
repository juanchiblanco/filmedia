import Pelicula from "./classPelicula";

const abrirModal = () => {
  const modalContacto = new bootstrap.Modal(
    document.querySelector("#modalContacto")
  );
  modalContacto.show();
};

const agregarPelicula = () => {
  const nuevaPelicula = new Pelicula(
    inputTitulo.value,
    inputDirector.value,
    inputAnioEstreno.value,
    inputPoster.value
  );
  cartelera.push(nuevaPelicula);
  guardadLocalStorage()
  limpiarForm()
};

const guardadLocalStorage = () => {
  localStorage.setItem("carteleraKey", JSON.stringify(cartelera));
};

const limpiarForm = () => {
  formularioPelicula.reset();
};

const btnAgregar = document.querySelector("#btnAgregar");
const inputTitulo = document.querySelector("#titulo");
const inputDirector = document.querySelector("#director");
const inputAnioEstreno = document.querySelector("#anioEstreno");
const inputPoster = document.querySelector("#poster");
const cartelera = JSON.parse(localStorage.getItem("carteleraKey")) || [];
const formularioPelicula = document.querySelector(".formPelicula");

btnAgregar.addEventListener("click", abrirModal);
formularioPelicula.addEventListener("submit", (e) => {
  e.preventDefault();
});
