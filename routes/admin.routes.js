const {
    loginAdmin,
    findOneUserAdmin,
    Logout
} = require('../controllers/admin.controllers')
const {
    apiGetAllUsers,
    middlwareCkeckLoginAdmin 
} = require('../controllers/users.controllers');
const {
    apiGetAllFilms
} = require('../controllers/film.controllers');
const express = require('express');

let router = express.Router();

const initWebRouteAdmin = (app) => {
    // directly page
    router.get('/login-admin', loginAdmin);
    router.get('/logout-admin',Logout);
    // Call API
    router.post('/api/v1/login-admin',findOneUserAdmin)
    // Admin //
    router.get('/admin-user',middlwareCkeckLoginAdmin,apiGetAllUsers);
    router.get('/admin-films',middlwareCkeckLoginAdmin,apiGetAllFilms);
    return app.use('/', router);
}

module.exports = { initWebRouteAdmin };