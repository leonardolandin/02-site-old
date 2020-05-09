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