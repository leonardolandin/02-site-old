this.validateInput = function(key) {
    let keyElement = document.getElementById(key);

    if(keyElement.value && keyElement.style.borderColor === 'red') {
        keyElement.style.borderColor = 'black';
        keyElement.classList.add('validInput');
    } 
}

this.invalidInput = function(type) {
    type.style.borderColor = 'red';
    type.classList.remove('validInput');
    type.classList.add('invalidInput');
}