        const deliveryMessage = document.getElementById('delivery-message');
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5); // Add 5 days

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = deliveryDate.toLocaleDateString('en-US', options); // Format the date

        // Update the delivery message with the calculated date
        deliveryMessage.textContent = `Thank you for your purchase. Your order will be delivered on ${formattedDate}.`;
