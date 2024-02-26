// registration-script.js
function register() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var academicYear = document.getElementById('academicYear').value;
    var studyYear = document.getElementById('studyYear').value;
    var message = document.getElementById('registrationMessage');

    

    message.style.color = 'green';
    message.textContent = 'Inscription réussie!';
}
