// Fetching the JSON data
fetch('medicines.json')
  .then((response) => response.json()) // Parse the JSON
  .then((data) => {
    let container = document.getElementById('medicines-container');
    let cart = JSON.parse(localStorage.getItem('cartItems')) || []; // Fetch saved cart or initialize empty
    let favorites = []; // This will hold the favorite items

    // Function to update the cart table
    function updateCartTable() {
      let cartTableBody = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
      cartTableBody.innerHTML = ''; // Clear the table before updating
      cart.forEach((item, index) => {
        let row = cartTableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.textContent = item.name;
        cell2.textContent = item.quantity;
        cell3.textContent = `$${item.price * item.quantity}`;
        
        // Remove button
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          cart.splice(index, 1); // Remove the item from the cart array
          localStorage.setItem('cartItems', JSON.stringify(cart)); // Save updated cart to localStorage
          updateCartTable(); // Update the cart table view
          updateTotal(); // Update the total price
        });
        cell4.appendChild(removeButton);
      });

      // Update the total price
      updateTotal();
    }

    // Function to calculate and update the total price
    function updateTotal() {
      let total = 0;
      cart.forEach(item => {
        total += item.price * item.quantity;
      });
      // Update the total price displayed below the cart table
      document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
    }

    // Loop through each category in the JSON data
    data.forEach((category) => {
      let categorySection = document.createElement('div');
      categorySection.classList.add('category-section');
      let categoryTitle = document.createElement('h2');
      categoryTitle.textContent = category.category;
      categorySection.appendChild(categoryTitle);

      let medicineList = document.createElement('div');
      medicineList.classList.add('medicine-list');

      category.medicines.forEach((medicine) => {
        let medicineCard = document.createElement('div');
        medicineCard.classList.add('medicine-card');

        let img = document.createElement('img');
        img.src = medicine.image;
        img.alt = "";
        medicineCard.appendChild(img);

        let name = document.createElement('p');
        name.textContent = medicine.name;
        medicineCard.appendChild(name);

        let price = document.createElement('p');
        price.textContent = `Price: $${medicine.price}`;
        medicineCard.appendChild(price);

        // Create the label for quantity input
        let label = document.createElement('label');
        label.setAttribute('for', `quantity-${medicine.name}`);
        label.textContent = 'Quantity:';

        // Create the quantity input field
        let quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 1;
        quantityInput.min = 1;
        quantityInput.id = `quantity-${medicine.name}`;  // Set the ID for accessibility
        medicineCard.appendChild(label); // Append label
        medicineCard.appendChild(quantityInput); // Append input

        // Updated: Allow clearing input and validate positive values
        quantityInput.addEventListener('input', () => {
          let value = quantityInput.value;
          if (value === '' || isNaN(value) || parseInt(value) <= 0) {
            quantityInput.value = ''; // Allow clearing input temporarily
          }
        });

        let addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        medicineCard.appendChild(addToCartButton);

        addToCartButton.addEventListener('click', () => {
          let quantity = parseInt(quantityInput.value) || 1; // Fallback to 1 if input is empty
          const existingItem = cart.find((item) => item.name === medicine.name);

          if (existingItem) {
            existingItem.quantity += quantity; // Update quantity if already in cart
          } else {
            cart.push({
              name: medicine.name,
              price: medicine.price,
              quantity: quantity,
              image: medicine.image,
            });
          }

          localStorage.setItem('cartItems', JSON.stringify(cart)); // Save the updated cart
          updateCartTable(); // Update the cart table
        });

        medicineList.appendChild(medicineCard);
      });

      categorySection.appendChild(medicineList);
      container.appendChild(categorySection);
    });

    // Function to save and apply favorites (if needed)
    function saveFavorites() {
      if (cart.length === 0) {
        alert('Your cart is empty! Add some medicines before saving to favorites.');
        return;
      }
      favorites = [...cart];
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function applyFavorites() {
      if (!favorites || favorites.length === 0) {
        alert('No favorites found! Save favorites first.');
        return;
      }

      favorites.forEach((favorite) => {
        const existingItem = cart.find((item) => item.name === favorite.name);
        if (existingItem) {
          existingItem.quantity += favorite.quantity;
        } else {
          cart.push(favorite);
        }
      });

      localStorage.setItem('cartItems', JSON.stringify(cart)); // Save updated cart
      updateCartTable(); // Update cart table with favorites
    }

    document.getElementById('save-fav-btn').addEventListener('click', saveFavorites);
    document.getElementById('apply-fav-btn').addEventListener('click', applyFavorites);

    // Initialize the cart table with any saved items in localStorage
    updateCartTable();

    // Add event listener for the clear cart button
    document.getElementById('reset-cart').addEventListener('click', () => {
      cart = []; // Clear cart
      localStorage.setItem('cartItems', JSON.stringify(cart)); // Clear localStorage
      updateCartTable(); // Update the cart table
    });

    // Add event listener for the "Buy Now" button
    document.getElementById('buy-now-btn').addEventListener('click', () => {
      // Check if the cart has items
      if (cart.length === 0) {
        alert('Please add some medicines to the cart before proceeding to checkout.');
      } else {
        // Redirect to checkout page if the cart has items
        window.location.href = 'checkout.html';
      }
    });
  })
  .catch((error) => {
    console.error('Error fetching or displaying data:', error);
  });
