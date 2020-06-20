(function() {
    AssignmentAPI.getAssignments({}, function(data) {
        if(data) {
            data.filter(function(assignment) {
                if(assignment._id && assignment.imageUpload) {
                    createAssignment(assignment._id, assignment.imageUpload);
                }
            })
        }
    }, function(error) {
        console.log(error)
    })

    this.createAssignment = function(id, image) {
        let elementContainer = document.getElementById('assignments');
        let divCreated = document.createElement("div");
        let imageCreated = document.createElement("img");
        imageCreated.src = image.stringBase64;
        imageCreated.id = id;
        imageCreated.setAttribute("onclick",`openImage('${id}')`);

        elementContainer.appendChild(divCreated);
        divCreated.appendChild(imageCreated);
    }

    this.openImage = function(idAssignment) {
        let containerAssignment = document.getElementById('modalViewContainer');

        containerAssignment.style.display = 'flex';

        if(idAssignment) {
            AssignmentAPI.getAssignmentsById(idAssignment, function(data) {
                if(data) {
                    insertInfosAssignment(data)
                }
            }, function(pinto) {

            })
        }
    }

    this.insertInfosAssignment = function(infos) {
        console.log(infos)

        let nameAssignment = document.getElementById('nameAssignmentView');
        let descriptionAssignment = document.getElementById('descriptionAssignmentView');
        let typeAssignment = document.getElementById('typeAssignmentView');
        let imageAssignment = document.getElementById('imageAssignmentView'); 

        nameAssignment.innerText = infos.nameAssignment;
        descriptionAssignment.innerText = infos.descriptionAssignment;
        imageAssignment.src = infos.imageUpload.stringBase64;
    }

    this.controlModalAssignment = function() {
        let containerAssignment = document.getElementById('modalViewContainer');

        containerAssignment.style.display = 'none';
    }
})()