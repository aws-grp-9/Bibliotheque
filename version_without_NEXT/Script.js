function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var message = document.getElementById('loginMessage');

    

    // Pour cet exemple, nous affichons simplement un message.
    if (username === 'utilisateur' && password === 'motdepasse') {
        message.style.color = 'green';
        message.textContent = 'Connexion réussie!';
    } else {
        message.style.color = 'red';
        message.textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
    }

    function redirectToInscription() {
        window.location.href = "Inscription.html";
    }

}
