function postCliente(){

    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");

    var request = new XMLHttpRequest();

    request.open('POST','http://localhost:8000/clientes/?nombre='+nombre.value+'&email='+email.value,true);
    request.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Accept', 'application/json');

    request.onload = function(){
        const status = request.status

        if (status == 200) {
            alert("Guardado!");
            window.location.replace("/get_clientes.html");
        }

        else if(status == 422){
            alert(json.detail);
        }
    };
    request.send();
};