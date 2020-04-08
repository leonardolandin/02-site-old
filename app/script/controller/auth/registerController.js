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

    this.validateFields = function(email, name, password, passwordConfirmed) {
        let validateConfirm = true;

        if(!email.value) {
            invalidInput(email);
            validateConfirm = false;
        }

        if(!name.value) {
            invalidInput(name);
            validateConfirm = false;
        }

        if(!password.value) {
            invalidInput(password);
            validateConfirm = false;
        }

        if(!passwordConfirmed.value) {
            invalidInput(passwordConfirmed);
            validateConfirm = false;
        }

        if(validateConfirm === true) {
            return true
        } else {
            return false
        }
    }

    this.registerUser = function() {
        let email = document.getElementById('email');
        let name = document.getElementById('name');
        let password = document.getElementById('password');
        let passwordConfirmed = document.getElementById('passwordConf');

        if(validateFields(email, name, password, passwordConfirmed)) {
            grecaptcha.ready(function() {
                grecaptcha.execute(GOOGLE_RECAPTCHA_KEY, {action: 'login'}).then(function(token) {
                    let newUserCredentials = {
                        email: email.value,
                        name: name.value,
                        password: password.value,
                        passwordConfirmed: passwordConfirmed.value,
                        recaptcha: token
                    }

                    AuthAPI.registerUser('/register/', newUserCredentials, function(data) {
                        console.log(data)
                    })
                });
            });
        }
    }
})()