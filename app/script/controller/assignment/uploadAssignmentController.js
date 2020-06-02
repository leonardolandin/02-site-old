(function() {
    this.changeImageUpload = function(event) {
        let file = event.target.files.item(0);
        let preview = document.getElementById('previewImage');
        let imageButton = document.getElementById('selectImageButton');

        const reader = new FileReader();

        reader.onload = e => preview.src = e.target.result;
        reader.readAsDataURL(file);

        imageButton.style.display = 'block';
    }
})()