document.addEventListener('DOMContentLoaded', () => {
    let paymentOptions = document.querySelectorAll('input[name="payment"]');
    let cardDetails = document.getElementById('card-details');
    let placeOrderButton = document.getElementById('place-order');

    // Toggle card details form visibility
    paymentOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (option.value === 'card') {
                cardDetails.classList.remove('hidden');
            } else {
                cardDetails.classList.add('hidden');
            }
        });
    });

    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartTable = document.getElementById('cart-items');
    let totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Populate cart items dynamically
    cartItems.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
        `;
        cartTable.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

    // Validation for card details
    let cardNumberInput = document.getElementById('card-number');
    let cvvInput = document.getElementById('cvv');
    let expiryDateInput = document.getElementById('expiry-date');

    // Allow only numeric input for card number and CVV
    cardNumberInput.addEventListener('input', () => {
        cardNumberInput.value = cardNumberInput.value.replace(/\D/g, '');
    });

    cvvInput.addEventListener('input', () => {
        cvvInput.value = cvvInput.value.replace(/\D/g, '');
    });

    // Validate expiry date (MM/YY format and must be in the future)
    expiryDateInput.addEventListener('input', () => {
        expiryDateInput.value = expiryDateInput.value.replace(/[^0-9\/]/g, '');
        if (/^\d{2}\/\d{2}$/.test(expiryDateInput.value)) {
            let [month, year] = expiryDateInput.value.split('/').map(Number);
            let currentDate = new Date();
            let currentMonth = currentDate.getMonth() + 1;
            let currentYear = parseInt(currentDate.getFullYear().toString().slice(-2));

            if (
                month < 1 || 
                month > 12 || 
                year < currentYear || 
                (year === currentYear && month < currentMonth)
            ) {
                expiryDateInput.setCustomValidity('Enter a valid future date in MM/YY format.');
            } else {
                expiryDateInput.setCustomValidity('');
            }
        } else {
            expiryDateInput.setCustomValidity('Enter a valid date in MM/YY format.');
        }
    });

    // Handle Place Order button click
    placeOrderButton.addEventListener('click', () => {
        let confirmOrder = confirm('Do you want to confirm the order?');
        if (confirmOrder) {
            // Redirect to the Order Successful page
            window.location.href = 'success.html';
        }
    });
});
