# Signup/Signin Page using Nodemailer

## Tech Stack used: HTML, CSS, JavaScript, node.js, express.js, mongoDB, nodemailer

This project is a simple login/register page using nodemailer.

Features:
* User can signup
* User can signin by OTP
* User can update Password


http://localhost:3000

API endpoints:
* signup           - /signup
* login            - /login             - Once email password is verified, OTP is triggered, user is asked to enter OTP , if correct OTP, authentication is done
* forgotpassword   - /forgotpassword    - To send an otp to the user email, if it is correct OTP, then update password
* update password  - /updatepassword    - Once otp is verified, user can enter the new password and password gets updated
* OTP verification - /verifyOTP         - to verify the OTP





