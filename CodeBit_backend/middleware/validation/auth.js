const {check, validationResult} = require('express-validator');


exports.register_validation = [
    check("username", "username should have 3 char").isLength({min: 1}),
    check("email", "Please provide valid email").isEmail(),
    check("password", "Password should have least 6 char")
        .isLength({min: 1})
        .trim(),
    check("cpassword", "Passwords must be same")
        .isLength({min: 1})
        .trim()
        .custom(async (cpassword, {req}) => {
            const password = req.body.password;
            if (password !== cpassword) {
                throw new Error("Passwords must be same");
            }
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({msg: errors.array()[0].msg});
        next();
    },
];

exports.login_validation = [

    check("username", "Username is required!").isLength({min: 1}),
    check("password", "Password should have least 6 char")
        .isLength({min: 1})
        .trim(),


    (req, res, next) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({msg: errors.array()[0].msg});
        next();
    },
];

