document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            
            const productId = button.dataset.productId;
            const userId = button.dataset.userId; 
            const name = button.dataset.productName;
            const price = button.dataset.productPrice;

            try {
                const response = await fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId, productId, name, price })
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                } else {
                    alert(result.error);
                }
            } catch (error) {
                console.error('Error adding product to cart:', error);
                alert('Error adding product to cart');
            }
        });
    });
});
