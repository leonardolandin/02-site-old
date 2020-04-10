(function() {
    this.showModalUser = function() {
        let element = document.getElementById('modalUser');
        if(element.style.top == "-22px" || element.style.top == "") {
            element.style.setProperty('top', '80px', 'important');
            element.style.setProperty('z-index', '1')
        } else {
            element.style.setProperty('top', '-22px', 'important');
            element.style.setProperty('z-index', '-1')
        }
        
    }

    this.loadingMenu = function() {
        let user = JSON.parse(localStorage.getItem('user'))
        let userLogged = document.getElementById('userLogged');
        let userNotLogged = document.getElementById('userNotLogged');
        let username = document.getElementById('username');
    
        if(user && user._id && user.email && user.name) {
            username.innerHTML = user.name;
            userLogged.style.display = 'flex';
            userNotLogged.style.display = 'none';
        } else {
            userLogged.style.display = 'none';
            userNotLogged.style.display = 'flex'; 
        }   
    }

    loadingMenu();

    this.loggout = function() {
        localStorage.removeItem('user');

        loadingMenu();

        let element = document.getElementById('modalUser');
        element.style.setProperty('top', '-22px', 'important');
        element.style.setProperty('z-index', '-1')
    }
})()