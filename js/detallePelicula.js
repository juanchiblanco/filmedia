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
                  <h2 class="card-title text-center">
                    ${peliculaBuscada.titulo}
                  </h2>
                  <h4 class="text-center">${peliculaBuscada.director} (${peliculaBuscada.anioEstreno})</h4>
                  <p class="text-center lead">${peliculaBuscada.descripcion}</p>
                </div>
              </div>
            </div>`;