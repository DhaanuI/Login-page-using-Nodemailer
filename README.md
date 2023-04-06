# Signup/Signin Page using Nodemailer

## Tech Stack used: HTML, CSS, JavaScript, node.js, express.js, mongoDB, nodemailer

This project is a simple login/register page using nodemailer.

![image](https://user-images.githubusercontent.com/112754832/230364305-70d0ef22-623a-40c6-b062-690185d9d1b6.png)

OTP SweetAlert
![image](https://user-images.githubusercontent.com/112754832/230364352-6953483c-13e6-4baf-ac03-1cf7817437d3.png)


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





