const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Schema/user");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

//salting function

const saltpw = async (password) => {
    return await bcrypt.hash(password,12)
}

const Jwt = async (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES 
})
}

const sendToken = (user, statusCode, req, res) => {
    const token = signJwt(user._id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + JWT_EXPIRES),
        secure: true,
        httpOnly: true,
    });
    user.password = undefined;
    res.status(status).json({
        status: 'success',
        token,
        user,
    });
}
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await User.create({
            email,
            password:saltpw,
        });
        sendToken(newUser, 201, req, res);
    }
    catch (err) {
        res.status(401).json(err.message);
    }
}