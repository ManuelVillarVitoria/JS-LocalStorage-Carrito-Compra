//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');


//Listeners
cargaEventListeners();

function cargaEventListeners(){
    //Dispara cuando se presione "Agregar carrito"
    cursos.addEventListener('click',comprarCurso);
    //cuando se elimina un curso del carrito
    carrito.addEventListener('click',eliminarCurso);
}


//Funciones
//Función que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    //Delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')) {
        //console.log('Si');
        const curso = e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
    //console.log(curso);
    //ponemos los datos en un objeto
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}

//Muestra el curso seleccionado en el carrito del HTML
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src= "${curso.imagen}" width=100>
        </td>
        <td>"${curso.titulo}"></td>
        <td>"${curso.precio}"></td>
        <td>
        <a href= "#" class="borrar-curso"  data-id= "${curso.id}
        "> X </a>
        </td>
    `;
    listaCursos.appendChild(row);
}

//Elimina el curos del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    //console.log('eliminado');

    let curso;
    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
    }
}