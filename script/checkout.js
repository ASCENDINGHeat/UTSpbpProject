document.addEventListener('DOMContentLoaded', () => {
    const cartSummary = document.getElementById('cart-summary');
    const cartTotal = document.getElementById('cart-total');
    const checkoutForm = document.getElementById('checkout-form');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const renderCart = () => {
        cartSummary.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartSummary.innerHTML = '<p>Your cart is empty.</p>';
            cartTotal.textContent = '$0.00';
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex justify-between py-2 border-b';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price}</span>
            `;
            cartSummary.appendChild(itemElement);

            const price = parseFloat(item.price.replace('$', '').replace(',', '.'));
            total += price;
        });

        cartTotal.textContent = `$${total.toFixed(2).replace('.', ',')}`;
    };

    renderCart();

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your order! (This is a demonstration)');
            localStorage.removeItem('cart');
            window.location.href = './index.html';
        });
    }
});