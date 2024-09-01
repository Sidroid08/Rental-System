
<script>
  document.addEventListener("DOMContentLoaded", function() {
      // Function to update subtotal
      function updateSubtotal() {
          const rows = document.querySelectorAll("#cart tbody tr");
          let total = 0;

          rows.forEach(row => {
              const quantityInput = row.querySelector("input[type='number']");
              let quantity = parseInt(quantityInput.value);

              if (isNaN(quantity) || quantity < 1) {
                  quantity = 1;
                  quantityInput.value = quantity;
              }

              // Get the price and remove currency symbol and commas
              let price = row.querySelector("td:nth-child(4)").textContent.replace('₹', '').replace(/,/g, '');
              price = parseFloat(price);

              // Calculate subtotal
              const subtotal = price * quantity;
              row.querySelector("td:nth-child(6)").textContent = `₹${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}`;

              // Add to total
              total += subtotal;
          });

          // Update subtotal in the summary table
          document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)").textContent = `₹${total.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
          document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)").textContent = `₹${total.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
      }

      // Function to remove item from cart
      function removeItem(event) {
          event.preventDefault();
          const row = event.target.closest("tr");
          row.remove();
          updateSubtotal();
      }

      // Function to apply coupon
      function applyCoupon() {
          const couponCode = document.querySelector("#coupon input").value.trim();
          const validCoupon = "DISCOUNT10"; // Example coupon code
          const discountRate = 0.1; // 10% discount

          if (couponCode === validCoupon) {
              let subtotal = parseFloat(document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)").textContent.replace('₹', '').replace(/,/g, ''));
              const discount = subtotal * discountRate;
              subtotal -= discount;
              document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)").textContent = `₹${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
              alert("Coupon applied successfully!");
          } else {
              alert("Invalid coupon code!");
          }
      }

      // Attach event listeners
      document.querySelectorAll("#cart input[type='number']").forEach(input => {
          input.addEventListener("change", updateSubtotal);
      });

      document.querySelectorAll("#cart .fa-times-circle").forEach(button => {
          button.addEventListener("click", removeItem);
      });

      document.querySelector("#coupon button").addEventListener("click", applyCoupon);

      // Initial subtotal calculation
      updateSubtotal();
  });
</script>
