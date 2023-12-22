const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
    registerAccount: async (req, res) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashed = bcrypt.hashSync(req.body.pass, salt);

            const newAccount = new Account({
                _id: req.body._id,
                pass: hashed,
                role: req.body.role
            });

            const account = await newAccount.save();

            console.log("Account saved to the database:", account);

            res.status(200).json(account);
        } catch (err) {
            console.error("Error during account registration:", err);
            res.status(500).json(err);
        }
    },

    // GENERATE ACCESS TOKEN
    generateAccessToken: (account) => {
        return jwt.sign(
            {
                id: account.id,
                role: account.role
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "3600s" }
        );
    },

    // LOGIN ACCOUNT
    loginAccount: async (req, res) => {
        try {
            const account = await Account.findOne({ _id: req.body._id });

            if (!account) {
                return res.status(404).json("Wrong username");
            }

            const validPassword = await bcrypt.compare(req.body.pass, account.pass);

            if (!validPassword) {
                return res.status(404).json("Wrong password");
            }

            if (account && validPassword) {
                const accessToken = authController.generateAccessToken(account);

                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                    maxAge: 30 * 60 * 1000 
                });

                const { pass, ...others } = account._doc;
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    accountLogout: async (req, res) => {
        res.clearCookie("accessToken");
        res.status(200).json("Logged out!");
    }
};

module.exports = authController;
