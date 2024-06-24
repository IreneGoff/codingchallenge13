document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'https://course-api.com/react-store-products';
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const productElement = document.getElementById('product');
    const productImage = document.getElementById('product-image');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let products = [];
    let currentIndex = 0;

    const fetchData = async () => {
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            products = await response.json();
            displayProduct(currentIndex);
        } catch (error) {
            showError();
        } finally {
            hideLoading();
        }
    };

    const displayProduct = (index) => {
        if (products.length === 0) return;

        const product = products[index];
        productImage.src = product.image;
        productName.textContent = product.name;
        productPrice.textContent = `$${product.price}`;
        productDescription.textContent = product.description;

        productElement.classList.remove('hidden');
    };

    const showError = () => {
        errorElement.classList.remove('hidden');
    };

    const hideLoading = () => {
        loadingElement.classList.add('hidden');
    };

    const navigateProduct = (direction) => {
        currentIndex = (currentIndex + direction + products.length) % products.length;
        displayProduct(currentIndex);
    };

    prevButton.addEventListener('click', () => navigateProduct(-1));
    nextButton.addEventListener('click', () => navigateProduct(1));

    fetchData();
});