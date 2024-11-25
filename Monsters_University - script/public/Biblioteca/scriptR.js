document.addEventListener("DOMContentLoaded", function() {
    const ratings = document.querySelectorAll('.rating');
    
    ratings.forEach(rating => {
        const ratingValue = parseFloat(rating.getAttribute('data-rating'));
        const fullStars = Math.floor(ratingValue);
        const halfStar = ratingValue % 1 !== 0;
        
        let stars = '';

        // Generar estrellas llenas
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        // Generar media estrella si es necesario
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        // Completar las estrellas faltantes hasta 5
        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        rating.innerHTML = stars;
    });
});
