const express = require ('express');
const route = express.Router();

//import controller for connection
const controller = require ('../controller/userController')
const controllerOne = require ('../controller/userAuthController');
const { UserAuthChek } = require('../middleware/auth');


//method to show Index
route.get('/',UserAuthChek,controllerOne.UserChek,controller.showIndex);
//method to show Contact
route.get('/contact',UserAuthChek,controllerOne.UserChek,controller.showContact);
// //method to show About
route.get('/about',UserAuthChek,controllerOne.UserChek,controller.showAbout);
// //method to show Courses
route.get('/Courses',UserAuthChek,controllerOne.UserChek,controller.showCourses);
// //method to show Courses
route.get('/course-details',UserAuthChek,controllerOne.UserChek,controller.showcourseDetails);
// //method to show Trainers
route.get('/Trainers',UserAuthChek,controllerOne.UserChek,controller.showTrainers);
// //method to show Events
route.get('/Events',UserAuthChek,controllerOne.UserChek,controller.showEvents);

//method to show Register
route.get('/Register',controllerOne.reg);
route.post('/user/creat',controllerOne.USerCreatRegister);

//method to show Login & Logout
route.get('/Login',controllerOne.log);
route.post('/user/login/creat',controllerOne.USerCreatLogin);
route.get('/Logout', controllerOne.logout);

module.exports = route;