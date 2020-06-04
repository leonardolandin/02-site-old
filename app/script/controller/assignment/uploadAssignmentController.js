(function() {

    let assignmentUpload = {};

    this.changeImageUpload = function(event) {
        let file = event.target.files.item(0);
        let preview = document.getElementById('previewImage');

        const reader = new FileReader();

        reader.onload = e => preview.src = e.target.result;
        reader.readAsDataURL(file);
        document.getElementById('containerUpload').style.borderColor = 'black';
    }

    this.controlModal = function(param) {
        if(param) {
            document.getElementById('modalUploadContainer').style.display = 'flex';
        } else {
            document.getElementById('modalUploadContainer').style.display = 'none';
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

        validateAssignment(nameAssignment, descriptionAssignment, typeAssignment, imageUpload)

        assignmentUpload = {
            nameAssignment: nameAssignment,
            descriptionAssignment: descriptionAssignment,
            typeAssignment: typeAssignment,
            isAutor: isAutor,
            imageUpload: imageUpload
        }



    }

    this.validateAssignment = function(nameAssignment, descriptionAssignment, typeAssignment, imageUpload) {
        let nameAssignmentElement = document.getElementById('nameAssignment');
        let descriptionAssignmentElement = document.getElementById('descriptionAssignment');
        let typeAssignmentElement = document.getElementById('typeAssignment');
        let imageUploadElement = document.getElementById('selectImage').files.item(0);
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