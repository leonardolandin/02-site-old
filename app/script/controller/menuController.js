(function() {
    let vm = this;

    vm.showModalUser = function() {
        let element = document.getElementById('modalUser');
        if(element.style.top == "-22px" || element.style.top == "") {
            element.style.setProperty('top', '80px', 'important');
            element.style.setProperty('z-index', '1')
        } else {
            element.style.setProperty('top', '-22px', 'important');
            element.style.setProperty('z-index', '-1')
        }
        
    }
})()