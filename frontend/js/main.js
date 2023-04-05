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
    document.getElementById("otp-input").style.display = "block"
    document.getElementById("otp-form").style.display = "block"
  } else {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = 'Invalid email or password';
    errorMessage.style.display = 'block';
  }
});


const verifyBtn = document.getElementById('verify-btn');
verifyBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const otp = document.getElementById('otp').value;
  console.log(otp)

  const res = await fetch('http://localhost:3000/verifyOTP', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ otp: Number(otp) })
  });

  if (res.ok) {
    alert("Authentication is done")
  } else {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = 'Invalid OTP';
    errorMessage.style.display = 'block';
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
