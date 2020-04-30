//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');


//Listeners
cargaEventListeners();

function cargaEventListeners(){
    //Dispara cuando se presione "Agregar carrito"
    cursos.addEventListener('click',comprarCurso);
}


//Funciones
//Función que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    //Delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')) {
        console.log('Si');
        const curso = e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
    console.log(curso);
}