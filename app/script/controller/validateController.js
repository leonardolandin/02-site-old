this.validateInput = function(key, color) {
    let keyElement = document.getElementById(key);

    if(keyElement.value && keyElement.style.borderColor === 'red') {
        if(color !== undefined) {
            keyElement.style.borderColor = color;            
        } else {
            keyElement.style.borderColor = 'black';
        }
        keyElement.classList.add('validInput');
    } 
}

this.invalidInput = function(type) {

    type.style.borderColor = 'red';
    type.classList.remove('validInput');
    type.classList.add('invalidInput');
}

this.throwErrorValidation = function(message, origin) {
    let messageError = document.getElementById('messageError');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let containerError = document.getElementById('containerError');

    if(containerError.style.visibility == 'visible') {
        containerError.style.visibility = 'hidden';
        containerError.style.opacity = '1';
    }
    containerError.style.visibility = 'visible';
    messageError.innerHTML = message

    invalidInput(email);
    invalidInput(password);

    if(origin && origin == 'signup') {
        let name = document.getElementById('name');
        let passwordConf = document.getElementById('passwordConf');

        invalidInput(name);
        invalidInput(passwordConf);
    }

    setTimeout(function() {
        containerError.style.opacity = '0';
    }, 3000)
}