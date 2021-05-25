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
database.ref('Usuarios/'+'Jan').set({
    nom: 'Jan',
    data: {
        email: 'Jan@asd.asd',
        pass: 'asd',
        reg: [{nom: 'comer', des: 'comer'}, {nom: 'dormir', des: 'dormir'}]
    }
});
function index(){
    document.getElementById('div').innerHTML = "En esta página se hace registro de cosas variadas muy shidoris";
}
function iniSesion(){
    document.getElementById('div').innerHTML = "<form id='formi'>Usuario: <input class='usu' name='usu' type='text' placeholder='usuario'/> <br>"+
                                "Contraseña: <input class='pass' name='pass' type='password' placeholder='contraseña' /><br>"+
                                "<input type='button' name='Button' value='Iniciar Sesión' onclick='sesion(this.form)'>"+
                                "</form>";
}
function sesion(form){
    var usuario = form.usu.value;
    database.ref("Usuarios/" + usuario).get().then(x => {
        if(x.exists()){
            database.ref("Usuarios/" + usuario + "/data").get().then(y => {
                if(y.val().pass === form.pass.value){
                    sessionStorage.setItem("usu", form.usu.value);
                    console.log("Sesion iniciada")
                    document.getElementById('div').innerHTML = "Sesión de: " + form.usu.value;
                    document.getElementById('nav').innerHTML = "<button name= 'ini' class='btn' onclick='javascript:index()'>Inicio</button>" 
                    + "<button id='reg' class='btn' onclick='registro()'>Registros</button>"
                    + "<button name='cer' class='btncer'>Cerrar sesión</button>"
                }else{
                    alert("Contraseña equivocada");
                }
            })
        }else{
            alert("El usuario no existe");
        }
    });
}
function registro(){
    document.getElementById('div').innerHTML = "<form name='form2'>Actividad:<input type='text' name='nom' placeholder='Nombre de la actividad'><br>"
        +"Descripción<input type='text' name='des' placeholder='Descripcion de la actividad'><br>"
        +"<input type='button' value='Registrar actividad' onclick='regAct(this.form)'></form>"
        + "<div id='registros'></div>"   
    existentes();
}
function regAct(form){
    
    var a=[];        
    var nom = form.nom.value, des = form.des.value;
    
    database.ref("Usuarios/" + "Jan" + "/data/reg").get().then(x => {
        x.val().forEach(y => {
            a.push(y);
        });
        a.push({nom: nom, des: des});
    }).then(() => {
        database.ref("Usuarios/" + "Jan" + "/data/reg").set(a).then(existentes())
    });
}
function existentes(){
    database.ref("Usuarios/"+"Jan"+"/data/reg").get().then((snapshot)=>{
        if(snapshot){
            var reg = "Registros actuales: <br>";
            console.log(snapshot.val());
            for(x of snapshot.val()){
                reg += "Actividad: " + x.nom + "<br>"; 
            }
                
            document.getElementById('registros').innerHTML = reg;
        }else{console.log("No existe")}
    })
}