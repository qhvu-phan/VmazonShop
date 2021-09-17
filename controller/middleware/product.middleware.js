const express = require("express");
const connection = require("../../public/connection.js");
let query;

let middleware = {
  checkProduct: (req, res, next) => {
    let pro_name = req.body.pro_name;
    query = `select pro_name from product where pro_name = '${pro_name}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkProduct" });
      if (result.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Product already exists" });
      } else {
        next();
      }
    });
  },
};
module.exports = middleware;
