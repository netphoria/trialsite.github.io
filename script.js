// JavaScript Code
// Get the checkout button element
var checkoutButton = document.getElementById("checkoutButton");

// Attach a click event listener to the checkout button
checkoutButton.addEventListener("click", function() {
  // Prompt the user for payment details
  var payment = prompt("Please enter your payment details:");

  // Check if payment is successful
  if (payment) {
    // Unlock the content by removing the checkout button
    checkoutButton.remove();
  } else {
    // Show an error message if payment fails
    alert("Payment failed. Please try again.");
  }
});
