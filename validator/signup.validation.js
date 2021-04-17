const{check}=require('express-validator')

module.exports=[
    check('firstName').matches(/^[a-zA-Z ,.'-]+$/),
    check('lastName').matches(/^[a-zA-Z ,.'-]+$/),
    check('username').matches( /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/    ),
    check('email').isEmail(),
    check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/),
]