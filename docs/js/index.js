// Set the configuration for your app
// TODO: Replace with your project's config object
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACT3iN-MlIjnmz_fUdVuOEmhdTa0i-XWY",
    authDomain: "mishis-90e0e.firebaseapp.com",
    projectId: "mishis-90e0e",
    storageBucket: "mishis-90e0e.appspot.com",
    databaseURL: "https://mishis-90e0e-default-rtdb.firebaseio.com",
    messagingSenderId: "322242581078",
    appId: "1:322242581078:web:e0613936f075f12d2de1f7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();
var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();
var posts = storageRef.child('picsa.png');

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
function indexPost(){
    var cosa = "";
    var ind = 0;
    var imagenes = [];
    cosa += "<div name='create' id='create'>"
            + "<form>"
            + "<p name='titulo'>Crear un nuevo post</p>"
            + "<textarea name='txtPost' id='txt' placeholder='Ingrese el texto'> </textarea><br>"
            + "<input type='file' name='img' id='file'><br>"
            + "<input type='button' id='subPost' value='Subir post' onClick='publiPost(this.form)'/>"
            + "</form></div>"
    db.collection("posts").orderBy("Fecha", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            cosa += `<div>${doc.data().Fecha}<br>
                        ${doc.data().Texto}<br>
                        <img id='img${ind}' src=""/></div><br>`;
            imagenes.push(doc.data().imagen);
            ind++;
        });
    }).then(() => {
        console.log(cosa);
        document.getElementById('div').innerHTML = cosa;
    }).then(() => {
        console.log("a");
        console.log(imagenes);
        imagenes.forEach((x, y) => {
            storageRef.child(x).getDownloadURL().then(z => {document.getElementById("img"+y).src = z});
        })
    })
}
function publiPost(form){
    var txt = form.txtPost.value;
    var email = "a@a.com"
    var img = form.img.files[0];
    let id = Math.floor(Math.random() * 1092398349);
    let rut = '/mishis/' + img.name + id + '/' + img.name;    
    const d = new Date();
    const fecha = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear(); 
    storageRef.child(rut).put(img).then(alert("si se pudo")).catch((e) => {console.log(e)});
    db.collection('posts').doc().set({
        Fecha: fecha,
        Texto: txt,
        Usu: email,
        imagen: rut
    }).finally(setTimeout(indexPost(), 1500));
    
}
function iniSesion(){
    document.getElementById('div').innerHTML = "<form id='formi'>Usuario: <input class='usu' name='usu' type='text' placeholder='usuario'/> <br>"+
                                "Contraseña: <input class='pass' name='pass' type='password' placeholder='contraseña' /><br>"+
                                "<input type='button' name='Button' value='Iniciar Sesión' onclick='sesion(this.form)'>"+
                                "<input type='button' name='button' value='Registrarme' onclick='nUsu()'>" +
                                "</form>";
}
function sesion(form){
    var usuario = form.usu.value;
    var pass = form.pass.value;
    firebase.auth().signInWithEmailAndPassword(usuario, pass).then((userCredential) => {
        console.log(userCredential.user);
        console.log("Sesion iniciada")
        document.getElementById('div').innerHTML = "Sesión de: " + form.usu.value;
        document.getElementById('nav').innerHTML = "<button name= 'ini' class='btn' onclick='javascript:indexPost()'>Inicio</button>" 
                + "<button id='reg' class='btn' onclick='registro()'>Registros</button>"
                + "<button name='cer' class='btncer'>Cerrar sesión</button>";
    }).catch((error) => {
        console.log(error);
    })
}
function nUsu(){
    document.getElementById('div').innerHTML = "<form>Usuario: <input type='text' name='nom' placeholder='Inserte nombre de usuario'><br>"
                                    + "Contraseña: <input type='text' name='pass' placeholder='Ingrese la contraseña'> <br>"
                                    + "Confirmar contraseña: <input type='password' name='conf' placeholder='Confirme contraseña'><br>s"
                                    + "<input type='button' value='Registrar' onclick='regUsu(this.form)'></form>";
}
function regUsu(form){
    var usuario = form.nom.value;
    var pass = form.pass.value;
    if(pass === form.conf.value){
        firebase.auth().createUserWithEmailAndPassword(usuario, pass).then((userCredential) => {
            // Signed in
            alert("Usuario registrado exitosamente");
            // ...
        }).catch((error) => {
            console.log(error);
            // ..
        });
    }else{
        alert("Las contraseñas no coinciden");
    }   
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
    
    database.ref("Usuarios/" + sessionStorage.getItem('usu') + "/data/reg").get().then(x => {
        if(x.exists()){
            x.val().forEach(y => {
                a.push(y);
            });
            a.push({nom: nom, des: des});            
        }else{
            a.push({nom: nom, des: des});
        }
        
    }).then(() => {
        database.ref("Usuarios/" + sessionStorage.getItem('usu') + "/data/reg").set(a).then(existentes())
    });
}
function existentes(){
    database.ref("Usuarios/"+ sessionStorage.getItem('usu') +"/data/reg").get().then((snapshot)=>{
        if(snapshot.exists()){
            var reg = "Registros actuales: <br>";
            console.log(snapshot.val());
            for(x of snapshot.val()){
                reg += "Actividad: " + x.nom + "<br>"; 
            }
                
            document.getElementById('registros').innerHTML = reg;
        }else{console.log("No existe")}
    })
}
function getPost(){
    database.ref("Post").get().then((p) => {
        if(p.exists()){

        }
    })
}