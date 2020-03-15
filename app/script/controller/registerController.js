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

    this.registerUser = function() {
        let email = document.getElementById('email');
        let name = document.getElementById('name');
        let password = document.getElementById('password');
        let passwordConfirmed = document.getElementById('passwordConf');
        let validationFields = true;

        if(!email.value) {
            invalidInput(email);
            validationFields = false;
        }

        if(!name.value) {
            invalidInput(name);
            validationFields = false;
        }

        if(!password.value) {
            invalidInput(password);
            validationFields = false;
        }

        if(!passwordConfirmed.value) {
            invalidInput(passwordConfirmed);
            validationFields = false;
        }

        if(validationFields) {
            
        }
    }
})()