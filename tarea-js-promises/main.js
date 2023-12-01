// Variables extraídas del DOM
const lista = document.getElementById('listado-peliculas').querySelector('ul');
const director = document.getElementById('director');
const clasificacion = document.getElementById('clasificacion');
const valoracion = document.getElementById('valoracion');
const contenedorValoracion = document.querySelector('.valoracion .estrellas');
const imagenPelicula = document.getElementById('cartel').querySelector('img');

// Cargar base de datos
fetch('http://localhost:3000/peliculas')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Datos del json en consola
        mostrarPeliculas(data); // Llamada a la función para procesar los datos
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });

// Crear lista de películas
function mostrarPeliculas(peliculas){
    peliculas.forEach(pelicula => {
        const elemento = document.createElement('li');
        const enlace = document.createElement('a');

        enlace.textContent = pelicula.nombre; // Usar nombre de peli para mostrar
        enlace.href = '#';
        enlace.addEventListener('click', function (event) {
            event.preventDefault(); // Previene comportamiento por defecto
            buscarPelicula(pelicula.id); // Llama a buscarPelicula al hacer clic
        });

        elemento.appendChild(enlace);
        lista.appendChild(elemento);
    });
}

// Función para buscar una película por ID
function buscarPelicula(id) {
    fetch(`http://localhost:3000/pelicula/${id}`)  // Asume que este endpoint existe en tu servidor
        .then(response => response.json())
        .then(pelicula => {
            mostrarDetallesPelicula(pelicula);
        })
        .catch(error => {
            console.error('Error al cargar la película:', error);
        });
}

// Mostrar info de cada película
function mostrarDetallesPelicula(pelicula){
    director.textContent = pelicula.director;
    clasificacion.textContent = pelicula.clasificacion;

    // Para mostrar estrellas en valoración
    contenedorValoracion.innerHTML = ''; // Limpia las estrellas anteriores
    for (let i = 0; i < pelicula.valoracion; i++) {
        const estrella = document.createElement('i');
        estrella.classList.add('fa', 'fa-star');
        contenedorValoracion.appendChild(estrella);
    }

    // Para mostrar la imagen de la película
    imagenPelicula.src = 'assets/imgs/' + pelicula.cartel;
    imagenPelicula.alt = 'Cartel de la película ' + pelicula.nombre;
}
