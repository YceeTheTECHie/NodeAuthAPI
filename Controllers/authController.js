const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Schema/user")

//salting function

const saltpw = async (password) => {
    return await bcrypt.hash(password,12)
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