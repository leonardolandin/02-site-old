const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const router = express.Router();

app.use(express.static(path.join(__dirname,'app')));

app.use('/', router);

app.listen(port, function() {
})