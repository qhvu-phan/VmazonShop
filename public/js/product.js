var cartsApi = "http://localhost:5000/carts";
window.addEventListener("load", () => {
  let topbar_cart_icon = document.querySelector(".topbar-cart-icon");
  let topbar_cart_content = document.querySelector(".topbar-cart-content");
  let cart_icon_show = document.querySelector(".cart-icon-show");
  let cart_content_show = document.querySelector(".cart-content-show");
  let product_item_id = document.querySelectorAll(".product-item-selection");
  let topbar_cart_price = document.querySelector(".topbar-cart-price");
  let topbar_cart_number = document.querySelector(".topbar-cart-number");
  let user_id = "Yw8m41eVXwv4PS9HlDNJ";
  function handleEventButton() {
    for (let i = 0; i < product_item_id.length; i++) {
      let id;
      product_item_id[i].onclick = function (e) {
        id = e.target.getAttribute("data-id");
        handleBuyProduct(id);
      };
    }
  }
  function handleCheckCart() {
    fetch(cartsApi + "/" + user_id)
      .then((response) => response.json())
      .then((products) => {
        if (products.product.length > 0) {
          let sum = 0;
          let count = 0;
          products.product.forEach((product) => {
            parseFloat((sum += product.pro_price * product.pro_quantity));
            count++;
          });
          topbar_cart_icon.style.display = "none";
          topbar_cart_content.style.display = "none";
          cart_icon_show.style.display = "block";
          cart_content_show.style.display = "block";
          topbar_cart_price.innerHTML = sum + `<u>đ</u>`;
          topbar_cart_number.innerHTML = count;
        }
      });
  }
  function handleBuyProduct(id) {
    let data = {
      cart_user_id: "Yw8m41eVXwv4PS9HlDNJ",
      cart_pro_id: id,
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
        if (response.message === "success") {
          alert("Thêm vào giỏ hàng thành công");
          handleCheckCart();
        } else if (response.message === "Product already exists")
          alert("Sản phẩm đã nằm trong giỏ hàng");
        else if (response.message === "product not found") {
          alert("Sản phẩm không tồn tại");
        }
      });
  }
  handleCheckCart();
  handleEventButton();
});
