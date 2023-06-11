// JavaScript Code
var cartItems = []; // Array to store cart items

// Function to add an item to the cart
function addItemToCart() {
  var item = {
    name: "Product Name",
    quantity: 1,
    unit_amount: {
      currency_code: "USD",
      value: 10.0
    }
  };

  // Add item to cart
  cartItems.push(item);

  // Render cart summary
  renderCartSummary();
}

// Function to render the cart summary
function renderCartSummary() {
  var cartSummaryHTML = "<h3>Cart Summary</h3>";
  var totalAmount = 0;

  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var itemTotal = item.quantity * item.unit_amount.value;
    totalAmount += itemTotal;

    cartSummaryHTML += "<p>" + item.name + " - Quantity: " + item.quantity + " - Total: $" + itemTotal.toFixed(2) + "</p>";
  }

  cartSummaryHTML += "<p>Total Amount: $" + totalAmount.toFixed(2) + "</p>";

  document.getElementById("cartSummary").innerHTML = cartSummaryHTML;
}

// Get the add to cart button element
var addCartButton = document.getElementById("addCartButton");

// Attach a click event listener to the add to cart button
addCartButton.addEventListener("click", addItemToCart);
