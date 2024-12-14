// Calculate delivery date (7 days from now)
function getDeliveryDate() {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);

    // Format the date as DD-MM-YYYY
    const formattedDate = deliveryDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    return formattedDate;
}

// Update the delivery message
function updateDeliveryMessage() {
    const deliveryMessage = document.getElementById("delivery-message");
    const deliveryDate = getDeliveryDate();
    deliveryMessage.textContent = `Thank you for your purchase. Your order will be delivered by ${deliveryDate}.`;
}

// Execute when the page loads
document.addEventListener("DOMContentLoaded", updateDeliveryMessage);
