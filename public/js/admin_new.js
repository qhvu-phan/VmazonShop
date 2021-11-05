var orderApi = "http://localhost:5000/orders";
const admin_manager_order_btn = document.querySelector(".admin-manager-order");
const admin_manager_product_btn = document.querySelector(
  ".admin-manager-product"
);
const admin_manager_order_new_btn = document.querySelector(
  ".admin-manager-order_new"
);
const content_order_table_form = document.querySelector(".content-order-table");
const admin_manger_product_form = document.querySelector(".content");
const select_type_all_btn = document.querySelector(".select_type_all_btn");
let order_all = [];
function showManagerOrder() {
  admin_manager_order_btn.addEventListener("click", () => {
    content_order_table_form.style.display = "block";
    admin_manger_product_form.style.display = "none";
    getAllOrder();
  });
  admin_manager_product_btn.addEventListener("click", () => {
    content_order_table_form.style.display = "none";
    admin_manger_product_form.style.display = "flex";
  });
}
function getAllOrder() {
  fetch(orderApi)
    .then((response) => response.json())
    .then((orders) => {
      if (orders.message === "success") {
        order_all = [];
        let i = 1;
        let index = 0;
        const table_history_member_all_form = document.querySelector(
          ".table_history-member_all"
        );
        const index_new_order = document.querySelector(".index_new_order");
        const order_info = orders.order.map((order) => {
          let status = "Đang chờ duyệt";
          if (order.order_status === "2") {
            status = "Đang giao";
          } else if (order.order_status === "3") {
            status = "Đã nhận";
          } else if (order.order_status === "4") {
            status = "Đã hủy";
          } else if (order.order_status === "1") {
            index++;
          }
          let orders = {
            order_code: order.order_code,
            order_customer: order.order_code_customer,
            order_address: order.order_address,
            order_status: order.order_status,
            order_date: order.order_date.slice(0, 10),
          };
          order_all.push(orders);
          return `
            <tr class="table_history-member">
                  <td>${i++}</td>
                  <td class="order-code-update">${order.order_code}</td>
                  <td class="order-customer-update">${
                    order.order_code_customer
                  }</td>
                  <td class="history-details">Chi tiết đơn hàng</td>
                  <td>${order.order_address}</td>
                  <td><select class="order-update-status">
                  <option value="1">${status}</option>
                  <option value="2">Đang giao</option>
                  <option value="3">Đã nhận</option>
                  <option value="4">Đã hủy</option>
                  </select><i class="far fa-edit"></i></td>
                  <td>${order.order_date.slice(0, 10)}</td>
                </tr>
            `;
        });
        table_history_member_all_form.innerHTML = order_info;
        index_new_order.innerHTML = index;
      }
    })
    .then(() => {
      handleUpdateAction();
    });
}
function handleUpdateAction() {
  const order_update_status_value = document.querySelectorAll(
    ".order-update-status"
  );
  const order_code_value = document.querySelectorAll(".order-code-update");
  const order_customer_value = document.querySelectorAll(
    ".order-customer-update"
  );
  const order_update_status_btn = document.querySelectorAll(".fa-edit");
  for (let i = 0; i < order_update_status_btn.length; i++) {
    order_update_status_btn[i].addEventListener("click", () => {
      let data = {
        order_code: order_code_value[i].innerHTML,
        order_code_customer: order_customer_value[i].innerHTML,
        order_status: order_update_status_value[i].value,
      };
      console.log(data);
      let option = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(orderApi + "/status", option)
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "update status success") {
            alert("Cập nhật trạng thái đơn hàng thành công");
          } else {
            alert("Lỗi hệ thống");
          }
        });
    });
  }
}
console.log(order_all);
function handleRenderNewOrder(type) {
  const table_history_member_all_form = document.querySelector(
    ".table_history-member_all"
  );
  let i = 1;
  const order_new = order_all.map((order) => {
    if (order.order_status === type) {
      let status = "Đang chờ duyệt";
      if (order.order_status === "2") {
        status = "Đang giao";
      } else if (order.order_status === "3") {
        status = "Đã nhận";
      } else if (order.order_status === "4") {
        status = "Đã hủy";
      }
      return `
        <tr class="table_history-member">
              <td>${i++}</td>
              <td class="order-code-update">${order.order_code}</td>
              <td class="order-customer-update">${order.order_customer}</td>
              <td class="history-details">Chi tiết đơn hàng</td>
              <td>${order.order_address}</td>
              <td><select class="order-update-status">
              <option value="1">${status}</option>
              <option value="2">Đang giao</option>
              <option value="3">Đã nhận</option>
              <option value="4">Đã hủy</option>
              </select><i class="far fa-edit"></i></td>
              <td>${order.order_date}</td>
            </tr>
        `;
    }
  });
  table_history_member_all_form.innerHTML = order_new;
  handleUpdateAction();
}
function handleRenderOrderBtn() {
  admin_manager_order_new_btn.addEventListener("click", () => {
    content_order_table_form.style.display = "block";
    admin_manger_product_form.style.display = "none";
    handleRenderNewOrder("1");
  });
  select_type_all_btn.onclick = function () {
    let select_order_type_value = document.querySelector(
      ".select_order_type_value"
    );
    if (select_order_type_value.value !== "") {
      handleRenderNewOrder(`${select_order_type_value.value}`);
    } else {
      getAllOrder();
    }
  };
}
showManagerOrder();
handleRenderOrderBtn();
getAllOrder();
