const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

module.exports = (app) => {
  app.get("/", (req, res) => {
    let fileName = "index.ejs";
    fs.readFile(path.resolve(__dirname, fileName), async (err, data) => {
      if (err) {
        return res.render("index.ejs");
      }
      const vegetable = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.VEGETABLE}`
      );
      const fruit = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.FRUIT}`
      );
      const meat = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.MEAT}`
      );
      const noodles = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.NOODLES}`
      );
      return res.render(fileName, {
        data: {
          vegetable: vegetable.data.product,
          fruit: fruit.data.product,
          meat: meat.data.product,
          noodles: noodles.data.product,
        },
      });
    });
  });
  app.get("/cart", (req, res) => {
    let fileName = "cart.ejs";
    fs.readFile(path.resolve(__dirname, fileName), async (err, data) => {
      if (err) {
        return res.render("cart.ejs");
      }
      const cart = await axios.get(
        `${process.env.LOCALHOST}/${process.env.CART}/${process.env.ID}`
      );
      return res.render(fileName, {
        data: {
          cart: cart.data.product,
        },
      });
    });
  });
};
