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
            <th>Id</th>
            <th>Nombre</th>
            <th>Email</th>
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
                //var tr_get_cliente = document.createElement('td');
                var tr_id_cliente = document.createElement('td');
                var tr_nombre = document.createElement('td');
                var tr_email = document.createElement('td');

                //tr_get_cliente.innerHTML = "<a href='\\cliente\\get\\"+json[i].id_cliente+"'>Ver</a>";;
                tr_id_cliente.innerHTML = json[i].id_cliente;
                tr_nombre.innerHTML = json[i].nombre;
                tr_email.innerHTML = json[i].email;

                //tr.appendChild(tr_get_cliente);
                tr.appendChild(tr_id_cliente);
                tr.appendChild(tr_nombre);
                tr.appendChild(tr_email);
                
                tblBody.appendChild(tr);
            }
            tabla.appendChild(tblHead);
            tabla.appendChild(tblBody);
        }
    };
    request.send();
};