const express = require("express");
const router = express.Router();
const connection = require("../../public/connection.js");
const random = require("randomString");
const middleware = require("../middleware/users.middleware.js");
const bcrypt = require("bcrypt");
let query;

router.get("/", (req, res) => {
  query = `select * from users where is_Active = 1`;
  connection.query(query, (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      return res.status(200).json([result]);
    } else {
      return res.status(400).json({ success: false, message: "!users" });
    }
  });
});

const check = [
  middleware.checkUser,
  middleware.checkPhone,
  middleware.checkEmail,
  middleware.bcrypt,
];
router.post("/register", check, (req, res) => {
  const id = random.generate(20);
  const { username, passwords, email, phone } = req.body;
  query = `insert into users(visible_id,username,passwords,email,phone)
                    values('${id}','${username}','${passwords}','${email}','${phone}')`;
  connection.query(query, (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });

    return res.status(200).json({
      success: true,
      message: "success",
      data: id,
      username,
      passwords,
      email,
      phone,
    });
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  query = `select * from users where username='${username}' and is_Active = 1`;
  connection.query(query, async (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      let visible_id = result[0].visible_id;
      let username = result[0].username;
      const verify = await bcrypt.compare(
        req.body.passwords,
        result[0].passwords
      );
      if (verify) {
        return res.status(200).json({
          success: true,
          message: "login success",
          visible_id,
          username,
        });
      }
      return res
        .status(400)
        .json({ success: false, message: "invalid password" });
    } else {
      return res.status(400).json({ success: false, message: "invalid users" });
    }
  });
});

module.exports = router;
