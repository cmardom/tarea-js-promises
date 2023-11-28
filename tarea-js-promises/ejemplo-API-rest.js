const baseURL = "http://localhost:3000/";

const ej1=document.getElementById("ejemplo1");
const ej2=document.getElementById("ejemplo2");
const ej3=document.getElementById("ejemplo3");



//MODELO CALLBACK
const callbackPeli = (titulo) => {
    ej1.innerText = titulo;
}

function leerPeliculaCallback(id, callback ) {
    let r=null;
    fetch(baseURL + 'peliculas/' + id).then( (resp) => {
        resp.json().then( (data) => {
            callback(data.nombre);
        });

    }).catch( error => console.log("fetch1 error:" + error) );

}

leerPeliculaCallback(1, callbackPeli);

//////////////////////

//MODELO Promesa .then.catch
//(async () => {
//await

let pelicula={"nombre": "nada"};
let nombre;

fetch(baseURL + "peliculas/2").then( resp => {
    if (resp.status == 200) {
        resp.json().then(data => {
            pelicula = data;
            //ej3.innerText = "Película DENTRO: " + data.nombre;
            console.log("fetch leído");
        })
    } else {
        pelicula=null
        console.log("La película no existe");
        //ej3.innerText = "No se localiza la película."
    }
}).catch ( error => console.log("fetch2 error:" + error));

//setTimeout(()=>{
if (pelicula!= null) {
    nombre = "=>" + pelicula.nombre;
} else {
    nombre = "NO EXISTE";
}
ej2.innerText = "Película: " + nombre;
//},1000);

//})();   //(async () => {

////////

//MODELO ASYNC/AWAIT
async function leerPelicula(url,etq) {
    const response = await fetch(url);
    const data = await response.json();
    etq.innerText =  data.nombre;
}

leerPelicula(baseURL + "peliculas/2", ej3);

/////////////////////////////
//MODELO HTTPXMLREQUEST (XHR)
/////////////////////////////
// 1. Create a new XMLHttpRequest object
let xhr = new XMLHttpRequest();

// 2. Configure it: GET-request for the URL /article/.../load
xhr.open('GET', 'http://localhost:3000/peliculas/1');

// 3. Send the request over the network
xhr.send();

// 4. This will be called after the response is received
xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
        console.log(`xhr: Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
        console.log(`xhr: Done, got ${xhr.response.length} bytes`); // response is the server response
        console.log(xhr.response);
    }
};

xhr.onprogress = function(event) {
    if (event.lengthComputable) {
        console.log(`xhr: Received ${event.loaded} of ${event.total} bytes`);
    } else {
        console.log(`xhr: Received ${event.loaded} bytes`); // no Content-Length
    }

};

xhr.onerror = function() {
    console.log("xhr: Request failed");
};