export default class Pelicula {
  #titulo;
  #director;
  #anioEstreno;
  #poster;
  constructor(titulo, director, anioEstreno, poster) {
    this.#titulo = titulo;
    this.#director = director;
    this.#anioEstreno = anioEstreno;
    this.#poster = poster;
  }
  // Getters
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

  // Setters
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

  //metodo para stringify
  toJSON() {
    return {
      titulo: this.titulo,
      director: this.director,
      anioEstreno: this.anioEstreno,
      poster: this.poster,
    };
  }
}
