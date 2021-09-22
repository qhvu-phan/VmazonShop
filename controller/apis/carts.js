const express = require("express");
const router = express.Router();
const connection = require("../../public/connection.js");
const random = require("randomString");
let middleware = require("../middleware/cart.middleware.js");
let query;
let check = [
  middleware.checkProduct,
  middleware.checkUserid,
  middleware.checkProductInCart,
];
router.get("/", (req, res) => {
  query = `select * from cart where is_Active = 1`;
  connection.query(query, (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "success", cart: result });
    } else {
      return res.status(400).json({ success: false, message: "dât not found" });
    }
  });
});

router.post("/", check, (req, res) => {
  const visible_id = random.generate(20);
  const { cart_user_id, cart_pro_id } = req.body;
  query = `insert into cart(visible_id,cart_user_id,cart_pro_id) values('${visible_id}','${cart_user_id}','${cart_pro_id}')`;
  connection.query(query, (error, resultss) => {
    if (error)
      return res.status(400).json({
        success: false,
        message: "error add product",
      });
    return res.status(200).json({
      success: true,
      message: "success",
      visible_id: visible_id,
      cart_user_id: cart_user_id,
      cart_pro_id: cart_pro_id,
    });
  });
});
router.get("/:id", middleware.checkId, (req, res) => {
  const id = req.params.id;
  let product = [];
  query = `select * from cart where cart_user_id='${id}' and is_Active = 1`;
  connection.query(query, (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        let visible_id = result[i].visible_id;
        let cart_user_id = result[i].cart_user_id;
        let cart_pro_id = result[i].cart_pro_id;
        let getProduct = ` select * from product where visible_id ='${cart_pro_id}' and is_Active = 1`;
        connection.query(getProduct, (err, results) => {
          if (err)
            return res.status(400).json({ success: false, message: "error" });
          for (let k = 0; k < results.length; k++) {
            let visible_id_pro = results[k].visible_id;
            let pro_name = results[k].pro_name;
            let pro_type = results[k].pro_type;
            let pro_description = results[k].pro_description;
            let pro_price = results[k].pro_price;
            let getImgae = `select image_path from image where image_pro_id='${visible_id_pro}' and is_Active = 1`;
            connection.query(getImgae, (error, resultss) => {
              if (error)
                return res
                  .status(400)
                  .json({ success: false, message: "error" });
              let cache = {
                visible_id: visible_id,
                cart_user_id: cart_user_id,
                visible_id_pro: visible_id_pro,
                image_path: resultss[0].image_path,
                pro_name: pro_name,
                pro_type: pro_type,
                pro_description: pro_description,
                pro_price: pro_price,
              };
              product.push(cache);
              if (i === result.length - 1)
                return res
                  .status(200)
                  .json({ success: true, message: "success", product });
            });
          }
        });
      }
    } else {
      return res.status(400).json({ success: false, message: "empty basket" });
    }
  });
});
router.delete("/", (req, res) => {
  const { cart_user_id, cart_pro_id } = req.body;
  let checkPro_id = `select cart_pro_id from cart where cart_pro_id = '${cart_pro_id}' and cart_user_id = '${cart_user_id}' and is_Active = 1`;
  query = `update cart set is_Active = 0  where cart_user_id = '${cart_user_id}' and cart_pro_id= '${cart_pro_id}'`;
  connection.query(checkPro_id, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "err" });
    if (result.length > 0) {
      connection.query(query, (error, Result) => {
        if (error)
          return res
            .status(400)
            .json({ success: false, message: "err checkPro_id" });
        return res.status(200).json({
          success: true,
          message: "Delete success",
          data: cart_user_id,
          cart_pro_id,
        });
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "cart_pro_id not found" });
    }
  });
});
module.exports = router;