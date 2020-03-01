(function() {
    window.onload = function() {
        this.loadScriptAsync(RECAPTCHA_URL + GOOGLE_RECAPTCHA_KEY);
    }

    this.loadScriptAsync = function (url) {
        return new Promise(function(resolve, reject) {
            let tag = document.createElement('script');
            tag.src = url;
            tag.async = true;
            tag.onload = () => {
                resolve();
            };
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        });
    }

    this.login = function() {
        grecaptcha.ready(function() {
            grecaptcha.execute(GOOGLE_RECAPTCHA_KEY, {action: 'login'}).then(function(token) {        
            });
        });
    }

    this.validateInput = function(key) {
        let keyElement = document.getElementById(key);

        if(keyElement.value && keyElement.style.borderColor === 'red') {
            keyElement.style.borderColor = 'black';
            keyElement.classList.add('validInput');
        } 
    }

    this.submitLogin = function() {
        let email = document.getElementById('email');
        let password = document.getElementById('password');

        if(email.value && password.value) {
            let credentialsUser = {
                user: email.value,
                pass: password.value
            }
            
            AuthAPI.getUserByEmail('/login/', credentialsUser, function(data) {
                console.log(data)
            })
    
        } else if(!email.value) {
            email.style.borderColor = 'red';
            email.classList.remove('validInput');
            email.classList.add('invalidInput');
            if(!password.value) {
                password.style.borderColor = 'red';
                password.classList.remove('validInput');
                password.classList.add('invalidInput');
            }
        } else if(!password.value) {
            password.style.borderColor = 'red';
            password.classList.remove('validInput');
            password.classList.add('invalidInput');
            if(!email.value) {
                email.style.borderColor = 'red';
                email.classList.remove('validInput');
                email.classList.add('invalidInput');
            }
        }
    }
})()