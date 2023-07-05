window.addEventListener("load", function () {
    leerData();
});


const guardar2 = document.getElementById('guardar2');
guardar2.addEventListener('click', guardarConvocatoria);

const cancelar2 = document.getElementById('cancelar2');
cancelar2.addEventListener('click', cancelarModificacion);

function cancelarModificacion(){
    window.location.href = 'convocatorias.html';
}

function guardarConvocatoria(){

    const convocatorias = JSON.parse(localStorage.getItem('convocatorias'));
    const id_editar = parseInt(localStorage.getItem('modificarConvocatoria'));
    const nuevaConvocatoria = convocatorias.filter( function(item){
        return item.id !== id_editar;
        });

    const nuevaEdicion = {
        'id' : id_editar,
        'fecha' : document.getElementById('fecha').value,
        'rival' : document.getElementById('rival').value,
        'capitan' : document.getElementById('capitan').value
    }

    nuevaConvocatoria.push(nuevaEdicion);
    const nuevoOrden = nuevaConvocatoria.sort( function(a,b){
        if(a.id < b.id){
            return -1
        }
            return 0;
    })

    localStorage.setItem('convocatorias', JSON.stringify(nuevoOrden));
    window.location.href = 'convocatorias.html';
}

function leerData(){

    const id_modificar = parseInt(localStorage.getItem('modificarConvocatoria'));
    const convocatorias = JSON.parse(localStorage.getItem('convocatorias'));
    const convocatoria = convocatorias.find(item => item.id === id_modificar);
    document.getElementById('fecha').value = convocatoria.fecha;
    document.getElementById('rival').value = convocatoria.rival;
    document.getElementById('capitan').value = convocatoria.capitan;
}