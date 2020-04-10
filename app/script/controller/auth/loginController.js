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
    let rememberMeLocal = JSON.parse(localStorage.getItem('rememberMe'));

    if(rememberMeLocal && rememberMeLocal.remember) {
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        rememberMe.checked = true;
        
        if(rememberMeLocal.email && rememberMeLocal.password) {
            email.value = rememberMeLocal.email;
            password.value = rememberMeLocal.password;
        }
    } else {
        rememberMe.checked = false;
        email.value = '';
        password.value = '';
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
                                let rememberObj = {
                                    remember: rememberMe.checked,
                                    email: dataUser.user.email,
                                    password: dataUser.user.password
                                }
                                
                                localStorage.setItem('rememberMe', JSON.stringify(rememberObj));

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