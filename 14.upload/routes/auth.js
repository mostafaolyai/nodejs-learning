const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user')

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
    '/signup', 
    [
        check('email')
            .isEmail()
            .withMessage('email is not valid')
            .custom((value, { req }) => {
                // if(value === 'test@test.com') throw new Error('email  is banned')
                // return true
                return User.findOne({ email: value })
                    .then(userDoc =>{
                        if(userDoc){
                            return Promise.reject('email is exist')
                        }
                    })
            }),
            body('password','you can set default message here')//you can use body, param, query
            .isLength({ min:5 })
            // .withMessage('or set specifiec message here')
            .isAlphanumeric()
            // .withMessage('or set specifiec message here')
            ,
            body('cnfirmPassword')
            .custom((value, { req }) => {
                if(value !== req.body.password){
                    throw new Error('pass have to match')
                }
                return true
            })
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
