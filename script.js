const stripe = Stripe("pk_live_51RY84KDXKnXqgNc1d0b5ZM42IOQeSJ4jDsAM4tqnrXnSutSqBhUkKnGjM9uNJm6azK0BVAqL75axyLgHbjjPfm8D00ITlvIuTm");

document.getElementById("checkout").addEventListener("click", () => {
  fetch("http://localhost:3000/create-checkout-session", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => stripe.redirectToCheckout({ sessionId: data.id }))
    .catch((error) => console.error("Error:", error));
});