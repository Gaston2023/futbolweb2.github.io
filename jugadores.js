
// VERIFICA EL LS Y GUARDO LOS DATOS
if(localStorage.getItem('jugadores') === undefined || localStorage.getItem('jugadores')===null){
    guardarLocalStorage();
}

window.addEventListener("load", function () {
    leerLocalStorage();
});


function guardarLocalStorage() {
    fetch('datos/jugadores.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('jugadores', JSON.stringify(data));
            console.log('Datos guardados en localStorage');
        })
        .catch(error => {
            console.log('Error al obtener los datos:', error);
        });
}


function borrarLocalStorage(){

    localStorage.removeItem('jugadores')
}

// VALIDAR CAMPOS
function validacion(){
    var dni,apellido,nombre,edad,apodo,dorsal;
    dni=document.getElementById('idni').value;
    apellido=document.getElementById('iapellido').value;
    nombre=document.getElementById('inombre').value;
    edad=document.getElementById('iedad').value;
    apodo=document.getElementById('iapodo').value;
    dorsal=document.getElementById('idorsal').value;

    if(dni==='' || apellido ==='' || nombre==="" || edad==='' || apodo==='' || dorsal===''){

        alert("COMPLETAR TODOS LOS CAMPOS");
        return true

    }
}

// ACCEDE AL LS
function leerLocalStorage(){

    const jsonJugadores=localStorage.getItem('jugadores');
    if (jsonJugadores!==null){

        const jsonData= JSON.parse(jsonJugadores);
        const miBody=document.getElementById('miBody');

        let indice=0;

        for(let elemento of jsonData){

            let row=document.createElement('tr');
            // CREACION DE CELDAS

            let celda_0=document.createElement('td');
            let celda_1=document.createElement('td');
            let celda_2=document.createElement('td');
            let celda_3=document.createElement('td');
            let celda_4=document.createElement('td');
            let celda_5=document.createElement('td');
            let celda_6=document.createElement('td');
            let celda_7=document.createElement('td');
            let celda_8=document.createElement('td');


            let texto_0=document.createTextNode(elemento.dni);
            let texto_1=document.createTextNode(elemento.apellido);
            let texto_2=document.createTextNode(elemento.nombre);
            let texto_3=document.createTextNode(elemento.posicion);
            let texto_4=document.createTextNode(elemento.edad);
            let texto_5=document.createTextNode(elemento.apodo);
            let texto_6=document.createTextNode(elemento.pieHabil);
            let texto_7=document.createTextNode(elemento.dorsal);

            //  BOTON ELIMINAR

            let boton=document.createElement('button');
            let x=elemento.dni;

            boton.setAttribute('dni',x);
            boton.setAttribute('onclick', 'eliminarJugador(this)');
            boton.setAttribute('id','delete');


            let texto_8=document.createTextNode('Eliminar');
            const logoDelete = document.createElement("img");
            logoDelete.src="https://cdn.icon-icons.com/icons2/1808/PNG/512/trash-can_115312.png";
            logoDelete.style.width="35px";
            logoDelete.style.height="35px";

            // BOTON EDITAR

            let boton2=document.createElement('button');
            let y=elemento.dni;

            boton2.setAttribute('dni',y);
            boton2.setAttribute('onclick', 'editarJugador(this)');
            boton2.setAttribute('class','editar')
            boton2.setAttribute('id','dni')

            let texto_9=document.createTextNode('EDITAR');
            const logoEditar = document.createElement("img");
            logoEditar.src="https://cdn.pixabay.com/photo/2017/06/06/00/33/edit-icon-2375785_960_720.png";
            logoEditar.style.width="42px";
            logoEditar.style.height="42px"

            // Arbol de Nodos
            celda_0.appendChild(texto_0);
            celda_1.appendChild(texto_1);
            celda_2.appendChild(texto_2);
            celda_3.appendChild(texto_3);
            celda_4.appendChild(texto_4);
            celda_5.appendChild(texto_5);
            celda_6.appendChild(texto_6);
            celda_7.appendChild(texto_7);

            boton.appendChild(logoDelete);
            celda_8.appendChild(boton);

            boton2.appendChild(logoEditar);
            celda_8.appendChild(boton2)

            row.appendChild(celda_0);
            row.appendChild(celda_1);
            row.appendChild(celda_2);
            row.appendChild(celda_3);
            row.appendChild(celda_4);
            row.appendChild(celda_5);
            row.appendChild(celda_6);
            row.appendChild(celda_7);
            row.appendChild(celda_8);


            miBody.appendChild(row);
            console.log(row)

            indice++
        }

    }else{

    }
}

function borrarBodyTabla(){
    const elemento = document.getElementById('miBody');
    while (elemento.firstChild) {
        elemento.firstChild.remove();
    }
}


document.getElementById('btnAdd').addEventListener('click',crearJugador);

function crearJugador() {
    const jsonJugadores = localStorage.getItem('jugadores');
    const dni = document.getElementById('idni').value;
    const dorsal = document.getElementById('idorsal').value;
  
    if (jsonJugadores !== null) {
      const jsonData = JSON.parse(jsonJugadores);
  
      // Verificar si ya existe un jugador con el mismo DNI o dorsal
      const jugadorDuplicado = jsonData.some(jugador => jugador.dni === dni || jugador.dorsal === dorsal);
  
      if (validacion() !== true && !jugadorDuplicado) {
        const jugadorNuevo = {
            "dni": dni,
            "apellido": document.getElementById('iapellido').value,
            "nombre": document.getElementById('inombre').value,
            "posicion": document.getElementById('iposiciones').value,
            "edad": document.getElementById('iedad').value,
            "apodo": document.getElementById('iapodo').value,
            "pieHabil": document.getElementById('ipie').value,
            "dorsal": dorsal
        };
  
        jsonData.push(jugadorNuevo);
  
        localStorage.removeItem('jugadores');
        localStorage.setItem('jugadores', JSON.stringify(jsonData));
  
        this.leerLocalStorage();
      } else {
        alert("No se puede crear un jugador con el mismo DNI o dorsal");
        
      }
    }
}


function eliminarJugador(param) {
    let td = param.parentNode;
    let tr = td.parentNode;
    let eliminar = parseInt(tr.cells[0].textContent);

    Swal.fire({
      title: "Eliminar Jugador",
      text: "¿Estás seguro de que deseas eliminar este jugador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const jsonJugadores = localStorage.getItem('jugadores');
        const jsonData = JSON.parse(jsonJugadores);
  
        const nuevo = jsonData.filter(function(item) {
          return item.dni != eliminar;
        });
  
        this.borrarLocalStorage();
        const jsonNuevo = JSON.stringify(nuevo);
        localStorage.setItem('jugadores', jsonNuevo);
        window.location.reload();
      }
    });
    
  }


function editarJugador(param) {
    let td = param.parentNode;
    let tr = td.parentNode;

    let editar = parseInt(tr.cells[0].textContent);
    localStorage.setItem('editar', editar);

    window.location.href = "modificarJugador.html";
}


document.getElementById('btnBuscar').addEventListener('click', buscarJugador);

function buscarJugador() {
    const jsonJugadores = localStorage.getItem('jugadores');
    const jsonData = JSON.parse(jsonJugadores);
    const buscar2 = document.getElementById('buscar').value;

    let resultado2 = jsonData.find(persona => persona.apellido === buscar2 || persona.nombre === buscar2 || persona.dorsal === buscar2);

    if (resultado2) {
        let resultado3 = Object.values(resultado2);
        let lista_vacia = [];
        for (let ele of resultado3) {
            lista_vacia.push(ele);
        }

        Swal.fire({
            title: 'El jugador encontrado es:',
            text: lista_vacia.join('--'),
            icon: 'info',
            confirmButtonText: 'Aceptar',
        });
    } else {
        Swal.fire({
            title: 'No se encuentra en la base de datos',
            text: 'No se encuentra en la base de datos',
            icon: 'info',
            confirmButtonText: 'Aceptar',
        });
    }

    if (jsonJugadores !== null) {
        const buscar = document.getElementById('buscar').value;

        const resultado = jsonData.filter(function (item) {
            return item.apellido.toLowerCase().includes(buscar) ||
                item.nombre.toLowerCase().includes(buscar) ||
                item.dorsal.toLowerCase().includes(buscar);
        });

        if (resultado.length > 0) {
            let indic = 0;
            for (let elemen of resultado) {
                const miBody2 = document.getElementById('miBody2');

                let row = document.createElement('tr');
                let celda_0 = document.createElement('td');
                let celda_1 = document.createElement('td');
                let celda_2 = document.createElement('td');

                let texto_0 = document.createTextNode(elemen.apellido);
                let texto_1 = document.createTextNode(elemen.nombre);
                let texto_2 = document.createTextNode(elemen.posicion);

                celda_0.appendChild(texto_0);
                celda_1.appendChild(texto_1);
                celda_2.appendChild(texto_2);

                row.appendChild(celda_0);
                row.appendChild(celda_1);
                row.appendChild(celda_2);

                miBody2.appendChild(row);
                console.log(row);

                indic++;
            }
        }
    } else {
        
        Swal.fire({
            title: 'No se encuentra en la base de datos',
            text: 'No se encuentra en la base de datos',
            icon: 'info',
            confirmButtonText: 'Aceptar',
        });
    }
}
