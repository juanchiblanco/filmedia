import Pelicula from "./classPelicula.js";

const abrirModal = () => {
  modalContacto.show();
  creandoPelicula = true;
};

const agregarPelicula = () => {
  if (validaciones()) {
    const nuevaPelicula = new Pelicula(
      inputTitulo.value,
      inputDirector.value,
      inputAnioEstreno.value,
      inputPoster.value,
      inputDescripcion.value
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
  }
};

const guardarLocalStorage = () => {
  localStorage.setItem("newCarteleraKey", JSON.stringify(cartelera));
};

const limpiarForm = () => {
  formularioPelicula.reset();
  const inputs = formularioPelicula.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });
};

const cardPeliculaAgregada = (nuevaPelicula) => {
  cardPeliculas.innerHTML += `<article class="col-12 col-md-6 col-lg-4" id="cardPelicula">
          <div class="card">
            <img src="${nuevaPelicula.poster}" class="card-img-top h-100" alt="${nuevaPelicula.titulo}, ${nuevaPelicula.director} (${nuevaPelicula.anioEstreno})" />
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
                <button class="btn btn-info w-100" onclick="verPelicula('${nuevaPelicula.id}')">Ver</button>
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
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
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
  inputDescripcion.value = peliculaBuscada.descripcion;

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
  if (validaciones()) {
    const posicionPelicula = cartelera.findIndex(
      (pelicula) => pelicula.id === idPeliculaEditar
    );

    cartelera[posicionPelicula].titulo = inputTitulo.value;
    cartelera[posicionPelicula].director = inputDirector.value;
    cartelera[posicionPelicula].anioEstreno = inputAnioEstreno.value;
    cartelera[posicionPelicula].poster = inputPoster.value;
    cartelera[posicionPelicula].descripcion = inputDescripcion.value;

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
  }
};

window.verPelicula = (id) => {
  window.location.href = `./pages/detallePelicula.html?id=${id}`;
};

function validarCantidadCaracteres(input, min, max) {
  if (input.value.trim().length >= min && input.value.trim().length <= max) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validarAnioEstreno(input, min, max) {
  if (parseInt(input.value) >= min && parseInt(input.value) <= max) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validarPoster() {
  const regExp = /^https?:\/\/.+\.(jpg|jpeg|png|gif)(\?.*)?$/i;
  if (regExp.test(inputPoster.value)) {
    inputPoster.classList.add("is-valid");
    inputPoster.classList.remove("is-invalid");
    return true;
  } else {
    inputPoster.classList.add("is-invalid");
    inputPoster.classList.remove("is-valid");
    return false;
  }
}

function validaciones() {
  let datosValidos = true;
  if (!validarCantidadCaracteres(inputTitulo, 2, 50)) {
    datosValidos = false;
  }

  if (!validarCantidadCaracteres(inputDirector, 2, 50)) {
    datosValidos = false;
  }

  if (!validarAnioEstreno(inputAnioEstreno, 1895, 2025)) {
    datosValidos = false;
  }

  if (!validarPoster()) {
    datosValidos = false;
  }

  return datosValidos;
}

const modalContacto = new bootstrap.Modal(
  document.querySelector("#modalContacto")
);
const btnAgregar = document.querySelector("#btnAgregar");
const inputTitulo = document.querySelector("#titulo");
const inputDirector = document.querySelector("#director");
const inputAnioEstreno = document.querySelector("#anioEstreno");
const inputPoster = document.querySelector("#poster");
const inputDescripcion = document.querySelector("#descripcion");
const cartelera = JSON.parse(localStorage.getItem("newCarteleraKey")) || [];
const formularioPelicula = document.querySelector(".formPelicula");
const cardPeliculas = document.querySelector(".cardGrid");
let creandoPelicula = true;
let idPeliculaEditar = null;

btnAgregar.addEventListener("click", abrirModal);
formularioPelicula.addEventListener("submit", (e) => {
  if (creandoPelicula == true) {
    e.preventDefault();
    agregarPelicula();
  } else {
    e.preventDefault();
    editarPelicula();
  }
});

cargarDatosTabla();
