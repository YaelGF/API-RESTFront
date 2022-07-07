function getCliente() {
    var id_cliente = window.location.search.substring(1);
    console.log("Id cliente " + id_cliente);


    var request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:8000/clientes/'+id_cliente, true);
    request.setRequestHeader("Authorization", "Basic " + btoa("user:user"))

    request.onload = () => {
        const response = request.responseText;
        const json = JSON.parse(response);

        console.log("Response " + json);
        

        if (request.status == 200) {
            let nombre = document.getElementById("nombre");
            let email = document.getElementById("email");

            nombre.value = json.nombre;
            email.value = json.email;
        }

        else if(request.status == 401){
            alert(json.detail);
        }
    };
    request.send();

};