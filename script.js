// Fake login
function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username && password) {
    alert("Login Successful!");
    console.log("User logged in:", username);
    window.location.href = "home.html";
  } else {
    alert("Enter valid details");
    console.log("Login failed: Empty fields");
  }
}

// Cart logic
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " added to cart!");
  console.log("Product added:", product, "Price:", price, "Cart size:", cart.length);
}

function displayCart() {
  let cartItems = document.getElementById("cart-items");
  let total = 0;

  if (!cartItems) return;

  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `<p>${item.product} - $${item.price} 
      <button onclick="removeFromCart(${index})">Remove</button></p>`;
  });

  document.getElementById("total").innerText = "Total: $" + total;
  console.log("Cart displayed. Total:", total);
}

function removeFromCart(index) {
  console.log("Removing item:", cart[index]);
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    console.log("Order attempt failed: Empty cart");
  } else {
    alert("Order placed successfully!");
    console.log("Order placed with items:", cart);
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }
}

window.onload = displayCart;
