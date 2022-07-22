function updateCliente() {
    var id_cliente = window.location.search.substring(1);

    let nombre = document.getElementById("nombre_update").value;
    let email = document.getElementById("email_update").value;

    

    var request = new XMLHttpRequest();
    if(nombre != "" && email != "" ){
        var url = 'http://localhost:8000/clientes/'+id_cliente+'?nombre='+nombre+'&email='+email

        request.open('PUT',url , true);
        request.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"))

        request.onload = () => {
            const response = request.responseText;
            const json = JSON.parse(response);
            

            if (request.status == 200) {
                window.location.replace("/get_clientes.html")
            }

            else if(request.status == 401){
                alert(json.detail);
            }
        };
        request.send();
    }else{
        alert("Llena todos los campos")
    }
};