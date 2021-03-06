var productsApi = "http://localhost:5000/product";
var cartsApi = "http://localhost:5000/cart";
let search_value = document.querySelector(".topbar-search-input");
const search_container = document.querySelector(".topbar-search_product_item");
let listProducts = [];
function handleEventOninput() {
  search_value.addEventListener("input", () => {
    if (search_value.value !== "") {
      searchProduct(search_value.value);
      search_container.style.display = "block";
    } else {
      search_container.style.display = "none";
    }
  });
}

function getProductCart() {
  listProducts = [];
  fetch(productsApi)
    .then(function (response) {
      return response.json();
    })
    .then((products) => {
      products.product.map((product) => {
        let listProduct = {
          image_path: product.image_path,
          pro_description: product.pro_description,
          pro_name: product.pro_name,
          pro_price: product.pro_price,
          pro_quantity: product.pro_quantity,
          pro_type: product.pro_type,
          visible_id: product.visible_id,
        };
        listProducts.push(listProduct);
      });
    });
}
function searchProduct(value) {
  const regex = new RegExp(`${value.toLowerCase()}`);
  var listProduct = document.querySelector(".search-product-list");
  var html = listProducts.map((product) => {
    if (regex.test(product.pro_name.toLowerCase())) {
      return `
        <div class="search-prouduct-item">
             <div class="product-item-img">
                 <img src="/img/${product.image_path.slice(
                   10
                 )}" width="50px" height="50px" alt="">
             </div>
             <div class="product-item-content">
                 <div class="product-item-name">${product.pro_name}</div>
                 <div class="product-item-price">${
                   product.pro_price
                 }<u>đ</u></div>
             </div>
             <div class="product-item-select">
                 <button onclick="handleBuyProduct('${
                   product.visible_id
                 }')">Mua</button>
             </div>
        </div>
     `;
    }
  });
  listProduct.innerHTML = html.join("");
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
      } else if (response.message === "Product already exists")
        alert("Sản phẩm đã nằm trong giỏ hàng");
      else if (response.message === "product not found") {
        alert("Sản phẩm không tồn tại");
      }
    });
}
getProductCart();
handleEventOninput();
