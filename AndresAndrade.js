class Usuario{

    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nuevaMascota){
        this.mascotas.push(nuevaMascota);
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre, autor){
        this.libros.push({nombre, autor})
    }

    getBookNames(){
        return this.libros.map( (element) => element.nombre );
    }

}

const usuario = new Usuario('Carlos', 'Cepeda', [{nombre: 'El señor de los anillos', autor: 'Tolkien'}], ['perro', 'gato']);

console.log(usuario.getFullName());

usuario.addMascota('pollito');
console.log(usuario.mascotas);

console.log(usuario.countMascotas());

usuario.addBook('Fundación', 'Asimov');
console.log(usuario.libros);

console.log(usuario.getBookNames());