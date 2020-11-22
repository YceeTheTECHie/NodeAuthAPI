const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Schema/user")
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
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await User.create({
            email,
            password:saltpw,
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
}