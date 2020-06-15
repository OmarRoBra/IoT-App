/* let firebaseConfig = {
    apiKey: "AIzaSyDlBW8k0czNHhdDwK265IqAtt_qgNKb7SM",
    authDomain: "control-de-un-invernadero.firebaseapp.com",
    databaseURL: "https://control-de-un-invernadero.firebaseio.com",
    projectId: "control-de-un-invernadero",
    storageBucket: "control-de-un-invernadero.appspot.com",
    messagingSenderId: "103114132808",
    appId: "1:103114132808:web:806b125d430ea4869ef77d",
    measurementId: "G-2G03EB94PP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); */
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBEs_fOhXJS8inmyxcGbss3wESHmWypxoI",
  authDomain: "redes-7f174.firebaseapp.com",
  databaseURL: "https://redes-7f174.firebaseio.com",
  projectId: "redes-7f174",
  storageBucket: "redes-7f174.appspot.com",
  messagingSenderId: "444028512040",
  appId: "1:444028512040:web:c151f914e67bc889ac521d",
  measurementId: "G-TK8QYSLE1Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  let d = new Date();
  let t = d.getTime();
  let counter = t;

//Guardar sensores
function guardarSensor(){
      let nombreNave=localStorage.getItem('nave');
      let nombre = document.getElementById("nombre").value;
      let minimo = document.getElementById("minimo").value;
      let maximo = document.getElementById("maximo").value;
      if(nombre==='luz'){
        minimo = '-';
        maximo = '-';
      }
      let tipo;
      switch(nombre){
        case 'altitud':
          tipo = 'BMP180'
          break;
        case 'distancia':
          tipo = 'HC-SR04'
          break;
        case 'humedad':
          tipo = 'DHT11'
          break;
        case 'luz':
          tipo = 'LDR'
          break;
        case 'servomotor':
          tipo = 'Servomotor SG90'
          break;
        case 'presion':
          tipo = 'BMP180'
          break;
        case 'temperatura':
          tipo = 'BMP180'
          break;
      }
      counter+=1;
      console.log(counter);
      let sensor={
          id:counter,
          nombre,
          tipo,
          minimo,
          maximo
      }
      let db=firebase.database().ref("naves/"+nombreNave+"/sensores/"+nombre);
      db.set(sensor).then(()=>{
        console.log("Sensor añadido");
        document.getElementById("nombre").value='';
        document.getElementById("tipo").value='';
        document.getElementById("minimo").value='';
        document.getElementById("maximo").value='';
      }).catch(err =>{
        console.error("Error añadiendo sensor: ", err);
      });
  }

//Leer datos - mostrar tabla
let tabla = document.getElementById("tabla");
let nombreNave=localStorage.getItem('nave');
let sensor= firebase.database().ref("naves/"+nombreNave+"/sensores/");

sensor.on('value', function(snapshot){
  tabla.innerHTML='';
  snapshot.forEach((data) =>{
    let sensorValue=data.val();
    tabla.innerHTML += `
    <tr id="${sensorValue.nombre}">
      <th scope="row">${sensorValue.id}</th>
      <td>${sensorValue.nombre}</td>
      <td>${sensorValue.tipo}</td>
      <td>${sensorValue.minimo}</td>
      <td>${sensorValue.maximo}</td>
      <td><button type="submit" style="color:white" class="btn btn-info"
      onclick="actualizarSensor(${sensorValue.id},'${sensorValue.nombre}','${sensorValue.minimo}','${sensorValue.maximo}')"
      >Editar</button></td>
      <td><button class="btn btn-danger" type="submit" onclick="eliminarSensor('${sensorValue.nombre}')">Eliminar</button></td>
      `
  });
});

//Actualizar sensor
function actualizarSensor(id,nombre,minimo,maximo){   
  let nombreNave=localStorage.getItem('nave');
  document.getElementById("nombre").value=nombre;
  document.getElementById("minimo").value=minimo;
  document.getElementById("maximo").value=maximo;
  let actualizar = document.getElementById("button2");
  actualizar.style.display = 'inline-block';
  let cancelar = document.getElementById("button3");
  cancelar.style.display = 'inline-block';
  let botonGuardar = document.getElementById('button1');
  botonGuardar.style.display = 'none';

  actualizar.onclick=function(){
    let nombre = document.getElementById("nombre").value;
    let tipo;
    let minimo = document.getElementById("minimo").value;
    let maximo = document.getElementById("maximo").value;
    switch(nombre){
      case 'altitud','presion','temperatura':
        tipo = 'BMP180'
        break;
      case 'distancia':
        tipo = 'HC-SR04'
        break;
      case 'humedad':
        tipo = 'DHT11'
        break;
      case 'luz':
        tipo = 'LDR'
        break;
      case 'servomotor':
        tipo = 'Servomotor SG90'
        break;
    }
    let data = {
      id,
      nombre,
      tipo,
      minimo,
      maximo,
    };
    firebase.database().ref("naves/"+nombreNave+"/sensores/" +nombre).update(data).then(()=>{
    console.log("Sensor actualizado");
    actualizar.style.display = 'none';
    cancelar.style.display = 'none';
    botonGuardar.style.display = 'inline-block';
    document.getElementById("nombre").value='';
    document.getElementById("minimo").value='';
    document.getElementById("maximo").value='';
  }).catch(err =>{
    console.log('ALGO FALLÓ, CORRE: ',err);
  });
}
}

//Eliminar sensor
function eliminarSensor(nombre){
  let nombreNave=localStorage.getItem('nave');
   let sensor= firebase.database().ref("naves/"+nombreNave+"/sensores/"+nombre);
   sensor.remove().then(()=>{
     console.log('Sensor eliminado');
   }).catch(err=>{
    console.log('Error al eliminar el sensor:',err);
   });
}

//MODAL
$("#exampleModal").on("show.bs.modal", function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data(""); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find(".modal-title").text("New message to " + recipient);
  modal.find(".modal-body input").val(recipient);
});