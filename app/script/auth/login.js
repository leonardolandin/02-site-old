window.onload = function() {
    this.loadScriptAsync("https://www.google.com/recaptcha/api.js?render=6LcXn9cUAAAAAAt20FK3qLQ0tmqZnQ2yLeUhxRkQ");
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

setTimeout(function() {
    grecaptcha.ready(function() {
        grecaptcha.execute("6LcXn9cUAAAAAAt20FK3qLQ0tmqZnQ2yLeUhxRkQ", {action: 'login'}).then(function(token) {
            
        });
    });
}, 5000)
