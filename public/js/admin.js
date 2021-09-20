var productApi = "http://localhost:5000/product";
var imageApi = "http://localhost:5000/image";
// handle controller
var select = document.querySelector("#login");
select.addEventListener("click", () => {
  var add = document.querySelector(".login");
  add.classList.add("show");
});
var select1 = document.querySelector("#register");
select1.addEventListener("click", () => {
  var add = document.querySelector(".register");
  add.classList.add("show");
});
var addproduct = document.querySelector("#nav-header-add");
addproduct.addEventListener("click", () => {
  var add = document.querySelector("#addproduct");
  add.classList.add("show");
});
// var edit = document.querySelector("#edit");
// for (let i = 0; i < edit.length; i++) {
//   edit[i].onclick = () => {
//     //
//     console.log("đã click");
//     return false;
//   };
// }

var select2 = document.querySelector("#container");
select2.addEventListener("click", () => {
  var add = document.querySelector(".login");
  var add1 = document.querySelector(".register");
  add.classList.remove("show");
  add1.classList.remove("show");
});
var select3 = document.querySelector("#close");
select3.addEventListener("click", () => {
  var add = document.querySelector(".addproduct");
  add.classList.remove("show");
});

// handle function

function getProduct(callback) {
  fetch(productApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderProduct(products) {
  var listProduct = document.querySelector("#content");
  var html = products.product.map(function (product) {
    return `
                   <div id="conten-mem-admin" class="delete-item-${
                     product.visible_id
                   }">
                           <div> <img src="img/${product.image_path.slice(
                             10
                           )}" alt="" width="200px" height="200px"></div>
                           <div class="title-content">${product.pro_name}</div>
                           <div class="price-buy">
                               <p>${product.pro_price}vnd</p>
                               <button id="edit" onclick="editProduct('${
                                 product.visible_id
                               }')">Sửa</button>
                               <button id="delete" onclick="deleteProduct('${
                                 product.visible_id
                               }')">Xóa</button>
                           </div>
                       </div>         
                   `;
  });
  listProduct.innerHTML = html.join("");
}

function postProduct(data) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(productApi, option) //product
    .then((response) => {
      return response.json();
    })
    .then((products) => {
      if (products.message === "Product already exists") {
        alert("Sản phẩm đã tồn tại!");
      } else if (products.message === "success") {
        let id = products.data;
        var name = document.querySelector('input[name="pro_name"]').value;
        var image_path = document.querySelector(
          'input[name="image_file"]'
        ).value;
        var data_image = {
          image_pro_id: id,
          image_name: name,
          image_path: image_path,
          image_size: "400kb",
        };
        var options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data_image),
        };
        fetch(imageApi, options) // image
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            alert("success");
            getProduct(renderProduct);
          });
      }
    });
}

function handleCrateProduct() {
  var submitBtn = document.querySelector("#create");
  submitBtn.onclick = function () {
    var name = document.querySelector('input[name="pro_name"]').value;
    var type = document.querySelector('input[name="pro_type"]').value;
    var description = document.querySelector(
      'input[name="pro_description"]'
    ).value;
    var price = document.querySelector('input[name="pro_price"]').value;
    var data = {
      pro_name: name,
      pro_type: type,
      pro_description: description,
      pro_price: price,
    };

    var add = document.querySelector("#addproduct");
    add.classList.remove("show");

    postProduct(data);
  };
}

function deleteProduct(id) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(productApi + "/" + id);
  fetch(productApi + "/" + id, option)
    .then((response) => response.json())
    .then((response) => alert("Delete success!"));
  var upload = document.querySelector(".delete-item-" + id);
  upload.remove();
}
function editProduct(id) {
  let name = document.querySelector('input[name="pro_name"]').value;
  let type = document.querySelector('input[name="pro_type"]').value;
  let description = document.querySelector(
    'input[name="pro_description"]'
  ).value;
  let price = document.querySelector('input[name="pro_price"]').value;
  var image = document.querySelector('input[name="image_file"]').value;
  console.log(image);
  let data = {
    pro_name: name,
    pro_type: type,
    pro_description: description,
    pro_price: price,
    image_path: image,
  };
  let option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(productApi + "/" + id, option)
    .then((response) => response.json())
    .then((response) => {
      switch (response.message) {
        case "success":
          alert("Cập nhật hình ảnh thành công");
          getProduct(renderProduct);
          break;
        case "id not found":
          alert("Sản phẩm không tồn tại");
          break;
        case "image not found":
          alert("Không tìm thấy hình ảnh");
          break;
        default:
          alert("Lỗi hệ thống vui lòng thử lại sau");
      }
    });
}
getProduct(renderProduct);
