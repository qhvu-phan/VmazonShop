var loginApi = "http://localhost:5000/users";
var sentMailApi = "http://localhost:5000/sendMail";
const login_user_username = document.querySelector("#login_user-username");
const login_user_password = document.querySelector("#login_user-password");
const login_user_name = document.querySelector("#login_user-name");
const login_user_passwords = document.querySelector("#login_user-passwords");
const login_user_phone = document.querySelector("#login_user-phone");
const login_user_email = document.querySelector("#login_user-email");
const enter_otp_code = document.querySelector(".enter_otp_code");
const login_user_register_action = document.querySelector(
  ".login_user-register_btn"
);
const login_user_address = document.querySelector("#login_user-address");
const login_user_continue_btn = document.querySelector(
  ".login_user-continue_btn"
);
const login_user_register_btn = document.querySelectorAll(
  ".login_user-register"
);
const register_user_register_form = document.querySelector(
  ".register_user-register"
);
const login_user_login_btn = document.querySelectorAll(".login_user-login");
const forget_user_register_form = document.querySelector(
  ".forget_user-register"
);
const login_user_container_form = document.querySelector(
  ".login_user-container"
);
const login_user_forget_password_btn = document.querySelectorAll(
  ".login_user-forget_password"
);
const email_get_otp = document.querySelector(
  'input[name="forget-password-email"]'
);
const get_otp_continue_btn = document.querySelector("#get_otp-continue_btn");
const enter_code_continue_btn = document.querySelector(
  "#enter_code-continue_btn"
);
const enter_otp_code_value = document.querySelector(
  'input[name="enter-otp-code"]'
);
const change_password_code_form = document.querySelector(
  ".change_password_code"
);
const change_password_code_value = document.querySelector(
  'input[name="change-password-code" ]'
);
const change_password_continue_btn = document.querySelector(
  "#change_password-continue_btn"
);
const enter_otp_code_register_form = document.querySelector(
  ".enter_otp_code_register"
);
const enter_code_register_continue_btn = document.querySelector(
  "#enter_code_register-continue_btn"
);
const enter_otp_code_register_value = document.querySelector(
  'input[name="enter-otp-code-register"]'
);
let background_loading_waiting = document.querySelector(
  ".background-loading-waiting"
);
let otp_code = null;

//handle change pass with verify otp
function handleGetOtpChangePassword() {
  get_otp_continue_btn.onclick = function () {
    if (email_get_otp.value === "") {
      alert("Vui l??ng nh???p email");
    } else {
      handleGetOtp(email_get_otp.value);
    }
    function handleGetOtp(email) {
      background_loading_waiting.style.display = "block";
      let value = {
        email: email,
      };
      let option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      };
      fetch(sentMailApi + "/getOTP", option)
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "success") {
            otp_code = response.code;
            background_loading_waiting.style.display = "none";
            setCookie("user_email", email_get_otp.value, 1);
            forget_user_register_form.style.display = "none";
            enter_otp_code.style.display = "block";
          } else if (response.message === "Please check email") {
            alert("Email kh??ng h???p l???");
            background_loading_waiting.style.display = "none";
          } else if (response.message === "Email not found") {
            alert("Email n??y ch??a ???????c s??? d???ng, vui l??ng ki???m tra l???i");
            background_loading_waiting.style.display = "none";
          } else {
            alert("L???i h??? th???ng");
            background_loading_waiting.style.display = "none";
          }
        });
    }
  };
}
enter_code_continue_btn.onclick = function () {
  background_loading_waiting.style.display = "block";
  setTimeout(() => {
    if (parseInt(enter_otp_code_value.value) === otp_code) {
      background_loading_waiting.style.display = "none";
      enter_otp_code.style.display = "none";
      change_password_code_form.style.display = "block";
    } else {
      alert("OTP kh??ng ????ng");
    }
  }, 1500);
};
change_password_continue_btn.onclick = function () {
  background_loading_waiting.style.display = "block";
  let password = {
    passwords: change_password_code_value.value,
  };
  let option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(password),
  };
  fetch(loginApi + "/" + getCookie("user_email"), option)
    .then((response) => response.json())
    .then((response) => {
      if (response.message === "success") {
        background_loading_waiting.style.display = "none";
        alert("C???p nh???t m???t kh???u th??nh c??ng");
        delete_cookie("user_email");
        location.reload();
      } else {
        alert("L???i h??? th???ng");
      }
    });
};
// handle register new user
login_user_register_action.addEventListener("click", () => {
  background_loading_waiting.style.display = "block";
  if (
    login_user_name.value === "" ||
    login_user_passwords.value === "" ||
    login_user_email.value === "" ||
    login_user_phone.value === "" ||
    login_user_address.value === ""
  ) {
    alert("Vui l??ng nh???p ?????y ????? th??ng tin");
    background_loading_waiting.style.display = "none";
  } else {
    let info = {
      username: login_user_name.value,
      passwords: login_user_passwords.value,
      email: login_user_email.value,
      phone: login_user_phone.value,
      address: login_user_address.value,
    };
    handleVerifyOtpRegister(info, "jwt_us");
  }
});
function handleVerifyOtpRegister(info, user_token) {
  let email = {
    email: info.email,
    phone: info.phone,
  };
  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  };
  fetch(sentMailApi, option)
    .then((response) => response.json())
    .then((response) => {
      background_loading_waiting.style.display = "none";
      if (response.message === "success") {
        otp_code = response.code;
        handleVerifyOtp(info, user_token);
        // alert("M?? OTP ???? ???????c g???i ?????n mail c???a b???n");
        setCookie("user_email", email_get_otp.value, 1);
        register_user_register_form.style.display = "none";
        enter_otp_code_register_form.style.display = "block";
      } else if (response.message === "Phone already exists") {
        alert("S??? ??i???n tho???i n??y ???? ???????c s??? d???ng");
      } else if (response.message === "Please check phone") {
        alert("Vui l??ng ki???m tra l???i s??? ??i???n tho???i");
      } else if (response.message === "Please check email") {
        alert("Vui l??ng ki???m tra l???i email");
      } else if (response.message === "Email already exists") {
        alert("Email n??y ???? ???????c s??? d???ng");
      } else {
        alert("L???i h??? th???ng");
      }
    });
}
function handleVerifyOtp(info, user_token) {
  enter_code_register_continue_btn.onclick = function () {
    if (enter_otp_code_register_value === "") {
      alert("Vui l??ng nh???p m?? OTP");
    } else if (parseInt(enter_otp_code_register_value.value) === otp_code) {
      enter_otp_code.style.display = "none";
      background_loading_waiting.style.display = "block";
      registerUser(info, user_token);
    } else {
      alert("OTP kh??ng ????ng");
    }
  };
}
function registerUser(info, accessToken) {
  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  fetch(loginApi + "/register", option)
    .then((response) => response.json())
    .then((response) => {
      // background_loading_waiting.style.display = "none";
      if (response.message === "register success") {
        setCookie(accessToken, response.accessToken, 1);
        alert("????ng k?? t??i kho???n th??nh c??ng");
        location.reload();
      } else {
        alert("????ng k?? th???t b???i");
      }
    });
}
// cookie function
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// handle login user
login_user_continue_btn.addEventListener("click", () => {
  let customer = {
    phone: login_user_username.value,
    passwords: login_user_password.value,
  };
  background_loading_waiting.style.display = "block";
  setTimeout(() => {
    loginUser(customer, "jwt_us");
  }, 1500);
});
function loginUser(user, accessToken) {
  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  fetch(loginApi + "/login", option)
    .then((response) => response.json())
    .then((response) => {
      if (response.message === "login success") {
        setCookie(accessToken, response.accessToken, 1);
        background_loading_waiting.style.display = "none";
        location.reload();
      } else {
        alert("Vui l??ng ki???m tra l???i th??ng tin ????ng nh???p");
        background_loading_waiting.style.display = "none";
      }
    });
}
// handle change form
function handleChangeForm() {
  for (let i = 0; i < login_user_register_btn.length; i++) {
    login_user_register_btn[i].addEventListener("click", () => {
      register_user_register_form.style.display = "block";
      login_user_container_form.style.display = "none";
      forget_user_register_form.style.display = "none";
    });
    login_user_login_btn[i].addEventListener("click", () => {
      login_user_container_form.style.display = "block";
      register_user_register_form.style.display = "none";
      forget_user_register_form.style.display = "none";
    });
    login_user_forget_password_btn[i].addEventListener("click", () => {
      forget_user_register_form.style.display = "block";
      register_user_register_form.style.display = "none";
      login_user_container_form.style.display = "none";
    });
  }
}
handleGetOtpChangePassword();
handleChangeForm();
