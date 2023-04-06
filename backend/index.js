const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { UserModel } = require("./model/usermodel");
const { connection } = require("./config/db");
require('dotenv').config();

const cors = require("cors")

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.send("Home page")
})

let storedOTP;

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, encrypted_password) => {
            if (err) {
                console.log(err)
                res.send("error")
            }
            else {
                const data = new UserModel({ email, password: encrypted_password })

                await data.save();
                res.send({ "message": "User registered successfully" })
            }
        });
    }
    catch (err) {
        console.log(err)
        res.send({ "message": "something went wrong" });
    }
})


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, 'key');
                    fun()
                    async function fun() {
                        const otp = Math.floor(1000 + Math.random() * 9000);
                        storedOTP = otp;
                        const transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            auth: {
                                user: "snipsandspikeshairsalon@gmail.com",
                                pass: "ngjuyxbgcnicfjla",
                            },
                        });

                        const mailOptions = {
                            from: "snipsandspikeshairsalon@gmail.com",
                            to: email,
                            subject: "Login OTP",
                            text: `Your OTP is ${otp}`
                        };

                        await transporter.sendMail(mailOptions);
                    }
                    res.send({ "message": "Login done", "token": token })
                }
                else {
                    res.send({ "message": "wrong credentials" })
                }
            });
        }
        else {
            res.send({ "message": "wrong credentials" })
        }
    }
    catch (err) {
        console.log(err)
        res.send({ "message": "wrong credentials" });
    }
})

app.post("/forgotpassword", (req, res) => {
    const { email } = req.body;

    fun()
    async function fun() {
        const otp = Math.floor(1000 + Math.random() * 9000);
        storedOTP = otp;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: "snipsandspikeshairsalon@gmail.com",
                pass: "ngjuyxbgcnicfjla",
            },
        });

        const mailOptions = {
            from: "snipsandspikeshairsalon@gmail.com",
            to: email,
            subject: "OTP for Changing Password",
            text: `Your OTP is ${otp}`
        };

        await transporter.sendMail(mailOptions);

        res.send("OTP is sent for change password")
    }

})

app.post("/updatepassword", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        user[0].password = password
        res.send({ message: "Password updated" })

    }
    catch (err) {
        console.log(err)
        res.send({ "message": "wrong credentials" });
    }
})

app.post('/verifyOTP', (req, res) => {
    const { otp } = req.body;
    console.log(otp, storedOTP)
    try {
        if (storedOTP && otp === storedOTP) {
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to verify OTP' });
    }
});





app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to Database")
    }
    catch (err) {
        console.log(err)
    }
    console.log(`Server started on port ${port}`);
});
