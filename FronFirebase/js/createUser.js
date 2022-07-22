function createUser(){

    let email = document.getElementById("email");
    let password = document.getElementById("password")
    let passwordC = document.getElementById("passwordC")
    let name = document.getElementById("name")

    var request = new XMLHttpRequest();
    if(password.value !== passwordC.value){
        alert("Contraseñas no Coinciden")
    };
    request.open("POST","http://127.0.0.1:8000/user/?email="+email.value+"&password="+password.value+"&name="+name.value,true);
    request.setRequestHeader('Accept', 'application/json');

    request.onload = function(){
        const status = request.status

        if (status == 200) {
            alert("Usuario Creado");
            window.location.replace("/index.html");
        }

        else{
            alert(json.detail);
        }
    };
    request.send();
};