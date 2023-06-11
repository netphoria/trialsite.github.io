// JavaScript Code
var cartItems = []; // Array to store cart items

// Function to add an item to the cart
function addItemToCart() {
  var item = {
    name: "Trial 01",
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

  // Render PayPal cart buttons
  renderPayPalButtons();
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

// Function to render PayPal cart buttons
function renderPayPalButtons() {
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: getTotalCartAmount()
            },
            items: cartItems
          }
        ]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        // Payment successful, unlock the content by removing the add to cart button
        document.getElementById("addCartButton").remove();
        document.getElementById("paypalCartContainer").innerHTML =
          "<p>Payment successful!</p>";
      });
    }
  }).render("#paypalCartContainer");
}

// Function to calculate the total cart amount
function getTotalCartAmount() {
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    total += cartItems[i].unit_amount.value * cartItems[i].quantity;
  }
  return total.toFixed(2);
}

// Get the add to cart button element
var addCartButton = document.getElementById("addCartButton");

// Attach a click event listener to the add to cart button
addCartButton.addEventListener("click", addItemToCart);
