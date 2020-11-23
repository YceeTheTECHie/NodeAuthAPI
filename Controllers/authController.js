const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Schema/user");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;


//salting function

const saltpw = async (password) => {
    return await bcrypt.hash(password,12)
}

const signJwt = async (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
})
}

const sendToken = (user, statusCode, req, res) => {
    const token = signJwt(user._id);
    console.log(token);

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + JWT_EXPIRES),
        secure: true,
        httpOnly: true,
    });
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        user
    });
}
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const newPass = await saltpw(password);
    try {
        const newUser = await User.create({
            email,
            password: newPass,
            
        });
        sendToken(newUser, 201, req, res);
    }
    catch (err) {
        res.status(401).json(err.message);
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        const comparedPass = await bcrypt.compare(password, user.password);
        comparedPass ? sendToken(user, 200, req, res) : res.status(400).json({message:"login failed"});
    }   
    catch (err) {
        console.log(err);
        res.status(400).json(err.message)
    }
}