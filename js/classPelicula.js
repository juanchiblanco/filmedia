export default class Pelicula {
  #titulo;
  #director;
  #anioEstreno;
  constructor(titulo, director, anioEstreno) {
    this.#titulo = titulo;
    this.#director = director;
    this.#anioEstreno = anioEstreno;
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

  //metodo para stringify
  toJSON() {
    return {
      titulo: this.titulo,
      director: this.director,
      anioEstreno: this.anioEstreno,
    };
  }
}
