var cartsApi = "http://localhost:5000/carts";
window.addEventListener("load", () => {
  const down = document.querySelectorAll(".fa-minus");
  const count = document.querySelectorAll(".fa-plus");
  const input = document.querySelectorAll(".quanity-input");
  const delete_btn = document.querySelectorAll(".item-delete");
  const message_box = document.querySelector(".cart-message");
  const agree = document.querySelector(".message-btn-yes");
  const cancel = document.querySelector(".message-btn-no");
  const ship_money = document.querySelector(".cart-ship-money");
  const total_product = document.querySelector(".cart-total-all_product");
  const total_money = document.querySelector(".cart-total-money");
  const cache = document.querySelectorAll(".cart-item-total");
  // const black = document.querySelector("html");
  let listCarts = [];
  function getProductCart() {
    listCarts = [];
    fetch(cartsApi + "/" + "Yw8m41eVXwv4PS9HlDNJ")
      .then(function (response) {
        return response.json();
      })
      .then((products) => {
        products.product.map((product) => {
          let listProduct = {
            cart_user_id: "Yw8m41eVXwv4PS9HlDNJ",
            image_path: product.image_path,
            pro_description: product.pro_description,
            pro_name: product.pro_name,
            pro_price: product.pro_price,
            pro_quantity: product.pro_quantity,
            pro_type: product.pro_type,
            visible_id_pro: product.visible_id_pro,
          };
          listCarts.push(listProduct);
        });
        total();
      });
  }
  function total() {
    let sum = 0;
    if (listCarts.length != 0) {
      for (i = 0; i < listCarts.length; i++) {
        sum += parseInt(listCarts[i].pro_price * listCarts[i].pro_quantity);
      }
      ship_money.innerHTML = 20000 + `<u>đ</u>`;
    } else {
      sum = 0;
      ship_money.innerHTML = 0 + `<u>đ</u>`;
    }
    total_product.innerHTML = sum + `<u>đ</u>`;
    total_money.innerHTML =
      parseFloat(sum + parseFloat(ship_money.innerHTML)) + `<u>đ</u>`;
  }
  function handleCountDownInput() {
    for (let i = 0; i < down.length; i++) {
      down[i].addEventListener("click", (e) => {
        if (input[i].value <= 1) {
          return;
        }
        input[i].value--;
        let cache1 = parseFloat(input[i].value * listCarts[i].pro_price);
        cache[i].innerHTML = cache1;
        let id = e.target.getAttribute("data-id");
        let value = input[i].value;
        let user_id = "Yw8m41eVXwv4PS9HlDNJ";
        let data = {
          cart_user_id: user_id,
          cart_pro_id: id,
          cart_pro_quantity: value,
        };
        updateQuantity(data);
      });
      count[i].addEventListener("click", (e) => {
        if (input[i].value >= 10) {
          return;
        }
        input[i].value++;
        let cache1 = parseFloat(input[i].value * listCarts[i].pro_price);
        cache[i].innerHTML = cache1;
        let id = e.target.getAttribute("data-id");
        let value = input[i].value;
        let user_id = "Yw8m41eVXwv4PS9HlDNJ";
        let data = {
          cart_user_id: user_id,
          cart_pro_id: id,
          cart_pro_quantity: value,
        };
        updateQuantity(data);
      });
    }
  }
  function handleDeleteProductCart() {
    for (let i = 0; i < delete_btn.length; i++) {
      delete_btn[i].addEventListener("click", function (e) {
        let data = {
          cart_user_id: "Yw8m41eVXwv4PS9HlDNJ",
          cart_pro_id: `${e.target.getAttribute("data-id")}`,
        };
        message_box.style.display = "block";
        cancel.onclick = () => {
          message_box.style.display = "none";
        };
        agree.onclick = () => {
          handleRemoveProduct(data, e.target.getAttribute("data-id"));
          message_box.style.display = "none";
        };
      });
    }
  }
  function updateQuantity(data) {
    let option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(cartsApi, option)
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "success") {
          getProductCart();
          total();
        } else alert("Lỗi hệ thống");
      });
  }
  function handleRemoveProduct(data, id) {
    let option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(data);
    fetch(cartsApi, option)
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "Delete success") {
          getProductCart();
          total();
        } else if (response.message === "cart_pro_id not found")
          alert("Sản phẩm không tồn tại");
        else alert("Lỗi hệ thống");
      });
    var upload = document.querySelector(".cart-item-" + id);
    upload.remove();
  }
  getProductCart();
  handleCountDownInput();
  handleDeleteProductCart();
});
