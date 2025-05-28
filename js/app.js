import Pelicula from "./classPelicula.js";

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
  guardadLocalStorage();
  cardPeliculaAgregada(nuevaPelicula);
  limpiarForm();

  Swal.fire({
    title: "Pelicula agregada!",
    text: `La pelicula ${nuevaPelicula.titulo}, fue agregada correctamente.`,
    icon: "success",
  });
};

const guardadLocalStorage = () => {
  localStorage.setItem("carteleraKey", JSON.stringify(cartelera));
};

const limpiarForm = () => {
  formularioPelicula.reset();
};

const cardPeliculaAgregada = (nuevaPelicula) => {
  cardPeliculas.innerHTML = `<article class="col-12 col-md-4 col-lg-3" id="cardPelicula">
          <div class="card" style="width: 18rem">
            <img src="./assets/${nuevaPelicula.poster}" class="card-img-top" alt="${nuevaPelicula.titulo}, ${nuevaPelicula.director} (${nuevaPelicula.anioEstreno})" />
            <div class="card-body bg-dark-subtle">
              <h5 class="card-title">${nuevaPelicula.titulo}</h5>
              <p class="card-text">${nuevaPelicula.director} (${nuevaPelicula.anioEstreno})</p>
              <div class="d-flex justify-content-between gap-2">
                <button class="btn btn-warning w-100">Editar</button>
                <button
                  class="btn btn-danger w-100"
                >
                  Borrar
                </button>
                <button class="btn btn-info w-100">Ver</button>
              </div>
            </div>
          </div>
        </article>`;
};

const cargarDatosTabla = () => {
  if (cartelera.length !== 0) {
    cartelera.map((nuevaPelicula) => cardPeliculaAgregada(nuevaPelicula));
  }
};

const btnAgregar = document.querySelector("#btnAgregar");
const inputTitulo = document.querySelector("#titulo");
const inputDirector = document.querySelector("#director");
const inputAnioEstreno = document.querySelector("#anioEstreno");
const inputPoster = document.querySelector("#poster");
const cartelera = JSON.parse(localStorage.getItem("carteleraKey")) || [];
const formularioPelicula = document.querySelector(".formPelicula");
const cardPeliculas = document.querySelector(".row");

btnAgregar.addEventListener("click", abrirModal);
formularioPelicula.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarPelicula();
});

cargarDatosTabla();
