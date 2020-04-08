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

    let rememberMe = document.getElementById('rememberMe');
    let rememberMeLocal = localStorage.getItem('rememberMe');

    if(rememberMeLocal == "true") {
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        rememberMe.checked = true;
        
        if(localStorage.getItem('user')) {
            let userObj =  JSON.parse(localStorage.getItem('user'));

            email.value = userObj.email;
            password.value = userObj.password;
        }
    } else {
        rememberMe.checked = false;
        email.value = '';
        password.value = '';
    }

    this.throwErrorValidation = function(message) {
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

        setTimeout(function() {
            containerError.style.opacity = '0';
        }, 3000)
    }

    this.submitLogin = function() {
        let email = document.getElementById('email');
        let password = document.getElementById('password');

        if(email.value && password.value) {

            grecaptcha.ready(function() {
                grecaptcha.execute(GOOGLE_RECAPTCHA_KEY, {action: 'login'}).then(function(token) {        
                    let credentialsUser = {
                        user: email.value,
                        pass: password.value,
                        recaptcha: token
                    }
                    
                    AuthAPI.getUserByEmail('/login/', credentialsUser, function(data) {
                        let dataUser = JSON.parse(data);
                        
                        if(dataUser && dataUser.statusCode && dataUser.statusCode === 401) {
                            return throwErrorValidation(dataUser.message);
                        }

                        if(dataUser && dataUser.statusCode && dataUser.statusCode === 200) {
                            if(dataUser.recaptcha.success) {
                                localStorage.setItem('user', JSON.stringify(dataUser.user))
                                if(rememberMe.checked) {
                                    localStorage.setItem('rememberMe', rememberMe.checked);
                                } else {
                                    localStorage.setItem('rememberMe', rememberMe.checked);
                                }

                                location.href = location.origin
                            } else {
                                return throwErrorValidation("Um erro inesperado ocorreu");
                            }
                        }
                    })
                });
            })
    
        } else if(!email.value) {
            invalidInput(email)
            if(!password.value) {
                invalidInput(password)
            }
        } else if(!password.value) {
            invalidInput(password)
            if(!email.value) {
                invalidInput(email)
            }
        }
    }
})()