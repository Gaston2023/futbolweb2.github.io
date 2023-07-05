window.addEventListener("load", function () {
    buscarDatos();
});

document.getElementById('convocar').addEventListener('click', convocarJugadores);

function convocarJugadores() {
    const idConvocatoria = parseInt(localStorage.getItem('convocatoriaNro'));
    const checks = document.getElementsByClassName('checkbox');
    
    let convocados = [];
    let contadorArqueros = 0;
    
    for(let i = 0; i < checks.length; i++) {
        if(checks[i].checked) {
            const convocado = {
                'idJugador': parseInt(checks[i].getAttribute("id")),
                'idConvocatoria': idConvocatoria
            };
            
            convocados.push(convocado);
            
            // Verifica si el jugador seleccionado es un arquero
            const idJugador = parseInt(checks[i].getAttribute("id"));
            if (idJugador === 0 || idJugador === 1) {
                contadorArqueros++;
            }
        }
    }
    
    if(convocados.length > 11 && contadorArqueros > 0) {
        const datosLocalStorage = JSON.parse(localStorage.getItem('convocatoriasJugadores'));
        
        if(datosLocalStorage === null) {
            localStorage.setItem('convocatoriasJugadores', JSON.stringify(convocados));
        } else if(checks.checked =true) {
            // si el check esta en true o es marcado, lo guarda en el LS y si no esta marcado no lo guarda
            localStorage.setItem('convocatoriasJugadores',JSON.stringify(convocados));
        } else {
            convocados.forEach(element => {
                datosLocalStorage.push(element);
            });
            localStorage.setItem('convocatoriasJugadores', JSON.stringify(datosLocalStorage));
        }
        
        window.location.href = 'convocatorias.html';
    } else {
        alert('Se deben convocar o seleccionar a más de 11 jugadores, y minimo un arquero');
    }
}



function buscarDatos(){
    const idConvocatoria = parseInt(localStorage.getItem('convocatoriaNro'));
    const datosLocalStorage = JSON.parse(localStorage.getItem('convocatoriasJugadores'));

    const convocatorias = JSON.parse(localStorage.getItem('convocatorias'));
    const convocatoria = convocatorias.find(item => item.id === idConvocatoria);

    document.getElementById('titulo').
    appendChild(document.createTextNode(`Convocatoria Fecha: ${convocatoria.fecha} --- Rival: ${convocatoria.rival}`))


    const bodyJugadores = document.getElementById('bodyJugadores');
    
    fetch('datos/convocados.json')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        data.forEach(element => {
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
            img.style.width='50px';
            remera.appendChild(img);

            dni.appendChild(document.createTextNode(element.dni));
            apellido.appendChild(document.createTextNode(element.apellido));
            nombre.appendChild(document.createTextNode(element.nombre));
            posicion.appendChild(document.createTextNode(element.posicion));


            // checkbox
            const check = document.createElement('input');
            check.type = 'checkbox';
            
            // convocado by ID
            check.id = element.id;
            
            check.setAttribute('class','estiloCheck');
            check.style.blockSize='40px';
            
            
            if(datosLocalStorage !== null){                
             
                const estaConvocado = datosLocalStorage.find
                    (item => item.idJugador === element.id 
                    && item.idConvocatoria === idConvocatoria);
                
                if(estaConvocado){
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
            bodyJugadores.appendChild(tr);
            
            
        });
    }).catch((error) => {
        console.log('Error', error)
    });
}

