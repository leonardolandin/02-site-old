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

    this.disableButton = function(button) {
        button.disabled = true;
        button.style.backgroundColor = '#949eb1';
        button.style.borderColor = '#949eb1';
        button.style.color = '#d4d6dc';
    }

    this.enableButton = function(button) {
        button.disabled = false;
        button.style.backgroundColor = '#4371c5';
        button.style.borderColor = '#646494';
        button.style.color = 'white';
    }

    this.submitUpload = function() {
        let loading = document.getElementById('loading');
        let submit = document.getElementById('submit');
        let nameAssignment = document.getElementById('nameAssignment').value;
        let descriptionAssignment = document.getElementById('descriptionAssignment').value;
        let typeAssignment = document.getElementById('typeAssignment').value;
        let isAutor = document.getElementById('isAutor').checked;
        let imageUpload = document.getElementById('selectImage').files.item(0);
        let previewImage = document.getElementById('previewImage');
        let buttonUpload = document.getElementById('buttonUpload');

        submit.style.display = 'none';
        loading.style.display = 'block';

        if(validateAssignment(nameAssignment, descriptionAssignment, typeAssignment, imageUpload)) {
            disableButton(buttonUpload)
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
                if(data && data.msg) {
                    throwErrorValidationSuccess(data.msg);
                    setTimeout(function() {
                        controlModal(0)
                    }, 3000)
                }
            }, function(error) {
                submit.style.display = 'flex';
                loading.style.display = 'none';
                enableButton(buttonUpload);
                return throwErrorValidationUpload(error.responseJSON.messageError || 'Um erro inesperado aconteceu');
            })

        }

    }

    this.throwErrorValidationUpload = function(message) {
        let messageError = document.getElementById('messageError');
        let containerError = document.getElementById('containerError');

        containerError.style.backgroundColor = '#fd4545';
        containerError.style.borderColor = '#fd4545';
    
        if(containerError.style.visibility == 'visible') {
            containerError.style.visibility = 'hidden';
            containerError.style.opacity = '1';
        }
        containerError.style.visibility = 'visible';
        messageError.innerHTML = message
    
        setTimeout(function() {
            containerError.style.opacity = '0';
        }, 3000)
    }

    this.throwErrorValidationSuccess = function(message) {
        let messageError = document.getElementById('messageError');
        let containerError = document.getElementById('containerError');

        containerError.style.backgroundColor = '#3ec148';
        containerError.style.borderColor = '#3ec148';
    
        if(containerError.style.visibility == 'visible') {
            containerError.style.visibility = 'hidden';
            containerError.style.opacity = '1';
        }
        containerError.style.visibility = 'visible';
        messageError.innerHTML = message
    
        setTimeout(function() {
            containerError.style.opacity = '0';
        }, 3000)
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
        } else {
            submit.style.display = 'block';
            loading.style.display = 'none';
        }
    }
})()