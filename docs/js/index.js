function index(){
    document.getElementById('div').innerHTML = "En esta página se hace registro de cosas variadas muy shidoris";
}
function iniSesion(){
    document.getElementById('div').innerHTML = "<form id='formi'>Usuario: <input class='usu' name='usu' type='text' placeholder='usuario'/> <br>"+
                                "Contraseña: <input class='pass' name='pass' type='password' placeholder='contraseña' /><br>"+
                                "<input type='button' name='Button' value='Iniciar Sesión' onClick='sesion(this.form)'>"+
                                "</form>";
}
function crear(){
    document.getElementByName('reg').style.visibility = "hidden";
}
function sesion(form){
    console.log(form.usu.value);
    if(form.usu.value === "asd"){
        if(form.pass.value === "asd"){
            console.log("Sesion iniciada")
            document.getElementById('div').innerHTML = "Sesión de: " + form.usu.value;
        }
    }
}
