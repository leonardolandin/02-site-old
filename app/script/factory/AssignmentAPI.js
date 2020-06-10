const AssignmentAPI = {}

AssignmentAPI.getAssignments = function(obj, callback) {
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function() { 
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText);
        }
    }

    request.open("GET",  BACK_API , true)
    request.send();

    return request
}

AssignmentAPI.uploadAssignments = function(url, obj, callback, error) {
    $.ajax({
        url: BACK_API + url,
        cache: false,
        method: 'POST',
        data: obj,
        success: function(data) {
            callback(data);
        },
        error: function(data) {
            error(data)
        }
    });
}
