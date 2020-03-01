const AuthAPI = {}

AuthAPI.getUserByEmail = function(url, obj, callback) {
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function() { 
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText);
        }
    }

    request.open("GET",  AUTH_API + url + JSON.stringify(obj) , true)
    request.send();

    return request
}