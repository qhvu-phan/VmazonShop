const express = require("express");
const app = express();
const product = require("./controller/apis/product.js");
const image = require("./controller/apis/image.js");
const users = require("./controller/apis/users.js");
const carts = require("./controller/apis/carts.js");
const suggestion_product = require("./controller/apis/product_suggestion.js");
const connection = require("./public/connection");
app.use(express.static("public")); //set static file
app.set("view engine", "ejs"); //use view engine
app.set("views", "./view"); //use view engine

app.use(express.json()); //use jsonfile
app.use(
  require("body-parser").urlencoded({
    extended: true,
  })
); //use req.body req.params
app.get("/suggestion", (req, res) => {
  res.render("suggestion.ejs");
});
app.get("/admin1", (req, res) => {
  res.render("admin1.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.use("/product", product);
app.use("/image", image);
app.use("/users", users);
app.use("/carts", carts);
app.use("/suggestion_product", suggestion_product);
require("./view/tesst")(app);

const port = 5000;
app.listen(port, function () {
  console.log("My server is running on" + " " + port);
});
