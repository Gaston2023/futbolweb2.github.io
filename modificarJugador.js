
window.addEventListener("load", function () {
    completarDatos();
});

function completarDatos(){

    const idModificar = localStorage.getItem('editar');
    const jsonJugadores = localStorage.getItem('jugadores');
    const jsonData = JSON.parse(jsonJugadores);
    const jugador = jsonData.find(item => item.dni === idModificar );

    if (jugador) {
    document.getElementById('idni').value = jugador.dni;
    document.getElementById('iapellido').value = jugador.apellido;
    document.getElementById('inombre').value = jugador.nombre;
    document.getElementById('iposiciones').value = jugador.posicion;
    document.getElementById('iedad').value = jugador.edad;
    document.getElementById('iapodo').value = jugador.apodo;
    document.getElementById('idorsal').value = jugador.dorsal;
    }

}

document.getElementById('btnEdit').addEventListener('click', modificarJugador);

document.getElementById('cancel').addEventListener('click', redireccion);
function redireccion(){
    
    setTimeout(function () {
        window.location.href = "jugadores.html";
      }, 0);
}


function modificarJugador(){

        const jsonJugadores = localStorage.getItem('jugadores');
        const jsonData = JSON.parse(jsonJugadores);
        const idModificar = localStorage.getItem('editar');
        const jsonModificado = jsonData.filter( function(item){
            return item.dni !== idModificar;
        });

        const jugadorModificado = {

            "dni": document.getElementById('idni').value,
            "apellido": document.getElementById('iapellido').value,
            "nombre": document.getElementById('inombre').value,
            "posicion": document.getElementById('iposiciones').value,
            "edad": document.getElementById('iedad').value,
            "apodo": document.getElementById('iapodo').value,
            "pieHabil": document.getElementById('ipie').value,
            "dorsal": document.getElementById('idorsal').value,
        }

        jsonModificado.push(jugadorModificado);


        localStorage.removeItem('jugadores');
        const guardar = JSON.stringify(jsonModificado);
        localStorage.setItem('jugadores', guardar);
        
        redireccion()
    }
