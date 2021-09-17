const express = require("express");
const app = express();
const product = require("./controller/apis/product.js");
const image = require("./controller/apis/image.js");
const users = require("./controller/apis/users.js");
const carts = require("./controller/apis/carts.js");
app.use(express.static("public")); //set static file
app.set("view engine", "ejs"); //use view engine
app.set("views", "./view"); //use view engine

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/admin", (req, res) => {
  res.render("admin.ejs");
});
app.use(express.json()); //use jsonfile
app.use(
  require("body-parser").urlencoded({
    extended: true,
  })
); //use req.body req.params

app.use("/product", product);
app.use("/image", image);
app.use("/users", users);
app.use("/carts", carts);

const port = 5000;
app.listen(port, function () {
  console.log("My server is running on" + " " + port);
});
