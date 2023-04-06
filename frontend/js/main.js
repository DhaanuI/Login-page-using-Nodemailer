const form = document.getElementById('login-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.elements.email.value;
  const password = form.elements.password.value;

  console.log(email, password)
  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (res.ok) {
    const ipAPI = '//api.ipify.org?format=json'

    const inputValue = fetch(ipAPI)
      .then(response => response.json())
      .then(data => data.ip)

    const { value: ipAddress } = await Swal.fire({
      title: 'Enter the OTP',
      input: 'text',
      inputLabel: 'OTP',
      inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter OTP!'
        }
        else {
          fun()
          async function fun() {
            const res = await fetch('http://localhost:3000/verifyOTP', {
              method: 'POST',

              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ otp: Number(value) })
            });

            if (res.ok) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Authentication is done',
                showConfirmButton: false,
                timer: 1500
              })
              form.elements.email.value = "";
              form.elements.password.value = "";
            } else {
              return 'Incorrect OTP!'
            }
          }
        }
      }
    })
  }
});


const signupform = document.getElementById('register-form');
signupform.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = signupform.elements.email.value;
  const password = signupform.elements.password.value;

  const res = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (res.ok) {
    // redirect the user to the login page
    alert("Register done")
  } else {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = 'Error signing up, please try again';
    errorMessage.style.display = 'block';
  }
});


const forgotPassword = document.getElementById('forgot');
forgotPassword.addEventListener('click', async () => {

  const email = document.getElementById('email').value;

  console.log(email)
  const res = await fetch('http://localhost:3000/forgotpassword', {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (res.ok) {
    const ipAPI = '//api.ipify.org?format=json'

    const inputValue = fetch(ipAPI)
      .then(response => response.json())
      .then(data => data.ip)

    const { value: ipAddress } = await Swal.fire({
      title: 'Enter the OTP for Password Change',
      input: 'text',
      inputLabel: 'Your OTP',
      inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter OTP!'
        }
        else {
          fun()
          async function fun() {
            const res = await fetch('http://localhost:3000/verifyOTP', {
              method: 'POST',

              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ otp: Number(value) })
            });

            if (res.ok) {
              const { value: ipAddress } = await Swal.fire({
                title: 'Enter the New Password ',
                input: 'password',
                inputLabel: 'New Password',
                inputValue: inputValue,
                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return 'You need to enter the New Password!'
                  }
                  else {
                    fun()
                    async function fun() {
                      const res = await fetch('http://localhost:3000/updatepassword', {
                        method: 'POST',

                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password: value })
                      });

                      if (res.ok) {
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Password changed',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }
                      else {
                        return 'Incorrect OTP!'
                      }
                    }
                  }
                }
              })
            }
            else {
              return 'Incorrect OTP!'
            }
          }
        }
      }
    })
  }
});