import Pelicula from "./classPelicula.js";

const abrirModal = () => {
  modalContacto.show();
  creandoPelicula = true;
};

const agregarPelicula = () => {
  const nuevaPelicula = new Pelicula(
    inputTitulo.value,
    inputDirector.value,
    inputAnioEstreno.value
  );
  cartelera.push(nuevaPelicula);
  guardarLocalStorage();
  cardPeliculaAgregada(nuevaPelicula);
  limpiarForm();

  Swal.fire({
    title: "Pelicula agregada!",
    text: `La pelicula ${nuevaPelicula.titulo}, fue agregada correctamente.`,
    icon: "success",
  });
};

const guardarLocalStorage = () => {
  localStorage.setItem("newCarteleraKey", JSON.stringify(cartelera));
};

const limpiarForm = () => {
  formularioPelicula.reset();
};

const cardPeliculaAgregada = (nuevaPelicula) => {
  cardPeliculas.innerHTML += `<article class="col-12 col-md-4 col-lg-3" id="cardPelicula">
          <div class="card" style="width: 18rem">
            <img src="./assets/${nuevaPelicula.poster}" class="card-img-top" alt="${nuevaPelicula.titulo}, ${nuevaPelicula.director} (${nuevaPelicula.anioEstreno})" />
            <div class="card-body bg-dark-subtle">
              <h5 class="card-title">${nuevaPelicula.titulo}</h5>
              <p class="card-text">${nuevaPelicula.director} (${nuevaPelicula.anioEstreno})</p>
              <div class="d-flex justify-content-between gap-2">
                <button class="btn btn-warning w-100" onclick="prepararPelicula('${nuevaPelicula.id}')">Editar</button>
                <button
                  class="btn btn-danger w-100" onclick="eliminarPelicula('${nuevaPelicula.id}')"
                >
                  Borrar
                </button>
                <button class="btn btn-info w-100">Ver</button>
              </div>
            </div>
          </div>
        </article>`;
};

window.eliminarPelicula = (id) => {
  Swal.fire({
    title: "Estas seguro que quieres eliminar esta pelicula?",
    text: "No podras revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, elimínalo!",
    cancelButtonText: "Salir",
  }).then((result) => {
    if (result.isConfirmed) {
      //buscar y borrar del array
      const posicionPeliculaBuscada = cartelera.findIndex(
        (pelicula) => pelicula.id === id
      );
      cartelera.splice(posicionPeliculaBuscada, 1);
      guardarLocalStorage();
      cardPeliculas.children[posicionPeliculaBuscada].remove();
      cardPeliculas.innerHTML = "";
      cargarDatosTabla();

      Swal.fire({
        title: "Pelicula eliminada!",
        text: `La pelicula fue eliminada correctamente.`,
        icon: "success",
      });
    }
  });
};

window.prepararPelicula = (id) => {

  const peliculaBuscada = cartelera.find((pelicula) => pelicula.id === id);

  inputTitulo.value = peliculaBuscada.titulo;
  inputDirector.value = peliculaBuscada.director;
  inputAnioEstreno.value = peliculaBuscada.anioEstreno;
  inputPoster.value = peliculaBuscada.poster;

  abrirModal();

  idPeliculaEditar = id;
  creandoPelicula = false;
};

const cargarDatosTabla = () => {
  if (cartelera.length !== 0) {
    cartelera.map((nuevaPelicula) => cardPeliculaAgregada(nuevaPelicula));
  }
};

const editarPelicula = () => {
  const posicionPelicula = cartelera.findIndex(
    (pelicula) => pelicula.id === idPeliculaEditar
  );

  cartelera[posicionPelicula].titulo = inputTitulo.value;
  cartelera[posicionPelicula].director = inputDirector.value;
  cartelera[posicionPelicula].anioEstreno = inputAnioEstreno.value;
  cartelera[posicionPelicula].poster = inputPoster.value;

  guardarLocalStorage();
  limpiarForm();
  modalContacto.hide();

  cardPeliculas.innerHTML = "";
  cargarDatosTabla();

  Swal.fire({
    title: "Pelicula actualizada!",
    text: `La pelicula ${cartelera[posicionPelicula].titulo}, fue actualizada correctamente.`,
    icon: "success",
  });
};

const modalContacto = new bootstrap.Modal(
  document.querySelector("#modalContacto")
);
const btnAgregar = document.querySelector("#btnAgregar");
const inputTitulo = document.querySelector("#titulo");
const inputDirector = document.querySelector("#director");
const inputAnioEstreno = document.querySelector("#anioEstreno");
const inputPoster = document.querySelector("#poster");
const cartelera = JSON.parse(localStorage.getItem("newCarteleraKey")) || [];
const formularioPelicula = document.querySelector(".formPelicula");
const cardPeliculas = document.querySelector(".row");
let creandoPelicula = true;
let idPeliculaEditar = null;

btnAgregar.addEventListener("click", abrirModal);
formularioPelicula.addEventListener("submit", (e) => {
  if (creandoPelicula == true) {
    e.preventDefault();
    agregarPelicula();
  } else {
    editarPelicula();
  }
});

cargarDatosTabla();
