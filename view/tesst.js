const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { response } = require("express");

module.exports = (app) => {
  app.get("/test", (req, res) => {
    let fileName = "test.ejs";
    fs.readFile(path.resolve(__dirname, fileName), async (err, data) => {
      if (err) {
        return res.render("index.ejs");
      }
      const products = await axios.get(`http://localhost:5000/product`);
      return res.render(fileName, {
        data: {
          products: products.data.product,
        },
      });
    });
  });
};
