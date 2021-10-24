const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const product = require("./controller/apis/product.js");
const image = require("./controller/apis/image.js");
const users = require("./controller/apis/users.js");
const carts = require("./controller/apis/carts.js");
const sendMail = require("./controller/apis/sendMail.js");
const suggestion_product = require("./controller/apis/product_suggestion.js");
const verifyToken = require("./controller/middleware/users.middleware");
app.use(express.static("public")); //set static file
app.set("view engine", "ejs"); //use view engine
app.set("views", "./view"); //use view engine

app.use(cookieParser());
app.use(express.json()); //use jsonfile
app.use(
  require("body-parser").urlencoded({
    extended: true,
  })
); //use req.body req.params
app.get("/suggestion", (req, res) => {
  res.render("suggestion.ejs");
});
app.get("/login_user", (req, res) => {
  res.render("login_user.ejs");
});
app.get("/admin1", verifyToken.verifyToken, (req, res) => {
  res.render("admin1.ejs", { username });
});
app.get("/login", verifyToken.verifyTokenLogin, (req, res) => {
  res.render("login.ejs");
});
app.use("/product", product);
app.use("/image", image);
app.use("/users", users);
app.use("/carts", carts);
app.use("/suggestion_product", suggestion_product);
app.use("/sendMail", sendMail);
require("./view/tesst")(app);

const port = 5000;
app.listen(port, function () {
  console.log("My server is running on" + " " + port);
});
