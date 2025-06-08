export default class Pelicula {
  #id
  #titulo;
  #director;
  #anioEstreno;
  #poster;
  constructor(titulo, director, anioEstreno, poster) {
    this.#id = crypto.randomUUID();
    this.#titulo = titulo;
    this.#director = director;
    this.#anioEstreno = anioEstreno;
    this.#poster = poster;
  }

  get id() {
        return this.#id;
    }

  get titulo() {
    return this.#titulo;
  }

  get director() {
    return this.#director;
  }

  get anioEstreno() {
    return this.#anioEstreno;
  }
  get poster() {
    return this.#poster;
  }

  set titulo(nuevoTitulo) {
    this.#titulo = nuevoTitulo;
  }

  set director(nuevoDirector) {
    this.#director = nuevoDirector;
  }

  set anioEstreno(nuevoAnioEstreno) {
    this.#anioEstreno = nuevoAnioEstreno;
  }
  set poster(nuevoPoster) {
    this.#poster = nuevoPoster;
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      director: this.director,
      anioEstreno: this.anioEstreno,
      poster: this.poster,
    };
  }
}
