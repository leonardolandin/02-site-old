const AssignmentAPI = {}

AssignmentAPI.getAssignments = function(obj, callback, erro) {
    $.ajax({
        url: BACK_API,
        cache: false,
        method: 'GET',
        data: obj,
        success: function(data) {
            callback(data);
        },
        error: function(data) {
            erro(data)
        }
    });
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

AssignmentAPI.getAssignmentsById = function(obj, callback, erro) {
    $.ajax({
        url: BACK_API + '/getAssignment/' + obj,
        cache: false,
        method: 'GET',
        data: obj,
        success: function(data) {
            callback(data);
        },
        error: function(data) {
            erro(data)
        }
    });
}
