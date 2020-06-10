(function() {

    let assignmentUpload = {};

    this.changeImageUpload = function(event) {
        let file = event.target.files.item(0);
        let preview = document.getElementById('previewImage');

        const reader = new FileReader();

        if(file) {
            reader.onload = e => preview.src = e.target.result;
            reader.readAsDataURL(file);
            document.getElementById('containerUpload').style.borderColor = 'black';
        }
    }

    this.controlModal = function(param) {
        if(param) {
            document.getElementById('modalUploadContainer').style.display = 'flex';
        } else {
            document.getElementById('modalUploadContainer').style.display = 'none';
            document.getElementById('nameAssignment').value = '';
            document.getElementById('descriptionAssignment').value = '';
            document.getElementById('typeAssignment').value = '0';
            document.getElementById('isAutor').checked = false;
        }
    }

    this.insideModal = function(event) {
        event.stopPropagation();
    }

    this.submitUpload = function() {
        let nameAssignment = document.getElementById('nameAssignment').value;
        let descriptionAssignment = document.getElementById('descriptionAssignment').value;
        let typeAssignment = document.getElementById('typeAssignment').value;
        let isAutor = document.getElementById('isAutor').checked;
        let imageUpload = document.getElementById('selectImage').files.item(0);
        let previewImage = document.getElementById('previewImage');

        if(validateAssignment(nameAssignment, descriptionAssignment, typeAssignment, imageUpload)) {
            let Objuser = {};

            let objImage = {
                name: imageUpload.name,
                stringBase64: previewImage.src
            };

            let userStorage = JSON.parse(localStorage.getItem('user'));

            if(userStorage !== undefined) {
                Objuser = {
                    id: userStorage._id,
                    name: userStorage.name,
                    email: userStorage.email
                }
            } else {
                Objuser = null;
            }

            assignmentUpload = {
                nameAssignment: nameAssignment,
                descriptionAssignment: descriptionAssignment,
                typeAssignment: typeAssignment,
                isAutor: isAutor,
                imageUpload: objImage,
                user: Objuser
            }

            AssignmentAPI.uploadAssignments('/uploadAssignments' , assignmentUpload, function(data) {
                console.log(data)
            }, function(error) {
                console.log(error)
            })

        }

    }

    this.validateAssignment = function(nameAssignment, descriptionAssignment, typeAssignment, imageUpload) {
        let nameAssignmentElement = document.getElementById('nameAssignment');
        let descriptionAssignmentElement = document.getElementById('descriptionAssignment');
        let typeAssignmentElement = document.getElementById('typeAssignment');
        let containerImage = document.getElementById('containerUpload');
        let getError = false;

        if(!nameAssignment || !nameAssignment.length) {
            invalidInput(nameAssignmentElement)
            getError = true;
        }

        if(!descriptionAssignment || !descriptionAssignment.length) {
            invalidInput(descriptionAssignmentElement)
            getError = true;
        }

        if(!typeAssignment || parseInt(typeAssignment) == 0) {
            invalidInput(typeAssignmentElement)
            getError = true;
        }

        if(imageUpload === undefined || !imageUpload) {
            invalidInput(containerImage)
            document.getElementById('colorInsideContainer').style.color = 'red';
            getError = true;
        }

        if(!getError) {
            return true
        }
    }
})()