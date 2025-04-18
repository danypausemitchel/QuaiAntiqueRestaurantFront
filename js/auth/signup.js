// Implémenter le JS de ma page
const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const formInscription =document.getElementById("formulaireInscription");

inputNom.addEventListener("keyup", validateForm);
inputPreNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword .addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);

btnValidation.addEventListener("click", InscrireUtilisateur);

function validateForm(){
      const nomOk = validateRequired(inputNom);
      const prenomOk = validateRequired(inputPreNom);
      const mailOk = validateMail(inputMail);
      const passwordOk = validatePassword(inputPassword);
      const passwordConfirmOk = validateConfirmationPassword(inputPassword, inputValidationPassword);

        if(nomOk && prenomOk && mailOk && passwordOk && passwordConfirmOk){
            btnValidation.disabled =false;
        } 
        else {
            btnValidation.disabled =true;
        }
    }

    function validateConfirmationPassword(inputPwd, inputConfirmPwd){
        if(inputPwd.value == inputConfirmPwd.value){
            inputConfirmPwd.classList.add("is-valid");
            inputConfirmPwd.classList.remove("is-invalid");
            return true;
        }
        else{
            inputConfirmPwd.classList.add("is-invalid");
            inputConfirmPwd.classList.remove("is-valid");
            return false;
        }
    }

    function validatePassword(input){
        //Définir mon regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        const passwordUser = input.value;
        if(passwordUser.match(passwordRegex)){
            input.classList.add("is-valid");
            input.classList.remove("is-invalid"); 
            return true;
        }
        else{
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
        }
    }

function validateMail(input){
        //Définir mon regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mailUser = input.value;
        if(mailUser.match(emailRegex)){
            input.classList.add("is-valid");
            input.classList.remove("is-invalid"); 
            return true;
        }
        else{
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
        }
    }   

function validateRequired(input){
        if(input.value != ''){
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            return true;
        }
        else{
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
        }
    }

function InscrireUtilisateur(){
    // Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
        let dataForm = new FormData(formInscription);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
        let myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
        myHeaders.append("Content-Type", "application/json");



    // Convertit les données du formulaire en une chaîne JSON
        let raw = JSON.stringify({
            "firstName": dataForm.get("nom"),
            "lastName": dataForm.get("prenom"),
            "email": dataForm.get("email"),
            "password": dataForm.get("mdp")
        });

        // Configure les options de la requête HTTP
        let requestOptions = {
            // Méthode de la requête : "POST" pour envoyer des données au serveur
            method: 'POST',
            // Définit les en-têtes de la requête en utilisant l'objet Headers créé précédemment
            headers: myHeaders,
            // Corps de la requête : les données JSON converties en chaîne
            body: raw,
            // Redirection à suivre en cas de besoin ("follow" suit automatiquement les redirections)
            redirect: 'follow'
        };

        fetch(apiUrl+"registration", requestOptions)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                alert("Erreur lors de l'inscription");
                }
        })
        .then(result => {
            alert("Bravo "+dataForm.get("prenom")+", vous êtes maintenant inscrit, vous pouvez vous connecter.");
            document.location.href="/signin";
         })
        .catch((error) => console.log('error', error));
    }
