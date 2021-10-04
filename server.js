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

app.get("/product", (req, res) => {
  let product = [];
  query = ` select * from product where is_Active = 1`;
  connection.query(query, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        let visible_id = result[i].visible_id;
        let pro_name = result[i].pro_name;
        let pro_type = result[i].pro_type;
        let pro_nutritional = result[i].pro_nutritional;
        let pro_description = result[i].pro_description;
        let pro_price = result[i].pro_price;
        let getImage = ` select * from image where image_pro_id=
                                                                   '${visible_id}' and is_Active = 1 `;
        connection.query(getImage, function (error, results) {
          if (error)
            return res
              .status(400)
              .json({ success: false, message: "Error getImage" });
          let cache = {
            image_path: results[0].image_path,
            visible_id: visible_id,
            pro_name: pro_name,
            pro_type: pro_type,
            pro_nutritional: pro_nutritional,
            pro_description: pro_description,
            pro_price: pro_price,
          };
          product.push(cache);
          if (i === result.length - 1) {
            res.render("index.ejs", { products: product });
          }
        });
      }
    }
  });
});
app.get("/", (req, res) => {
  res.render("index.ejs");
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
app.use("/suggestion_product", suggestion_product);
require("./view/tesst")(app);

const port = 5000;
app.listen(port, function () {
  console.log("My server is running on" + " " + port);
});
