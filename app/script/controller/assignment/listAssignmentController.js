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
        divCreated.className = 'assignment'
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
        let nameAssignment = document.getElementById('nameAssignmentView');
        let descriptionAssignment = document.getElementById('descriptionAssignmentView');
        let typeAssignment = document.getElementById('typeAssignmentView');
        let imageAssignment = document.getElementById('imageAssignmentView');
        let isAutor = document.getElementById('isAutorView'); 
        let downloadImage = document.getElementById('downloadImage');
        let createDate = document.getElementById('dateCreate');

        nameAssignment.innerText = infos.nameAssignment;
        descriptionAssignment.innerText = infos.descriptionAssignment;
        imageAssignment.src = infos.imageUpload.stringBase64;
        downloadImage.href = infos.imageUpload.stringBase64;
        downloadImage.download = infos.imageUpload.name;
        typeAssignment.innerText = `Ensino ${getSchooling(infos.typeAssignment)}`;
        createDate.innerText = dateCreated(infos.created);
        
        if(infos.isAutor) {
            isAutor.innerText = 'Obs: O usuário que enviou a atividade possui direitos sobre a imagem'
        } else {
            isAutor.innerText = 'Obs: O usuário que enviou a atividade não possui direitos sobre a imagem'
        }
    }

    this.controlModalAssignment = function() {
        let containerAssignment = document.getElementById('modalViewContainer');

        containerAssignment.style.display = 'none';
    }

    this.getSchooling = function(type) {
        if(type === "INFANT") {
            return 'infantil'
        }
        if(type === "FUNDAMENTAL") {
            return 'fundamental'
        }
        if(type === "MEDIUM") {
            return 'médio'
        }
        if(type === "UPPER") {
            return 'superior'
        }
    }

    this.dateCreated = function(date) {
        if(date) {
            let formatDate = new Date(date);
            let minutes;

            if(formatDate.getMinutes() > 9) { 
                minutes = formatDate.getMinutes();
            } else {
                minutes = `0${formatDate.getMinutes()}`;
            }
            return `${formatDate.getDate()}/${formatDate.getMonth() + 1}/${formatDate.getFullYear()} às ${formatDate.getHours()}:${minutes}`
        }
    }

    this.reloadImages = function() {
        let parentAssignment = document.getElementById('assignments');

        while(parentAssignment.firstChild) {
            parentAssignment.removeChild(parentAssignment.firstChild);
        }

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
    }

})()