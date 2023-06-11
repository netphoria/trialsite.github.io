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

  // Render PayPal cart buttons
  renderPayPalButtons();
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
