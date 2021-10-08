var cartsApi = "http://localhost:5000/carts";
window.addEventListener("load", () => {
  const down = document.querySelectorAll(".fa-minus");
  const count = document.querySelectorAll(".fa-plus");
  const input = document.querySelectorAll(".quanity-input");
  const delete_btn = document.querySelectorAll(".item-delete");
  const message_box = document.querySelector(".cart-message");
  const agree = document.querySelector(".message-btn-yes");
  const cancel = document.querySelector(".message-btn-no");

  for (let i = 0; i < down.length; i++) {
    down[i].addEventListener("click", () => {
      if (input[i].value <= 0 || input[i].value > 10) {
        return;
      }
      input[i].value--;
    });
  }
  for (let i = 0; i < down.length; i++) {
    count[i].addEventListener("click", () => {
      if (input[i].value > 10) {
        return;
      }
      input[i].value++;
    });
  }
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
          alert("Sản phẩm đã được lấy ra");
        } else if (response.message === "cart_pro_id not found")
          alert("Sản phẩm không tồn tại");
        else alert("Lỗi hệ thống");
      });
    var upload = document.querySelector(".cart-item-" + id);
    upload.remove();
  }
});
