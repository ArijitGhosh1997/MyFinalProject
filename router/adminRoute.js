const express = require('express');
const { AdminRegisterPage, AdminLoginPage, Testimonals,Admindashboard, AdminCreatRegister, AdminCreatLogin, AdminChek, AdminLogout } = require('../controller/adminController');
const { AdminAuthChek } = require('../middleware/auth');
const route = express.Router();

// ***admindahbord*****//
route.get('/admin/dashbord',AdminAuthChek,AdminChek,Admindashboard)
route.get('/admin/testimonals',AdminAuthChek,AdminChek,Testimonals)

//import controller for connection
route.get('/admin/register',AdminRegisterPage)
route.post('/admin/register/creat',AdminCreatRegister)

// *login
route.get('/admin',AdminLoginPage)
route.post('/admin/login/creat',AdminCreatLogin)
// ******logout*********//
route.get('/admin/logout',AdminLogout)

module.exports = route;