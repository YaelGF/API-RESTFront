getInformation(sessionStorage.getItem("token"));

function getInformation(token){

    var request = new XMLHttpRequest();
    request.open("GET","http://127.0.0.1:8000/user/",true);
    request.setRequestHeader('Authorization', 'Bearer '+token);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('accept', 'application/json');

    request.onload = function(){

        const status = request.status

        if (status == 202) {
            json = JSON.parse(request.responseText);
            username = json["user"]["nombre"];
            document.write("<h1>Bienvenido usuario "+username+"</h1>");

        }

        else{
            alert(json.detail);
        }
    }
    request.send();
}