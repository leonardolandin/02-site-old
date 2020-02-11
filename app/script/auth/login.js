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
})()