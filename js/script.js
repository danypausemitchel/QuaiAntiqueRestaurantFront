const tokenCookieName = "accesstoken";
const roleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");
const apiUrl = "http://127.0.0.1:8000/api/";

signoutBtn.addEventListener("click", signout);

function getRole(){
    return getCookie(roleCookieName);
}

function signout(){
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);
    window.location.reload();
}

function setToken(token){
    setCookie(tokenCookieName, token, 7);
}

function getToken(){
    return getCookie(tokenCookieName);
}


function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.startsWith(0)==' ') c = c.substring(1,c.length);
        if (c.startsWith(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected(){
    if(getToken() == null || getToken == undefined){
        return false;
    }
    else{
        return true;
    }
}

if(isConnected()){
    alert("Je suis connecté !");
} 
else {
    alert("Je ne suis pas connecté !");
}

/*
disconnected
connected (admin ou client)
 - admin
 - client
*/

function showAndHideElementsforRoles(){
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

            allElementsToEdit.forEach(element =>{
                switch(element.dataset.show){
                    case 'disconnected': 
                        if(userConnected){
                            element.classList.add("d-none");
                        }
                        break;
                    case 'connected': 
                        if(!userConnected){
                            element.classList.add("d-none");
                        }
                        break;
                    case 'admin': 
                        if(!userConnected || role != "admin"){
                            element.classList.add("d-none");
                        }
                        break;
                    case 'client': 
                        if(!userConnected || role != "client"){
                            element.classList.add("d-none");
                        }
                        break;
                }
            })
        }

        function sanitizeHtml(text){
                // Créez un élément HTML temporaire de type "div"
                const tempHtml = document.createElement('div');
                // Affectez le texte reçu en tant que contenu texte de l'élément "tempHtml"
                tempHtml.textContent = text;
                // Utilisez .innerHTML pour récupérer le contenu de "tempHtml"
                // Cela va "neutraliser" ou "échapper" tout code HTML potentiellement malveillant
                return tempHtml.innerHTML;
            }

            function getInfosUser(){
                let myHeaders = new Headers();
                myHeaders.append("X-AUTH-TOKEN", getToken());
            
                let requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
            
                fetch(apiUrl+"account/me", requestOptions)
                .then(response =>{
                    if(response.ok){
                        return response.json();
                    }
                    else{
                        console.log("Impossible de récupérer les informations utilisateur");
                    }
                })
                .then(result => {
                    return result;
                })
                .catch(error =>{
                    console.error("erreur lors de la récupération des données utilisateur", error);
                });
            }