function deleteCliente(id_cliente) {

    var request = new XMLHttpRequest();

    request.open('DELETE', 'http://localhost:8000/clientes/'+id_cliente, true);
    request.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"))
    request.setRequestHeader("Accept","application/json")

    request.onload = () => {
        if (request.status == 200) {
            alert("Eliminado")
            window.location.reload("/get_clientes.html")
        }

        else if(request.status == 401){
            alert(json.detail);
        }
    };
    request.send();
};