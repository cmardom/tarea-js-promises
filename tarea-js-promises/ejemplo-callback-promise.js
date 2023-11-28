/////////////////
//Callbacks
/////////////////
const cb1 = document.getElementById("callback1");
const p1 = document.getElementById("promise1");
const p2 = document.getElementById("promise2");
const p3 = document.getElementById("promise3");
const p4 = document.getElementById("promise4");
const a1 = document.getElementById("async1");
const aw1 = document.getElementById("await1");
/**
 * Buscar película con uso de callback
 * @param {Integer} id
 * @param {(nombre:String, error:String)} callback
 */
function buscarPeliculaC(id, callback) {
    const pelicula = db["peliculas"].find(peli => peli.id === id);
    if (!pelicula) {
        callback(null, `Película con id=${id} no encontrada.`);
    } else {
        callback(pelicula.nombre, null)
    }
}

buscarPeliculaC(1, (peli, error) => {
    if(error){
        cb1.innerHTML = error;
        return;
    }
    cb1.innerHTML = peli;
});

/////////////////
//Promesas
/////////////////

/**
 * Promesa para buscar película
 * @param {Integer} id
 * @returns {void}
 */
// function buscarPeliculaP(id) {
//     return new Promise(( resolve, reject ) => {
//         const peli = db["peliculas"].find( p => p.id === id );
//         if ( peli ) {
//             resolve( peli );  //va al then
//             return;
//         }
//         reject(`Película con id=${id} no encontrada.`);  //va al catch
//     });
// };

// /**
//  * Promesa para buscar clasificación
//  * @param {Integer} id
//  * @returns {void}
//  */
// function buscarClasificacionP(id){
//     return new Promise((resolve, reject) => {
//         const clasif = db["clasificaciones"].find( c => c.id === id);
//         if (clasif) {
//             resolve( clasif );  //va al then
//             return;
//         }
//         reject(`Clasificación con id=${id} no encontrada.`);  //va al catch
//     })
// }

// /**
//  * Promesa para buscar película con retardo
//  * @param {Integer} id
//  * @returns {void}
//  */
// function buscarPeliculaPR(id, ms) {
//     return new Promise(( resolve, reject ) => {
//         setTimeout(()=>{
//             const peli = db["peliculas"].find( p => p.id === id );
//             if ( peli ) {
//                 resolve( peli );  //va al then
//                 return;
//             }
//             reject(`Película con id=${id} no encontrada.`);  //va al catch
//         },ms);
//     });
// };

// buscarPeliculaP(1)
//     .then(peli => p1.innerHTML = peli.nombre)
//     .catch(error => p1.innerHTML = error);

// buscarPeliculaP(2)
//     .then(peli => {
//         buscarClasificacionP(peli.clasificacionId)
//             .then(clasif => {
//                 p2.innerHTML = peli.nombre + '/' + clasif.nombre;
//             })
//             .catch(error => p2.innerHTML = error);

//     })
//     .catch(error => p2.innerHTML = error);

// //Otra forma
// let tmpPeli;
// buscarPeliculaP(2)
//     .then(peli => {
//         tmpPeli = peli;
//         return buscarClasificacionP(peli.clasificacionId)
//     })
//     .then(clasif => {
//                 p3.innerHTML = tmpPeli.nombre + '/' + clasif.nombre;
//             })
//     .catch(error => p3.innerHTML = error);

// //Promesa con retardo:
// p4.innerHTML = "cargando...";
// buscarPeliculaPR(5, 3000)
//             .then(peli => {
//                 p4.innerHTML = peli.nombre;
//             })
//             .catch(error => p4.innerHTML = error);
// //p4.innerHTML = "finalizado";

// /////////////
// //ASYNC
// /////////////
// async function buscarPeliculaA(id){
//     const pelicula = db["peliculas"].find(peli => peli.id === id);
//     if (!pelicula) {
//         throw `Película con id=${id} no encontrada.`; //va al catch
//     } else {
//         return pelicula; //va al then
//     }

// }

// buscarPeliculaA(55)
//             .then(peli => {
//                 a1.innerHTML = peli.nombre;
//             })
//             .catch(error => a1.innerHTML = error);


// /////////////
// //ASYNC/AWAIT
// /////////////
// async function buscarPeliculasAW(a,b) {
//     try {
//     let peli1 = await buscarPeliculaA(a);
//     let peli2 = await buscarPeliculaA(b);
//         aw1.innerHTML = peli1.nombre + ' - ' + peli2.nombre;
//     } catch (error) {
//         aw1.innerHTML = error;
//     }
// }

// buscarPeliculasAW(5,1);