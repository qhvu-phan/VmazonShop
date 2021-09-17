const express = require("express");
const connection = require("../../public/connection.js");
const bcrypt = require("bcrypt");

let middleware = {
  checkUser: (req, res, next) => {
    let username = req.body.username;
    query = `select username from users where username = '${username}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkUser" });
      if (result.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      } else {
        next();
      }
    });
  },
  checkEmail: (req, res, next) => {
    let email = req.body.email;
    regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexEmail.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please check email" });
    }
    query = `select email from users where email = '${email}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkEmail" });
      if (result.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      } else {
        next();
      }
    });
  },
  checkPhone: (req, res, next) => {
    let phone = req.body.phone;
    regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!regexPhone.test(phone)) {
      return res
        .status(400)
        .json({ success: false, message: "Please check phone" });
    }
    query = `select phone from users where phone = '${phone}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkPhone" });
      if (result.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Phone already exists" });
      } else {
        next();
      }
    });
  },
  bcrypt: async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.passwords, salt);
      req.body.passwords = hashedPassword;
      next();
    } catch (err) {
      return res.status(400).json({ success: false, message: "err" });
    }
  },
};
module.exports = middleware;
