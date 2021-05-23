// Set the configuration for your app
// TODO: Replace with your project's config object
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACT3iN-MlIjnmz_fUdVuOEmhdTa0i-XWY",
    authDomain: "mishis-90e0e.firebaseapp.com",
    projectId: "mishis-90e0e",
    storageBucket: "mishis-90e0e.appspot.com",
    messagingSenderId: "322242581078",
    appId: "1:322242581078:web:e0613936f075f12d2de1f7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();
function index(){
    document.getElementById('div').innerHTML = "En esta página se hace registro de cosas variadas muy shidoris";
}
function iniSesion(){
    document.getElementById('div').innerHTML = "<form id='formi'>Usuario: <input class='usu' name='usu' type='text' placeholder='usuario'/> <br>"+
                                "Contraseña: <input class='pass' name='pass' type='password' placeholder='contraseña' /><br>"+
                                "<input type='button' name='Button' value='Iniciar Sesión' onClick='sesion(this.form)'>"+
                                "</form>";
}
function sesion(form){
    console.log(form.usu.value);
    if(form.usu.value === "asd"){
        if(form.pass.value === "asd"){
            console.log("Sesion iniciada")
            document.getElementById('div').innerHTML = "Sesión de: " + form.usu.value;
            document.getElementById('nav').innerHTML = "<button name= 'ini' class='btn' onclick='javascript:index()'>Inicio</button>" 
            + "<button id='reg' class='btn'>Registros</button>"
            + "<button name='cer' class='btncer'>Cerrar sesión</button>"
        }
    }
}
