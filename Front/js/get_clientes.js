function getClientes(offset) {
    var request = new XMLHttpRequest();
    //Accede a la session de la pagina
    username= sessionStorage.getItem("username");
    password= sessionStorage.getItem("password");
   
    request.open('GET', 'http://localhost:8000/clientes/?offset='+offset+'&limit=10', true);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Authorization", "Basic " + btoa("user:user"))
    request.setRequestHeader("Content-Type", "application/json");

    const  tabla   = document.getElementById("tabla_clientes");

    var tblBody = document.createElement("tbody");
    var tblHead = document.createElement("thead");

    tblHead.innerHTML = `
        <tr>
            <th>Detalle</th>
            <th>Id</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Actualizar</th>
            <th>Borrar</th>
        </tr>`;

    request.onload = () => {
        // Almacena la respuesta en una variable, si es 202 es que se obtuvo correctamente
        const response = request.responseText;
        const json = JSON.parse(response);
        console.log("Response " + response);
        console.log("Json " +  json);
        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
            window.location.replace("http://localhost:8000/clientes/validate/");
        }
        else if (request.status == 202){
            for (let i = 0; i < json.length; i++) {
                var tr = document.createElement('tr');
                var td_get_cliente = document.createElement('td');
                var td_id_cliente = document.createElement('td');
                var td_nombre = document.createElement('td');
                var td_email = document.createElement('td');
                var td_update_cliente = document.createElement('td');
                var td_delete_cliente = document.createElement('td');

                td_get_cliente.innerHTML = "<a href=\get_cliente.html?"+json[i].id_cliente+">Detalle</a>";
                td_id_cliente.innerHTML = json[i].id_cliente;
                td_nombre.innerHTML = json[i].nombre;
                td_email.innerHTML = json[i].email;
                td_update_cliente.innerHTML = "<a href=update_cliente.html?"+json[i].id_cliente+">Update</a>";
                td_delete_cliente.innerHTML = '<input type="button" value="Borrar" onclick="deleteCliente('+json[i].id_cliente+')"/>';


                tr.appendChild(td_get_cliente);
                tr.appendChild(td_id_cliente);
                tr.appendChild(td_nombre);
                tr.appendChild(td_email);
                tr.appendChild(td_update_cliente);
                tr.appendChild(td_delete_cliente);
                
                tblBody.appendChild(tr);
            }
            tabla.appendChild(tblHead);
            tabla.appendChild(tblBody);
        }
    };
    request.send();
};