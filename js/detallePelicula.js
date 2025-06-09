const parametrosURL = new URLSearchParams(window.location.search);
id = parametrosURL.get("id");

const cartelera = JSON.parse(localStorage.getItem("newCarteleraKey"));

const peliculaBuscada = cartelera.find((pelicula) => pelicula.id === id);

const card = document.querySelector(".card");

card.innerHTML = `<div class="row g-0">
              <div class="col-md-4">
                <img
                  src="${peliculaBuscada.poster}"
                  class="img-fluid"
                  alt="${peliculaBuscada.titulo}"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title text-center display-2">
                    ${peliculaBuscada.titulo}
                  </h2>
                  <h5 class="text-center">${peliculaBuscada.director} (${peliculaBuscada.anioEstreno})</h5>
                  <p class="text-center lead mt-5">${peliculaBuscada.descripcion}</p>
                </div>
              </div>
            </div>`;