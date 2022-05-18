const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Sarthakisgood';

//ROUTE 1: Create  a user using: POST "/api/auth/createuser". No login required

router.post('/createuser', [   //rpouter changed to post
    body('email', 'enter a valid email').isEmail(),
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('password', 'password must  be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    let success=false;

    //If there are errors, return bad requests and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        //check whether the user email exists already or not
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry this user already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        //create a new user
        user = await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(authtoken);

        success = true;
        res.json({ success, authtoken })
        // res.json(user)

    } catch (error) {    //try and catching errors
        console.error(error.messsage);
        res.status(500).send("Some error occurred");
    }
})

//ROUTE 2: Authenticate  a user using: POST "/api/auth/login". No login required

router.post('/login', [   //router changed to post
    body('email', 'enter a valid email').isEmail(),
    // body('name', 'enter a valid name').isLength({ min: 3 }),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {

    //If there are errors, return bad requests and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let success=false;

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try and login with correct details" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) ({
            return: res.status(400).json({success, error: "Please try and login with correct details" })
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });



    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("Some Server error occurred");
    }
})

//RPOUTE 3: Get details of logged in user: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) => {  //router changed to post

    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("Some Server error occurred");
    }
})

module.exports = router;