(function() {
    let vm = this;

    vm.showModalUser = function() {
        let element = document.getElementById('modalUser');
        if(element.style.display == "" || element.style.display == "none") {
            element.style.setProperty('display', 'flex', 'important');
        } else {
            element.style.setProperty('display', 'none', 'important');
        }
        
    }
})()