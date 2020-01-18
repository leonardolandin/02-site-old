crossroads.addRoute('/', function() {
    alert("enganld")
});
 
function parseHash(newHash, oldHash){
  crossroads.parse(newHash);
}

hasher.initialized.add(parseHash);
hasher.changed.add(parseHash);
hasher.init();