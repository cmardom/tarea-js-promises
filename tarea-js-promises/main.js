//Variables extraidas del DOM
const lista = document.getElementById('listado-peliculas').querySelector('ul');
const director = document.getElementById('director');
const clasificacion = document.getElementById('clasificacion');
const valoracion = document.getElementById('valoracion');
const cartel = document.getElementById('cartel');
const contenedorValoracion = document.querySelector('.valoracion .estrellas');
const imagenPelicula = document.getElementById('cartel').querySelector('img');



//Cargar base de datos
fetch('http://localhost:3000/peliculas')
    .then(response => response.json())
    .then(data => {
        console.log(data); //datos del json en consola
        mostrarPeliculas(data); //llamada ala funcion para procesar los datos
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });

//Crear lista de peliculas

function mostrarPeliculas(peliculas){
    peliculas.forEach(pelicula => {
        const elemento = document.createElement('li');
        const enlace = document.createElement('a');

        enlace.textContent = pelicula.nombre; //usar nombre de peli para mostrar
        enlace.href = '#';
        enlace.addEventListener('click', function (event) {
            event.preventDefault(); //previene comportamiento por defecto
            mostrarDetallesPelicula(pelicula);
        });

        elemento.appendChild(enlace);
        lista.appendChild(elemento);
    });
}

//Mostrar info de cada pelicula
function mostrarDetallesPelicula (pelicula){
    director.textContent = pelicula.director;
    clasificacion.textContent = pelicula.clasificacion;
    // valoracion.textContent = pelicula.valoracion;

    //para mostrar estrellas en valoracion
    contenedorValoracion.innerHTML = ''; //hay que limpiar las estrellas anteriores
    for (let i = 0; i < pelicula.valoracion; i++) {
        const estrella = document.createElement('i');
        estrella.classList.add('fa', 'fa-star');
        contenedorValoracion.appendChild(estrella);
    }

    //para mostrar la imagen de la pelicula
    imagenPelicula.src = 'assets/imgs/' + pelicula.cartel;
    imagenPelicula.alt = 'Cartel de la película ' + pelicula.nombre;
}