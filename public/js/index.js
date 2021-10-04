// var productApi = "http://localhost:5000/product";
// var usersApi = "http://localhost:5000/users";
// var cartsApi = "http://localhost:5000/carts";
// var suggestionApi = "http://localhost:5000/suggestion_product";
// let listProducts = [];
// let listCarts = [];
// function getProduct(callback) {
//   fetch(productApi)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(callback);
// }
// function renderProduct(products) {
//   var listProduct = document.querySelector("#content");
//   var html = products.product.map(function (product) {
//     let productData = {
//       visible_id: product.visible_id,
//       pro_name: product.pro_name,
//       image_path: product.image_path,
//       pro_type: product.pro_type,
//       pro_description: product.pro_description,
//       pro_price: product.pro_price,
//     };
//     listProducts.push(productData);
//     return `
//              <div id="conten-mem" class="${product.visible_id}">
//                      <div> <img src="/img/${product.image_path.slice(
//                        10
//                      )}" alt="" width="200px" height="200px"></div>
//                      <div class="title-content">${product.pro_name}</div>
//                      <div class="price-buy">
//                          <p>SL:1</p>
//                          <p>${product.pro_price}vnd</p>
//                      </div><br>
//                      <div id="buy">
//                       <button onClick="checkLogin('${
//                         product.visible_id
//                       }')">Thêm</button>
//                       </div>
//                       <div id="sale"><img src="img/sale.png" alt="" with="50px" height="50px" ></div>
//                  </div>
//              `;
//   });
//   listProduct.innerHTML = html.join("");
// }
// getProduct(renderProduct);

// function register(data) {
//   var option = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   fetch(usersApi + "/register", option)
//     .then((response) => response.json())
//     .then((response) => {
//       switch (response.message) {
//         case "success":
//           alert("Đăng ký thành công");
//           var close = document.querySelector(".register");
//           close.classList.add("hide");
//           close.classList.remove("show");
//           document.querySelector('input[name="user"]').value = "";
//           document.querySelector('input[name="phone"]').value = "";
//           document.querySelector('input[name="address"]').value = "";
//           document.querySelector('input[name="password"]').value = "";
//           document.querySelector('input[name="passwords"]').value = "";
//           break;
//         case "User already exists":
//           alert("Tài khoản đã tồn tại");
//           break;
//         case "Please check phone":
//           alert("Số điện thoại không hợp lệ");
//           break;
//         case "Phone already exists":
//           alert("Số điện thoại này đã được đăng ký");
//           break;
//         case "Please check email":
//           alert("Email không hợp lệ");
//           break;
//         case "Email already exists":
//           alert("Email này đã được đăng ký");
//       }
//     });
// }
// function registerUser() {
//   var username = document.querySelector('input[name="user"]').value;
//   var phone = document.querySelector('input[name="phone"]').value;
//   var email = document.querySelector('input[name="address"]').value;
//   var password = document.querySelector('input[name="password"]').value;
//   var passwords = document.querySelector('input[name="passwords"]').value;
//   if (password != passwords) {
//     return alert("Xác nhận mật khẩu không đúng! Vui lòng thử lại");
//   }
//   var data = {
//     username: username,
//     passwords: password,
//     email: email,
//     phone: phone,
//   };
//   register(data);
// }
// // get product with pro_type
// function renderAllProduct() {
//   var listProduct = document.querySelector("#content");
//   document.querySelector(".search").value = "";
//   var html = listProducts.map((product) => {
//     return `
//                      <div id="conten-mem" class="${product.visible_id}">
//                              <div> <img src="/img/${product.image_path.slice(
//                                10
//                              )}" alt="" width="200px" height="200px"></div>
//                              <div class="title-content">${
//                                product.pro_name
//                              }</div>
//                              <div class="price-buy">
//                                  <p>SL:1</p>
//                                  <p>${product.pro_price}vnd</p>
//                              </div><br>
//                              <div id="buy">
//                               <button onClick="checkLogin('${
//                                 product.visible_id
//                               }')">Thêm</button>
//                               </div>
//                               <div id="sale"><img src="img/sale.png" alt="" with="50px" height="50px" ></div>
//                          </div>
//                      `;
//   });
//   listProduct.innerHTML = html.join("");
// }
// function renderProductTypeof(pro_type) {
//   var listProduct = document.querySelector("#content");
//   document.querySelector(".search").value = "";
//   var html = listProducts.map((product) => {
//     if (product.pro_type === pro_type) {
//       return `
//                      <div id="conten-mem" class="${product.visible_id}">
//                              <div> <img src="/img/${product.image_path.slice(
//                                10
//                              )}" alt="" width="200px" height="200px"></div>
//                              <div class="title-content">${
//                                product.pro_name
//                              }</div>
//                              <div class="price-buy">
//                                  <p>SL:1</p>
//                                  <p>${product.pro_price}vnd</p>
//                              </div><br>
//                              <div id="buy">
//                               <button onClick="checkLogin('${
//                                 product.visible_id
//                               }')">Thêm</button>
//                               </div>
//                               <div id="sale"><img src="img/sale.png" alt="" with="50px" height="50px" ></div>
//                          </div>
//                      `;
//     }
//   });
//   listProduct.innerHTML = html.join("");
// }
// //handle login
// function checkLogin(pro_id) {
//   var account = document.querySelector("#login-username").className;
//   if (account === "noti-member hide") {
//     alert("Vui lòng đăng nhập trước khi mua hàng");
//   } else {
//     let data = {
//       cart_user_id: document.querySelector("#user_id").value,
//       cart_pro_id: pro_id,
//     };
//     addProductCart(data);
//   }
// }
// function login() {
//   var username = document.querySelector('input[name="username_login"]').value;
//   var passwords = document.querySelector('input[name="passwords_login"]').value;
//   let information = {
//     username: username,
//     passwords: passwords,
//   };
//   let option = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(information),
//   };
//   fetch(usersApi + "/login", option)
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.message === "login success") {
//         alert("Đăng nhập thành công");
//         document.querySelector("#register-user").classList.add("hide");
//         document.querySelector("#login-user").classList.add("hide");
//         document.querySelector("#logout-user").classList.remove("hide");
//         document.querySelector("#login-username").classList.remove("hide");
//         document.querySelector("#user-login").innerHTML = response.username;
//         document.querySelector("#user_id").value = response.visible_id;
//       } else if (response.message === "invalid users") {
//         alert("Tài khoản không tồn tại");
//       } else if (response.message === "invalid password") {
//         alert("Vui lòng kiểm tra lại mật khẩu");
//       } else {
//         alert("Lỗi hệ thống vui lòng thử lại sau");
//       }
//     });
// }
// // handle add product for cart
// function addProductCart(data) {
//   let option = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   fetch(cartsApi, option)
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.message === "success") alert("Thêm vào giỏ hàng thành công");
//       else if (response.message === "Product already exists")
//         alert("Sản phẩm đã nằm trong giỏ hàng");
//       else if (response.message === "product not found") {
//         alert("Sản phẩm không tồn tại");
//         getProduct(renderProduct);
//       }
//     });
// }

// function show_cart() {
//   var account = document.querySelector("#login-username").className;
//   if (account != "noti-member hide") {
//     var show = document.querySelector(".class");
//     show.classList.add("show");
//     let id = document.querySelector("#user_id").value;
//     fetch(cartsApi + "/" + id)
//       .then((response) => response.json())
//       .then((products) => {
//         if (products.message === "success") {
//           let cart_list = document.querySelector("#cart_list_mem");
//           listCarts = [];
//           let list = products.product.map((product) => {
//             let cart = {
//               visible_id: product.visible_id_pro,
//               image_path: product.image_path,
//               pro_name: product.pro_name,
//               pro_qua: product.pro_quantity,
//               pro_price: product.pro_price,
//             };
//             listCarts.push(cart);
//             return `
//        <div id="cart-mem" class="cart-mem-${product.visible_id_pro}">
//                 <div id="description">
//                <div class = "cart-delete"> <i onclick="removeProductCart('${
//                  product.visible_id_pro
//                }')" class="fas fa-minus-circle"></i></div>
//                <div class="cart-imgae">
//                   <img
//                     src="/img/${product.image_path.slice(10)}"
//                     width="50px"
//                     height="50px"
//                     alt="hinh"
//                   />
//                   </div>
//                   <div class="cart-name">
//                   <label for="">${product.pro_name}</label></div>
//                 <div class="cart-number"><label for=""><select data-id="${
//                   product.visible_id_pro
//                 }" class="quantity">
//                 <option>${product.pro_quantity}</option>
//                 <option>1</option>
//                 <option>2</option>
//                 <option>3</option>
//                 <option>4</option>
//                 <option>6</option>
//                 <option>7</option>
//                 <option>8</option>
//                 <option>9</option>
//                 <option>10</option>
//                 </select></label></div>
//                 </div>
//                 <div id="total">${parseInt(
//                   product.pro_price * product.pro_quantity
//                 )}vnd</div>
//               </div>
//        `;
//           });
//           cart_list.innerHTML = list.join("");
//         } else {
//           listCarts = [];
//           alert("Giỏ hàng trống");
//           total();
//         }
//       })
//       .then(() => {
//         total();
//         let getElement = document.getElementsByClassName("quantity");
//         for (let i = 0; i < getElement.length; i++) {
//           getElement[i].addEventListener("change", function (e) {
//             let id = e.target.getAttribute("data-id");
//             let value = getElement[i].value;
//             let user_id = document.querySelector("#user_id").value;
//             let data = {
//               cart_user_id: user_id,
//               cart_pro_id: id,
//               cart_pro_quantity: value,
//             };
//             updateQuantity(data);
//           });
//         }
//       });
//   } else {
//     alert("Vui lòng đăng nhập");
//   }
// }
// // search product
// function searchProduct() {
//   let value = document.querySelector(".search").value;
//   const regex = new RegExp(`${value.toLowerCase()}`);
//   var listProduct = document.querySelector("#content");
//   var html = listProducts.map((product) => {
//     if (regex.test(product.pro_name.toLowerCase())) {
//       return `
//                      <div id="conten-mem" class="${product.visible_id}">
//                              <div> <img src="/img/${product.image_path.slice(
//                                10
//                              )}" alt="" width="200px" height="200px"></div>
//                              <div class="title-content">${
//                                product.pro_name
//                              }</div>
//                              <div class="price-buy">
//                                  <p>SL:1</p>
//                                  <p>${product.pro_price}vnd</p>
//                              </div><br>
//                              <div id="buy">
//                               <button onClick="checkLogin('${
//                                 product.visible_id
//                               }')">Thêm</button>
//                               </div>
//                               <div id="sale"><img src="img/sale.png" alt="" with="50px" height="50px" ></div>
//                          </div>
//                      `;
//     }
//   });
//   listProduct.innerHTML = html.join("");
// }
// function removeProductCart(id) {
//   let cart_user_id = document.querySelector("#user_id").value;
//   let cart_pro_id = id;
//   let data = {
//     cart_user_id: cart_user_id,
//     cart_pro_id: cart_pro_id,
//   };
//   let option = {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   fetch(cartsApi, option)
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.message === "Delete success") {
//         alert("Sản phẩm đã được lấy ra");
//         show_cart();
//         total();
//       } else if (response.message === "cart_pro_id not found")
//         alert("Sản phẩm không tồn tại");
//       else alert("Lỗi hệ thống");
//     });
//   var upload = document.querySelector(".cart-mem-" + id);
//   upload.remove();
// }
// console.log(listCarts);

// function total() {
//   let sum = 0;
//   if (listCarts.length > 0) {
//     for (i = 0; i < listCarts.length; i++) {
//       sum += parseInt(listCarts[i].pro_price * listCarts[i].pro_qua);
//     }
//   } else {
//     sum = 0;
//   }
//   let total = document.querySelector("#totalAmount");
//   total.innerHTML = sum + "vnd";
//   console.log(listCarts.length);
// }
// function updateQuantity(data) {
//   let option = {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   fetch(cartsApi, option)
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.message === "success") show_cart();
//       else alert("Lỗi hệ thống");
//     });
// }
// function suggestion() {
//   let select_type = document.querySelector("#select-type").value;
//   let money = document.querySelector("#money").value;
//   let data = {
//     money: money,
//   };
//   let option = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   console.log(select_type);
//   console.log(money);
//   console.log(suggestionApi + "/" + select_type);
//   fetch(suggestionApi + "/" + select_type, option)
//     .then((response) => response.json())
//     .then((response) => {
//       console.log("ok");
//       if (response.message === "success") {
//         let suggestion_product = document.querySelector("#suggestion");
//         let render = response.suggestion.map(function (product) {
//           return `
//           <div id="conten-mem" class="${product.visible_id}">
//          <div> <img src="/img/${product.image_path.slice(
//            10
//          )}" alt="" width="200px" height="200px"></div>
//          <div class="title-content">${product.pro_name}</div>
//          <div class="price-buy">
//              <p>SL:${product.quantity}</p>
//              <p>${product.pro_price}vnd</p>

//          </div>
//          <div>
//          <p>Dinh dưỡng: ${product.nutritional}</p>
//             </div>
//           <div id="sale"><img src="img/sale.png" alt="" with="50px" height="50px" ></div>
//        </div>
//        `;
//         });
//         suggestion_product.innerHTML = render.join("");
//         document.querySelector("#product-buy-number").innerHTML =
//           "Số sản phẩm mua được:" + " " + response.count;
//         document.querySelector("#money-total").innerHTML =
//           "Tiền thừa:" + " " + response.money + "vnd";
//       } else if (response.message === "invalid type") {
//         alert("Loại sản phẩm không tồn tại");
//       } else if (response.message === "money very small") {
//         alert(response.money + "vnd" + " " + "không đủ để mua nhân phẩm");
//       } else {
//         alert("Lỗi hệ thống");
//       }
//     });
// }
