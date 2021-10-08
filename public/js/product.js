var cartsApi = "http://localhost:5000/carts";
window.addEventListener("load", () => {
  let product_item_id = document.querySelectorAll(".product-item-selection");
  for (let i = 0; i < product_item_id.length; i++) {
    product_item_id[i].addEventListener("click", function (e) {
      console.log(e.target.getAttribute("data-id"));
      let data = {
        cart_user_id: "Yw8m41eVXwv4PS9HlDNJ",
        cart_pro_id: `${e.target.getAttribute("data-id")}`,
      };
      let option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(cartsApi, option)
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "success")
            alert("Thêm vào giỏ hàng thành công");
          else if (response.message === "Product already exists")
            alert("Sản phẩm đã nằm trong giỏ hàng");
          else if (response.message === "product not found") {
            alert("Sản phẩm không tồn tại");
          }
        });
    });
  }
});
