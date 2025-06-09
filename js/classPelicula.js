export default class Pelicula {
  #id
  #titulo;
  #director;
  #anioEstreno;
  #poster;
  #descripcion;
  constructor(titulo, director, anioEstreno, poster, descripcion) {
    this.#id = crypto.randomUUID();
    this.#titulo = titulo;
    this.#director = director;
    this.#anioEstreno = anioEstreno;
    this.#poster = poster;
    this.descripcion = descripcion;
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
  get descripcion() {
    return this.#descripcion;
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
  set descripcion(nuevoDescripcion) {
    this.#descripcion = nuevoDescripcion;
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      director: this.director,
      anioEstreno: this.anioEstreno,
      poster: this.poster,
      descripcion: this.descripcion,
    };
  }
}
