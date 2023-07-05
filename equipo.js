
window.addEventListener("load", function () {
    buscarInformacion();
});

document.getElementById('cancelar3').addEventListener('click', cancelar);

function cancelar(){
    window.location.href= 'convocatorias.html';
}

document.getElementById('guardar').addEventListener('click', guardarEquipoTitular);

function guardarEquipoTitular() {
    const idConvocatoria = parseInt(localStorage.getItem('convocatoriaNro'));
    const checks = document.getElementsByClassName('checkbox');

    let equipo = [];
    let contadorArqueros = 0;

    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            const jugadorTitular = {
                'idJugador': parseInt(checks[i].getAttribute("id")),
                'idConvocatoria': idConvocatoria
            };

            equipo.push(jugadorTitular);

            const idJugador = parseInt(checks[i].getAttribute("id"));
            if (idJugador === 0 || idJugador === 1) {
                contadorArqueros++;
            }
        }
    }

    if (equipo.length < 11) {
        alert('No se permiten menos de 11 jugadores. El Equipo Titular debe estar conformado por 11 Jugadores incluyendo el Arquero');
    } else if (equipo.length > 11) {
        alert('No se permiten más de 11 jugadores');
    } else if (contadorArqueros === 0) {
        alert('Debes seleccionar al menos un arquero');
    } else if (contadorArqueros > 1) {
        alert('Solo se puede seleccionar máximo 1 arquero');
    } else {
        localStorage.setItem('EquipoTitular', JSON.stringify(equipo));
        alert('El Equipo Titular ha sido creado exitosamente');
        window.location.href = 'convocatorias.html';
    }
}


function buscarInformacion() {
    
    const idConvocatoria = parseInt(localStorage.getItem('convocatoriaNro'));
    const datosLsEquipoTitular = JSON.parse(localStorage.getItem('EquipoTitular'));
    const datosLocalStorage = JSON.parse(localStorage.getItem('convocatoriasJugadores'));
    const convocatorias = JSON.parse(localStorage.getItem('convocatorias'));
    const convocatoria = convocatorias.find(item => item.id === idConvocatoria);

    document.getElementById('titulo').appendChild(document.createTextNode(`Equipo Titular vs ${convocatoria.rival} (${convocatoria.fecha})`))

    const convocatoriaConvocados = datosLocalStorage.filter(item => item.idConvocatoria === idConvocatoria);
    const body = document.getElementById('body');


    fetch('datos/convocados.json')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            data.forEach(element => {

            const fueConvocado = convocatoriaConvocados.find(
                item => item.idJugador == element.id);

            if (fueConvocado != undefined) {

                const tr = document.createElement('tr');
                const id = document.createElement('td');
                const remera = document.createElement('td');
                const dni = document.createElement('td');
                const apellido = document.createElement('td');
                const nombre = document.createElement('td');
                const posicion = document.createElement('td');
                const convocar = document.createElement('td');

                id.appendChild(document.createTextNode(element.id));

                const img = document.createElement('img');
                img.classList.add('miImg');

                img.setAttribute('src', 'img/jugadores/' + element.imagen);
                img.style.width = '50px';
                remera.appendChild(img);

                dni.appendChild(document.createTextNode(element.dni));
                apellido.appendChild(document.createTextNode(element.apellido));
                nombre.appendChild(document.createTextNode(element.nombre));
                posicion.appendChild(document.createTextNode(element.posicion));


                // checkbox
                const check = document.createElement('input');
                check.type = 'checkbox';
                
                check.id = element.id;
                check.setAttribute('class', 'cajaCheck')

                
                if (datosLsEquipoTitular !== null) {
                     
                    const yaEstaConvocado = datosLsEquipoTitular.find
                        (item => item.idJugador === element.id
                        && item.idConvocatoria === idConvocatoria);
                    
                    if (yaEstaConvocado) {
                        check.checked = true;

                    }
                }

                check.classList.add('checkbox');
                
                convocar.appendChild(check);

                tr.appendChild(id);
                tr.appendChild(remera);
                tr.appendChild(dni);
                tr.appendChild(apellido);
                tr.appendChild(nombre);
                tr.appendChild(posicion);
                tr.appendChild(convocar);
                body.appendChild(tr);

            }

        });
    }).catch((error) => {
        console.log('error', error)
    });
}
