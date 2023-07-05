window.addEventListener("load", function () {
    buscarDatos();
    botonesyFormOcultos()
});

//BUSQUEDA POR FECHA

let convocatorias = JSON.parse(localStorage.getItem('convocatorias')) || [];

function buscarConvocatoriasPorFecha(fecha) {
    let convocatoriasEncontradas = [];

    for (let i = 0; i < convocatorias.length; i++) {
        let convocatoria = convocatorias[i];

        if (convocatoria.fecha === fecha) {
        convocatoriasEncontradas.push(convocatoria);
        }
    }

    return convocatoriasEncontradas;
}

function realizarBusquedaConvocatorias() {
    let fechaInput = document.getElementById('fecha-input').value;
    let convocatorias = JSON.parse(localStorage.getItem('convocatorias')) || [];

    let resultados = convocatorias.filter(function(convocatoria) {
        return convocatoria.fecha === fechaInput;
    });

    if (resultados.length > 0) {
        Swal.fire({
            title: 'Convocatorias encontradas',
            text: 'Se encontraron ' + resultados.length + ' convocatorias para la fecha ' + fechaInput + '.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: 'No se encontraron convocatorias',
            text: 'No se encontraron convocatorias para la fecha ' + fechaInput + '.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    }
    window.reload();
}


document.getElementById("buscar-button").addEventListener("click", realizarBusquedaConvocatorias);

let fechaInput = document.getElementById('fecha-input');
let buscarButton = document.getElementById('buscar-button');
let resultadoDiv = document.getElementById('resultado-div');


function buscarConvocatorias() {

    let fecha = fechaInput.value;

    resultadoDiv.innerHTML = '';

    let convocatoriasEncontradas = buscarConvocatoriasPorFecha(fecha);

    if (convocatoriasEncontradas.length > 0) {
        for (let i = 0; i < convocatoriasEncontradas.length; i++) {
        let convocatoria = convocatoriasEncontradas[i];

        let convocatoriaItem = document.createElement('li');
        convocatoriaItem.textContent = 'Fecha: ' + convocatoria.fecha + ', Rival: ' + convocatoria.rival + ', Capitán: ' + convocatoria.capitan;
        resultadoDiv.appendChild(convocatoriaItem);
        }
    } else {
        resultadoDiv.textContent = 'No se encontraron convocatorias para la fecha ingresada.';
    }
}

buscarButton.addEventListener('click', buscarConvocatorias);


document.getElementById('btnCrearConvocatoria').addEventListener('click',mostrarBotonesyForm);
document.getElementById('cancelar').addEventListener('click',botonesyFormOcultos);


function botonesyFormOcultos(){
    
    const formu=document.getElementById('formu');
    formu.style.display='none';
}

function mostrarBotonesyForm(){
    const formu=document.getElementById('formu');
    formu.style.display='block';
}

function buscarDatos(){

    const bodyConvocatoria = document.getElementById('bodyConvocatoria');
    const convocatorias = JSON.parse(localStorage.getItem('convocatorias'));

    if(convocatorias === null){
        fetch('datos/convocatorias.json')
        .then((res) => {
        return res.json()
        })
        .then((data) => {
        
        localStorage.setItem('convocatorias', JSON.stringify(data));

        data.forEach(element => {
            const tr = document.createElement('tr');

            const id = document.createElement('td');
            const fecha = document.createElement('td');
            const rival = document.createElement('td');
            const capitan = document.createElement('td');
            const convocar = document.createElement('td');

            id.appendChild(document.createTextNode(element.id));
            fecha.appendChild(document.createTextNode(element.fecha));
            rival.appendChild(document.createTextNode(element.rival));
            capitan.appendChild(document.createTextNode(element.capitan));

            
            const botonEquipo = document.createElement('button'); 
            
            botonEquipo.setAttribute('id', element.id);
            botonEquipo.setAttribute('onclick', 'armarEquipoTitular(this)');
            botonEquipo.setAttribute('class', 'btn');
            botonEquipo.appendChild(document.createTextNode('Equipo Titular'));
            botonEquipo.style.backgroundColor='orange'
            
            const botonConvocar = document.createElement('button');
            
            botonConvocar.setAttribute('id', element.id);
            botonConvocar.setAttribute('onclick', 'convocarJugadores(this)');
            botonConvocar.setAttribute('class', 'btn btn-primary');
            botonConvocar.appendChild(document.createTextNode('+'));

            const botonEditar = document.createElement('button');
            botonEditar.setAttribute('id', element.id);
            botonEditar.setAttribute('onclick', 'modificarConvocatoria(this)');
            botonEditar.setAttribute('class', 'btn btn-info');
            botonEditar.appendChild(document.createTextNode('Edit'));

            const botonEliminar = document.createElement('button');
            botonEliminar.setAttribute('id', element.id);
            botonEliminar.setAttribute('onclick', 'confirmarEliminacionConvocatoria(this)');
            botonEliminar.setAttribute('class', 'btn btn-danger');
            
            botonEliminar.appendChild(document.createTextNode('X'));
            
            convocar.appendChild(botonEliminar);
            convocar.appendChild(botonEditar);
            convocar.appendChild(botonConvocar);
            convocar.appendChild(botonEquipo)

            tr.appendChild(id);
            tr.appendChild(fecha);
            tr.appendChild(rival);
            tr.appendChild(capitan);
            tr.appendChild(convocar);

            bodyConvocatoria.appendChild(tr);
        });
        })
    }
    else{
        convocatorias.forEach(element => {
        const tr = document.createElement('tr');

        const id = document.createElement('td');
        const fecha = document.createElement('td');
        const rival = document.createElement('td');
        const capitan = document.createElement('td');
        const convocar = document.createElement('td');

        id.appendChild(document.createTextNode(element.id));
        fecha.appendChild(document.createTextNode(element.fecha));
        rival.appendChild(document.createTextNode(element.rival));
        capitan.appendChild(document.createTextNode(element.capitan));

        
        const botonEquipo = document.createElement('button'); 
        
        botonEquipo.setAttribute('id', element.id);
        botonEquipo.setAttribute('onclick', 'armarEquipoTitular(this)');
        botonEquipo.setAttribute('class', 'btn');
        botonEquipo.appendChild(document.createTextNode('Equipo Titular'));
        botonEquipo.style.backgroundColor='orange';
        
        const botonConvocar = document.createElement('button');
        
        botonConvocar.setAttribute('id', element.id);
        botonConvocar.setAttribute('onclick', 'convocarJugadores(this)');
        botonConvocar.setAttribute('class', 'btn btn-primary');
        botonConvocar.appendChild(document.createTextNode('+'));
        botonConvocar.style.margin='5px'

        const botonEditar = document.createElement('button');
        botonEditar.setAttribute('id', element.id);
        botonEditar.setAttribute('onclick', 'modificarConvocatoria(this)');
        botonEditar.setAttribute('class', 'btn btn-info');
        botonEditar.appendChild(document.createTextNode('Edit'));
        botonEditar.style.margin='5px'

        const botonEliminar = document.createElement('button');
        botonEliminar.setAttribute('id', element.id);
        botonEliminar.setAttribute('onclick', 'confirmarEliminacionConvocatoria(this)');
        botonEliminar.setAttribute('class', 'btn btn-danger');
        botonEliminar.appendChild(document.createTextNode('X'));

        convocar.appendChild(botonEliminar);
        convocar.appendChild(botonEditar);
        convocar.appendChild(botonConvocar);
        convocar.appendChild(botonEquipo)

        tr.appendChild(id);
        tr.appendChild(fecha);
        tr.appendChild(rival);
        tr.appendChild(capitan);
        tr.appendChild(convocar);

        bodyConvocatoria.appendChild(tr);
        });
    }

}

function armarEquipoTitular(param){
  
    let idConvocatoria = parseInt(param.getAttribute("id"));
    localStorage.setItem('convocatoriaNro',JSON.stringify(idConvocatoria));

    window.location.href = 'equipo.html'
}


function confirmarEliminacionConvocatoria(parametro) {
    Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas eliminar esta convocatoria?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'blue',
    cancelButtonColor: 'red',
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
    }).then((resultado) => {
    if (resultado.isConfirmed) {
        eliminarConvocatoria(parametro);
    }
    });
}


function eliminarConvocatoria(parametro){
    
    let idEliminar = parseInt(parametro.getAttribute("id"));
    const convocatorias = JSON.parse(localStorage.getItem('convocatorias'));
    const nuevo = convocatorias.filter(function(item){
        return item.id !== idEliminar;
    });

    localStorage.setItem('convocatorias',JSON.stringify(nuevo));

    this.borrarBodyTabla();
    this.buscarDatos();
}

function borrarBodyTabla(){
    const elemento = document.getElementById('bodyConvocatoria');
    while (elemento.firstChild) {
    elemento.firstChild.remove();
    }
}

function modificarConvocatoria(param){
    let id_editar = parseInt(param.getAttribute("id"));
    localStorage.setItem('modificarConvocatoria',JSON.stringify(id_editar));
    window.location.href = 'modificarConvocatoria.html'
}

function convocarJugadores(param){
    let idConvocatoria = parseInt(param.getAttribute("id"));
    localStorage.setItem('convocatoriaNro',JSON.stringify(idConvocatoria));
    window.location.href = 'convocarJugadores.html'
}

const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', cancelarConvocatoria);

const guardar = document.getElementById('guardar');
guardar.addEventListener('click', crearConvocatoria);

function cancelarConvocatoria(){
    event.preventDefault()
    event.stopPropagation()
    
}


function crearConvocatoria() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();                
            } else {
                const convocatorias = JSON.parse(localStorage.getItem('convocatorias'));
                const fechaInput = document.getElementById('fecha').value;
                const rivalInput = document.getElementById('rival').value;
                const capitanInput = document.getElementById('capitan').value;
                
                // Verifica si ya existe la misma convocatoria
                const existeConvocatoria = convocatorias.some(convocatoria => {
                return convocatoria.fecha === fechaInput &&
                        convocatoria.rival === rivalInput &&
                        convocatoria.capitan === capitanInput;
                });
                
                if (existeConvocatoria) {
                
                event.preventDefault();
                event.stopPropagation();
                return;
                }
                
                const maxId = convocatorias.reduce((max, obj) => obj.id > max ? obj.id : max, -Infinity);
                const newId = maxId !== -Infinity ? maxId + 1 : 0;

                const convocatoria = {
                'id': newId,
                'fecha': fechaInput,
                'rival': rivalInput,
                'capitan': capitanInput
                };
                
                convocatorias.push(convocatoria);
                localStorage.setItem('convocatorias', JSON.stringify(convocatorias));

                event.preventDefault();
                event.stopPropagation();
                window.location.reload();
            }

        form.classList.add('was-validated');
        }, false);
    });
}
  

