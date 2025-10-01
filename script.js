function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

function showLogin() {
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {
    alert("Login successful!");
    window.location.href = "home.html"; // redirect to home page
  } else {
    alert("Invalid username or password");
  }
}

function register() {
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirmPassword").value;

  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill all fields!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  alert("Registration successful! You can now login.");
  showLogin();
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

