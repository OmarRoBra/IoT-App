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

document.getElementById('nombreNaveTitle').innerHTML = localStorage.getItem('nave');
  
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
      //console.log(counter);
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
      `;
  });
});

let count=0;
let counts=[];
let count1=0;
let counts1=[];
let count2=0;
let counts2=[];
let count3=0;
let counts3=[];
let count4=0;
let counts4=[];
let servomotor=0;
let luz=0;
let altitud=[];
let distancia=[];
let humedad=[];
let presion=[];
let temperatura=[];
let altitudMax=0;
let altitudMin=0;
let distanciaMax=0;
let distanciaMin=0;
let humedadMax=0;
let humedadMin=0;
let presionMax=0;
let presionMin=0;
let temperaturaMax=0;
let temperaturaMin=0;
sensor.on("child_changed",function(data){
    let sensorValue=data.val();
    //console.log("nombre",sensorValue.nombre);
    //console.log("maximo",sensorValue.maximo);
    let nombre=sensorValue.nombre;

    switch(nombre){
      case 'distancia':
        count++;
        let valor=sensorValue.valor;
        if(count===110){ count=1; counts=[count]; }
        else{
        counts.push([count]);
        distancia.push([sensorValue.valor]);
        console.log("array de count",counts);
        console.log("array de distancia",distancia);}
       // drawBasic(distancia);
        distanciaArray(counts,distancia);
        distanciaMax=sensorValue.maximo;
        distanciaMin=sensorValue.minimo;
        if(valor>=distanciaMax){ document.getElementById("alertadistancia").innerHTML="Alerta se ha llegado a su valor maximo";} 
        else if(valor<=distanciaMin){document.getElementById("alertadistancia").innerHTML="Alerta se ha llegado a su valor minimo";}
        else {document.getElementById("alertadistancia").innerHTML="";}
        break;
           
      case 'altitud':
        count1++;
        let valor1=sensorValue.valor;
        if(count1===110){count1=1; counts1=[count1]}
        else{
        counts1.push([count1]);
        altitud.push([sensorValue.valor]);}
        altitudArray(counts1,altitud);
        altitudMax=sensorValue.maximo;
        altitudMin=sensorValue.minimo;
        if(valor1>=altitudMax){ document.getElementById("alertaaltitud").innerHTML="Alerta se ha llegado a su valor maximo";} 
        else if(valor1<=altitudMin){document.getElementById("alertaaltitud").innerHTML="Alerta se ha llegado a su valor minimo";}
        else {document.getElementById("alertaaltitud").innerHTML="";}
        break;     
      case 'humedad':
        count2++;
        let valor2=sensorValue.valor;
        if(count2===110){count2=1; counts2=[count2];}
        else{
        counts2.push([count2]);
        humedad.push([sensorValue.valor]);}
       // console.log("humedad array",humedad);
        humedadArray(counts2,humedad);
        //drawBasic3(humedad,nombre);
        humedadMax=sensorValue.maximo;
        humedadMin=sensorValue.minimo;
        if(valor2>=humedadMax){ document.getElementById("alertahumedad").innerHTML="Alerta se ha llegado a su valor maximo";} 
        else if(valor2<=humedadMin){document.getElementById("alertahumedad").innerHTML="Alerta se ha llegado a su valor minimo";}
        else {document.getElementById("alertahumedad").innerHTML="";}
        break;       
      case 'luz':
        console.log('relay1', sensorValue.relay1);
        document.getElementById("luzRelay").innerHTML=sensorValue.relay1+" veces";
        break;
      case 'servomotor':
        document.getElementById("servomotorRelay").innerHTML=sensorValue.relay2 +" veces";
        break;
      case 'presion':
        count3++;
        let valor3=sensorValue.valor;
        if(count3===110){count3=1; counts3=[count3];}
        else{
        counts3.push([count3]);
        presion.push([sensorValue.valor]);}
        console.log("presion array",presion);
        console.log("presion count",counts3);
        presionArray(counts3,presion);

        presionMax=sensorValue.maximo;
        presionMin=sensorValue.minimo;
        if(valor3>=presionMax){ document.getElementById("alertapresion").innerHTML="Alerta se ha llegado a su valor maximo";} 
        else if(valor3<=presionMin){document.getElementById("alertapresion").innerHTML="Alerta se ha llegado a su valor minimo";}
        else {document.getElementById("alertapresion").innerHTML="";}
        break;
      case 'temperatura':
        count4++;
        let valor4=sensorValue.valor;
        if(count4===110){count4=1; counts4=[count4];}
        else{
        counts4.push([count4]);
        temperatura.push([sensorValue.valor]);}
        temperaturaArray(counts4,temperatura);
        temperaturaMax=sensorValue.maximo;
        temperaturaMin=sensorValue.minimo;
        if(valor4>=temperaturaMax){ document.getElementById("alertatemperatura").innerHTML="Alerta se ha llegado a su valor maximo";} 
        else if(valor4<=temperaturaMin){document.getElementById("alertatemperatura").innerHTML="Alerta se ha llegado a su valor minimo";}
        else {document.getElementById("alertatemperatura").innerHTML="";}
        break; 
    }
    let sensorFila= document.getElementById(sensorValue.nombre);
   console.log("Se edito ", sensorValue);
   console.log("valor:",sensorValue.valor);
   sensorFila.children[1].innerText=sensorValue.nombre;
   sensorFila.children[2].innerText=sensorValue.tipo;
   sensorFila.children[3].innerText=sensorValue.minimo;
   sensorFila.children[4].innerText=sensorValue.maximo;
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
    if(nombre==='luz'){
      minimo = '-';
      maximo = '-';
    }
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

//graficas con chart.js

    function distanciaArray(count,distancia){
      var hola=distancia;
      var datos=count;

      var speedCanvas = document.getElementById("speedChart");

      Chart.defaults.global.defaultFontFamily = "Lato";
      Chart.defaults.global.defaultFontSize = 18;
      
      var speedData = {
        labels: datos,
        datasets: [{
          label: "Distancia",
          backgroundColor:"rgb(255, 87, 51,0.75)" ,
          data: hola,
        }]
      };
      
      var chartOptions = {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        }
      };
      
      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        data: speedData,
        options: chartOptions
      });

    }
    function altitudArray(count,distancia){
      var hola=distancia;
      var datos=count;

      var speedCanvas = document.getElementById("speedChart1");

      Chart.defaults.global.defaultFontFamily = "Lato";
      Chart.defaults.global.defaultFontSize = 18;
      
      var speedData = {
        labels: datos,
        datasets: [{
          label: "Altitud",
          backgroundColor:"rgb(255, 87, 51,0.75)" ,
          data: hola,
        }]
      };
      
      var chartOptions = {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        }
      };
      
      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        data: speedData,
        options: chartOptions
      });

    }

    function humedadArray(count,distancia){
      var hola=distancia;
      var datos=count;

      var speedCanvas = document.getElementById("speedChart2");

      Chart.defaults.global.defaultFontFamily = "Lato";
      Chart.defaults.global.defaultFontSize = 18;
      
      var speedData = {
        labels: datos,
        datasets: [{
          label: "Humedad",
          backgroundColor:"rgb(255, 87, 51,0.75)" ,
          data: hola,
        }]
      };
      
      var chartOptions = {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        }
      };
      
      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        data: speedData,
        options: chartOptions
      });

    }
    function presionArray(count,distancia){
      var hola=distancia;
      var datos=count;

      var speedCanvas = document.getElementById("speedChart3");

      Chart.defaults.global.defaultFontFamily = "Lato";
      Chart.defaults.global.defaultFontSize = 18;
      
      var speedData = {
        labels: datos,
        datasets: [{
          label: "Presion",
          backgroundColor:"rgb(255, 87, 51,0.75)" ,
          data: hola,
        }]
      };
      
      var chartOptions = {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        }
      };
      
      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        data: speedData,
        options: chartOptions
      });

    }

    function temperaturaArray(count,distancia){
      var hola=distancia;
      var datos=count;

      var speedCanvas = document.getElementById("speedChart4");

      Chart.defaults.global.defaultFontFamily = "Lato";
      Chart.defaults.global.defaultFontSize = 18;
      
      var speedData = {
        labels: datos,
        datasets: [{
          label: "Temperatura",
          backgroundColor:"rgb(255, 87, 51,0.75)" ,
          data: hola,
        }]
      };
      
      var chartOptions = {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        }
      };
      
      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        data: speedData,
        options: chartOptions
      });

    }
    