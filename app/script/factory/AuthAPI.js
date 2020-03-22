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


AuthAPI.registerUser = function(url, obj, callback) {
    $.ajax({
        url: AUTH_API + url + JSON.stringify(obj),
        cache: false,
        method: 'POST',
        data: JSON.stringify(obj),
        success: function(data) {
            callback(data);
        }
    });
}