function login(){

    let email = document.getElementById("email");
    let password = document.getElementById("password")

    var request = new XMLHttpRequest();
    request.open("GET","http://127.0.0.1:8000/user/validate/",true);
    request.setRequestHeader("Authorization", "Basic " + btoa(email.value+":"+password.value));
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('accept', 'application/json');

    request.onload = function(){
        const status = request.status
        json = JSON.parse(request.responseText);

        if (status == 202) {
            getInformation(json.token);
        }

        else{
            alert(json.detail);
        }
    };
    request.send();
};

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
            sessionStorage.setItem("token",token);
            if(json["user"]["level"] == "Admin"){
                window.location.replace("/dashboard_Admin.html");
            }
            else{
                window.location.replace("/dashboard_User.html");
            }
        }

        else{
            alert(json.detail);
        }
    }
    request.send();
}