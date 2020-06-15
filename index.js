let date = new Date();
let time = date.getTime();
let counter2 = time;

//Guardar nave
function agregarNave(){
    let nombre = document.getElementById("nombreNave").value;
    let descripcion = document.getElementById("descripcion").value;

    counter2 += 1;
    console.log(counter2);
    let naves = {
        id: counter2,
        nombre,
        descripcion
    };
    console.log(naves);
    let db = firebase.database().ref("naves/"+nombre+"/informacion");
    db.set(naves)
        .then(() => {
            console.log("Nave añadida");
            document.getElementById("nombreNave").value = "";
            document.getElementById("descripcion").value = "";
        })
        .catch((err) => {
            console.error("Error añadiendo nave: ", err);
        });
}


//Mostrar naves
function mostrarNaves(){
    let mostrarNaves = document.getElementById('navesDescripcion');
    let naves= firebase.database().ref("naves/");
    naves.on('value',function(snapshot){
        mostrarNaves.innerHTML = '';
        snapshot.forEach(element => {
            mostrarNaves.innerHTML += `
            <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse"
                role="button" aria-expanded="true" aria-controls="collapseCardExample">
                <h6 class="m-0 font-weight-bold text-primary">${element.val().informacion.nombre}</h6>
            </a>
            <div class="collapse show" id="collapseCardExample">
                <div class="card-body">
                    ${element.val().informacion.descripcion}
                    <div class="my-2"></div>
                    <button class="btn btn-primary" onclick="redireccionar('${element.val().informacion.nombre}')">Más información <i class="fas fa-arrow-right"></i></button>
                    <div class="my-2"></div>
                    <button type="submit" style="color:white; display: inline-block;" data-toggle="modal" data-target="#exampleModal" class="btn btn-info"
                    onclick="actualizarNave(${element.val().informacion.id},'${element.val().informacion.nombre}','${element.val().informacion.descripcion}')"
                     >Editar</button>
                    <button class="btn btn-danger" style="color:white; display: inline-block;" type="submit" 
                    onclick="eliminarNave('${element.val().informacion.nombre}')">Eliminar</button>
                </div>
            </div>
            `
        });
    });

    naves.on("child_removed", function(data){
        let navesValue=data.val();
        let naves= document.getElementById(navesValue.nombre);
        if(naves){naves.remove()}
        console.log("Se elimino ", navesValue);
    });
}


//Actualizar nave
function actualizarNave(id,nombre,descripcion){   
    console.log(id,nombre,descripcion);
    document.getElementById("nombreNave").value=nombre;
    document.getElementById("descripcion").value=descripcion;

    let actualizar = document.getElementById("actualizarNave");
    actualizar.style.display = 'inline-block';
    let cancelar = document.getElementById("cancelarActualizar");
    cancelar.style.display = 'inline-block';
    let botonGuardar = document.getElementById('agregarNave');
    botonGuardar.style.display = 'none';
    let modal = document.getElementById('cancelarModal');
    modal.style.display = 'none';
  
    actualizar.onclick=function(){
      let nombreNave = document.getElementById("nombreNave").value;
      let descripcion = document.getElementById("descripcion").value;
      let data = {
        id,
        nombreNave,
        descripcion
      };
      firebase.database().ref('naves/' +nombreNave+"/informacion/").update(data).then(()=>{
      console.log("Nave actualizada");
      actualizar.innerHTML="Agregar"
      document.getElementById("nombreNave").value='';
      document.getElementById("descripcion").value='';
    }).catch(err =>{
      console.log('ALGO FALLÓ, CORRE: ',err);
    });
  }
}

function cancelarEditar(){
    let botonGuardar = document.getElementById('agregarNave');
    botonGuardar.style.display = 'inline-block';
    botonGuardar.innerHTML="Agregar";
    let modal = document.getElementById('cancelarModal');
    modal.style.display = 'inline-block';
    let actualizar = document.getElementById("actualizarNave");
    actualizar.style.display = 'none';
    let cancelar = document.getElementById("cancelarActualizar");
    cancelar.style.display = 'none';
    document.getElementById("nombreNave").value='';
    document.getElementById("descripcion").value='';
}

function redireccionar(nombre){
    location.href='sensores.html'  
    localStorage.setItem('nave', nombre)  
}

function eliminarNave(nombre){
    let nave= firebase.database().ref("naves/"+nombre);
    nave.remove().then(()=>{
      console.log('Nave eliminado');
    }).catch(err=>{
     console.log('Error al eliminar la nave:',err);
    });
}