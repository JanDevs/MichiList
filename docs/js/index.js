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
    document.getElementById('div').innerHTML = "<h1 class='bien'>Bienvenido</h1>";
}
function indexPost(){
    var cosa = "";
    var ind = 0;
    var imagenes = [];
    cosa += "<div name='create' id='create'>"
            + "<form>"
            + "<p class='creaPost'>Crear un nuevo post</p>"
            + "<textarea name='txtPost' id='txt' placeholder='Ingrese el texto'></textarea><br>"
            + "<input type='button' class='btn' id='subImg' onclick='obArch()' value='Imagen'><input type='file' class='btnimg' name='img' id='file' onchange='labelArchivo(this)'><br>"
            + "<label id='archivoTexto' for='file'></label><br>"
            + "<input type='button' id='subPost' class='btn' value='Subir post' onClick='publiPost(this.form)'/>"
            + "</form></div>"
    db.collection("posts").limit(30).orderBy("Fecha", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            cosa += `<div class='posteos' id='posteos'> 
                        <p class='txtPosteos'>${doc.data().Fecha}<br>
                       ${doc.data().Usu}: ${doc.data().Texto}</p>
                        <img id='img${ind}' src=""/></div><br>`;
            imagenes.push(doc.data().imagen);
            ind++;
        });
    }).then(() => {
        document.getElementById('div').innerHTML = cosa;
    }).then(() => {
        imagenes.forEach((x, y) => {
            storageRef.child(x).getDownloadURL().then(z => {document.getElementById("img"+y).src = z});
        })
    })
}
function obArch(){
    document.getElementById('file').click();
    document.getElementById('subImg').style.display = "none";
}
function labelArchivo(obj){
    var arc = obj.value;
    var nom = arc.split("\\");
    document.getElementById("archivoTexto").innerHTML = nom[nom.length-1]
}
function publiPost(form){
    var txt = form.txtPost.value;
    var usu = sessionStorage.getItem('nomUsu');
    var img = form.img.files[0];
    let id = Math.floor(Math.random() * 1092398349);
    let rut = '/mishis/' + img.name + id + '/' + img.name;    
    const d = new Date();
    const fecha = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear(); 
    storageRef.child(rut).put(img).then(alert("si se pudo")).catch((e) => {console.log(e)});
    db.collection('posts').doc().set({
        Fecha: fecha,
        Texto: txt,
        Usu: usu,
        imagen: rut
    }).finally(setTimeout(indexPost(), 1500));
    
}
function iniSesion(){
    sessionStorage.clear();
    document.getElementById('div').innerHTML = "<form id='formi'><p class='usuP'>Usuario:</p> <input class='txt' name='usu' type='text' placeholder='usuario'/>"+
                                "<p class='usuP'>Contraseña: </p><input class='txt' name='pass' type='password' placeholder='contraseña' /><br><br><br>"+
                                "<input type='button' class='btnIniReg' name='Button' value='Iniciar Sesión' onclick='sesion(this.form)'>     "+
                                "<input type='button' class='btnIniReg' name='button' value='Registrarme' onclick='nUsu()'>" +
                                "</form>";
}
function sesion(form){
    var usuario = form.usu.value;
    var pass = form.pass.value;
    firebase.auth().signInWithEmailAndPassword(usuario, pass).then(() => {
        db.collection('Usuarios').where('email', '==', usuario).get().then(x => {x.forEach((y)=>{
            sessionStorage.setItem('cor', y.data().email);
            sessionStorage.setItem('nomUsu', y.data().nomUsu);
        })
    }).finally(()=> {
            console.log("Sesion iniciada")
            document.getElementById('div').innerHTML = "Sesión de: " + sessionStorage.getItem('nomUsu');
            document.getElementById('nav').innerHTML = "<button name= 'ini' class='btn' onclick='javascript:indexPost()'>Inicio</button>" 
                + "<button id='perfil' class='btn' onclick='perfil()'>Editar perfil</button>"
                + "<button name='cer' class='btncer' onclick='cerrarSesion()'>Cerrar sesión</button>";
        })
        
    }).catch((error) => {
        console.log(error);
    })
}
function nUsu(){
    document.getElementById('div').innerHTML = "<br><br><form>Correo: <input type='email' class='txt' name='nom' placeholder='Inserte correo'><br><br>"
                                    + "Nombre de usuario: <input type='text' class='txt' name='usu' placeholder='Inserte nombre de usuario'><br><br>"
                                    + "Contraseña: <input type='text' class='txt' name='pass' placeholder='Ingrese la contraseña'> <br><br>"
                                    + "Confirmar contraseña: <input type='password' class='txt' name='conf' placeholder='Confirme contraseña'><br><br>"
                                    + "<input type='button' class='btnIniReg' value='Registrar' onclick='regUsu(this.form)'></form>";
}
function regUsu(form){
    var usuario = form.nom.value;
    var usu = form.usu.value;
    var pass = form.pass.value;
    if(pass === form.conf.value){
        firebase.auth().createUserWithEmailAndPassword(usuario, pass).then(() => {
            alert("Usuario registrado exitosamente");
        }).then(()=> {
            db.collection('Usuarios').doc().set({
                email: usuario,
                nomUsu: usu
            }).catch((error) => console.log(error))
        }).catch((error) => {
            console.log(error);
        }).then(iniSesion());
    }else{
        alert("Las contraseñas no coinciden");
    }   
}
function perfil(){
    document.getElementById('div').innerHTML = `Actualizar perfil<br>
                                                <form>
                                                Ingresa correo actual: <input type='email' class='txt' name='emailConf' required><br><br>
                                                Nuevo Correo: <input type='email' class='txt' name='email'><br><br>
                                                Nombre de usuario: <input type='text' class='txt' name='nom' placeholder='${sessionStorage.getItem('nomUsu')}'><br><br>
                                                Ingresa tu contraseña: <input type='password' class='txt' name='conf' required><br><br>
                                                Contraseña nueva: <input type='password' class='txt' name='pass'><br><br>
                                                <input type='button' class='btnIniReg' value='confirmar' onclick='actualizaPerfil(this.form)'>
                                                </form>`                                        
}
function actualizaPerfil(form){
    var cor = form.email.value;
    var nom = form.nom.value;
    var pass = form.pass.value;
    var conf = form.conf.value;
    var corconf = form.emailConf.value;
    firebase.auth().signInWithEmailAndPassword(corconf, conf).then(credencial => {
        alert("Reautenticacion");
        if(cor != null && cor != ""){
            firebase.auth().currentUser.updateEmail(cor).then(alert("Correo actualizado por: " + cor)).catch(e => console.log(e));
            sessionStorage.setItem('cor', cor);
        }else if(nom != null && nom != ""){
            db.collection('Usuarios').where('email', '==', cor).get().then(x => {
                x.forEach(y => {
                    y.update({
                        nomUsu: nom,
                    });
                });
                sessionStorage.setItem('nomUsu', nom);
            }).then(alert("Usuario actualizado por: " + nom)).catch(e => console.log(e));
        }else if(pass != null && pass != ""){
            firebase.auth().currentUser.updatePassword(pass).then(alert("Contraseña actualizada")).catch(e => console.log(e));
        }
    }).then(()=> setTimeout(()=>{
        if(cor != null && cor != ""){
            if(pass != null && pass != ""){
                firebase.auth().signInWithEmailAndPassword(cor, pass)
            }else{
                firebase.auth().signInWithEmailAndPassword(cor, conf)
            }
        }else if(pass != null && pass != ""){
            firebase.auth().signInWithEmailAndPassword(corconf, pass)
        }else{
            firebase.auth().signInWithEmailAndPassword(corconf, conf)
        }
    },4000)).then(setTimeout(() => document.getElementById('div').innerHTML = `<h1>Datos actualizados correctamente c:</h1>`, 1000));
}
function cerrarSesion(){
    document.location.reload();
}
