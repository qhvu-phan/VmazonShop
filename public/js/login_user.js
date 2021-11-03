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
let otp_code = null;

function handleGetOtpChangePassword() {
  get_otp_continue_btn.onclick = function () {
    let email = {
      email: email_get_otp.value,
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
        if (response.message === "success") {
          otp_code = response.code;
          alert("Mã OTP đã được gửi đến mail của bạn");
          setCookie("user_email", email_get_otp.value, 1);
          forget_user_register_form.style.display = "none";
          enter_otp_code.style.display = "block";
        } else {
          alert("Lỗi hệ thống");
        }
      });
  };
}

enter_code_continue_btn.onclick = function () {
  if (parseInt(enter_otp_code_value.value) === otp_code) {
    enter_otp_code.style.display = "none";
    change_password_code_form.style.display = "block";
  } else {
    alert("OTP không đúng");
  }
};
change_password_continue_btn.onclick = function () {
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
        alert("Cập nhật mật khẩu thành công");
        delete_cookie("user_email");
        location.reload();
      } else {
        alert("Lỗi hệ thống");
      }
    });
};
login_user_continue_btn.addEventListener("click", () => {
  let customer = {
    phone: login_user_username.value,
    passwords: login_user_password.value,
  };
  loginUser(customer, "jwt_us");
});
login_user_register_action.addEventListener("click", () => {
  let info = {
    username: login_user_name.value,
    passwords: login_user_passwords.value,
    email: login_user_email.value,
    phone: login_user_phone.value,
    address: login_user_address.value,
  };
  registerUser(info, "jwt_us");
});
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
function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
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
        alert("Đăng nhập thành công");
        location.reload();
      } else {
        alert("Vui lòng kiểm tra lại thông tin đăng nhập");
      }
    });
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
      if (response.message === "register success") {
        setCookie(accessToken, response.accessToken, 1);
        alert("Resgister success!");
        location.reload();
      } else {
        alert("Đăng ký thất bại");
      }
    });
}

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
// handleVerifyOtp();
// handleOrderDetailsBtn();
