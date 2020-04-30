//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


//Listeners
cargaEventListeners();

function cargaEventListeners(){
    //Dispara cuando se presione "Agregar carrito"
    cursos.addEventListener('click',comprarCurso);

    //cuando se elimina un curso del carrito
    carrito.addEventListener('click',eliminarCurso);

    //Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);

    //Al cargar el documento mostrar el LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
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
    guardarCursoLocalStorage(curso);
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

//Eliminar los cursos del carrito en el DOM
function vaciarCarrito() {
    //forma lenta
    //listaCursos.innerHTML = '';

    //forma rápida(recomendada)
    while(listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false
}

//Almacena cursos del carrito al LocalStorage
function guardarCursoLocalStorage(curso) {
    //console.log(curso);
    let cursos;

    //Toma el valor de un array con datos del LS o vacío
    cursos = obtenerCursosLocalStorage();
    //console.log(cursos);

    //el curso seleccionado se añade al array
    cursos.push(curso);

    // EL JSON.stringify tranforma de nuevo en string lo que hay en el array
    localStorage.setItem('cursos',JSON.stringify(cursos));
}

//Comprueba que haya elemnetos en LocalStorage
function obtenerCursosLocalStorage(){
    let cursosLS;

    //comprobamos si hay algo en el LocalStorage
    if(localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        //EL JSON.parse transforma los strings en arrays
       cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//Imprime los cursos del LocalStotage en el carrito
function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();
    //console.log(cursosLS);

    cursosLS.forEach(function(curso) {
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
    });
}

