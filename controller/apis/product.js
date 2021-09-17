const express = require("express");
const router = express.Router(); // navigation
const random = require("randomString");
const connection = require("../../public/connection.js"); // use connection
const middleware = require("../middleware/product.middleware.js");
let query;

router.get("/", (req, res) => {
  let product = [];
  query = ` select * from product where is_Active = 1`;
  connection.query(query, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        let visible_id = result[i].visible_id;
        let pro_name = result[i].pro_name;
        let pro_type = result[i].pro_type;
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
            pro_description: pro_description,
            pro_price: pro_price,
          };
          product.push(cache);
          if (i === result.length - 1) {
            return res
              .status(200)
              .json({ success: true, message: "success", product });
          }
        });
      }
    }
  });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  query = ` select * from product where visible_id = '${id}' and is_Active = 1`;
  connection.query(query, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: " success",
        data: result,
      });
    } else {
      return res.status(400).json({ success: false, message: "Id not found" });
    }
  });
});
router.post("/", middleware.checkProduct, (req, res) => {
  const visible_id = random.generate(20);
  const { pro_name, pro_type, pro_description, pro_price } = req.body;
  query = `insert into product (visible_id,pro_name,pro_type,pro_description,pro_price)
                    values('${visible_id}',
                           '${pro_name}',
                           '${pro_type}',
                           '${pro_description}',
                            ${pro_price})`;

  connection.query(query, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "err" });
    return res.status(200).json({
      success: true,
      message: "success",
      data: visible_id,
      pro_name,
      pro_type,
      pro_description,
      pro_price,
    });
  });
});
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const { pro_name, pro_type, pro_description, pro_price } = req.body;
  let checkPro_id = `select visible_id from product where visible_id = '${id}'
    and is_Active = 1`;
  query = `update product set 
             pro_name = '${pro_name}',
             pro_type = '${pro_type}',
             pro_description = '${pro_description}',
             pro_price = ${pro_price}
             where visible_id ='${id}' and is_Active = 1`;
  connection.query(checkPro_id, (err, result) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, message: "err checkPro_id" });
    if (result.length > 0) {
      connection.query(query, (error, result) => {
        if (error)
          return res.status(400).json({ success: false, message: "error" });
        return res.status(200).json({
          success: true,
          message: " success",
          data: id,
          pro_name,
          pro_type,
          pro_description,
          pro_price,
        });
      });
    } else {
      return res.status(400).json({ success: false, message: "Id not found" });
    }
  });
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let checkPro_id = `select visible_id from product where visible_id = '${id}'
                                and is_Active = 1`;
  query = `update product set is_Active = 0 where visible_id = '${id}'`;
  connection.query(checkPro_id, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "err" });
    if (result.length > 0) {
      connection.query(query, (error, Result) => {
        if (error)
          return res
            .status(400)
            .json({ success: false, message: "err checkPro_id" });
        return res
          .status(200)
          .json({ success: true, message: "Delete success", data: id });
      });
    } else {
      return res.status(400).json({ success: false, message: "Id not found" });
    }
  });
});

module.exports = router;
