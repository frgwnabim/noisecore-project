document.addEventListener("DOMContentLoaded", function () {
    // Responsive nav menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
        });
    }

    // Hide nav on link click 
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 699 && nav) {
                nav.classList.remove('active');
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 699 && nav) {
            nav.classList.remove('active');
        }
    });

    // Top Product Card Click to Details
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
        let modal = document.getElementById('product-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'product-modal';
            modal.style.display = 'none';
            modal.innerHTML = `
                <div class="modal-backdrop"></div>
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-body"></div>
                </div>
            `;
            document.body.appendChild(modal);

            const style = document.createElement('style');
            style.innerHTML = `
#product-modal {
    position: fixed; z-index: 9999; left: 0; top: 0; width: 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center;
}
#product-modal .modal-backdrop {
    position: absolute; left: 0; top: 0; width: 100vw; height: 100vh;
    background: rgba(30,30,30,0.35);
    backdrop-filter: blur(2px);
}
#product-modal .modal-content {
    position: relative;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(30,30,30,0.18);
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    max-width: 340px;
    width: 90vw;
    z-index: 2;
    animation: modalPopIn 0.25s cubic-bezier(.77,0,.18,1);
}
#product-modal .modal-close {
    position: absolute; right: 1rem; top: 1rem;
    background: none; border: none; font-size: 2rem; color: #232733; cursor: pointer;
}
@keyframes modalPopIn {
    from { opacity: 0; transform: scale(0.92) translateY(30px);}
    to { opacity: 1; transform: scale(1) translateY(0);}
}
            `;
            document.head.appendChild(style);
        }

        productCards.forEach(card => {
            card.style.cursor = "pointer";
            card.addEventListener('click', function () {
                const img = card.querySelector('img');
                const title = card.querySelector('h3');
                const rating = card.querySelectorAll('p')[0];
                const price = card.querySelectorAll('p')[1] || card.querySelectorAll('p')[0];

                let priceHtml = "";
                if (price) {
                    const promo = price.querySelector('.promo-price');
                    const original = price.querySelector('.original-price');
                    if (promo && original) {
                        priceHtml = `
                            <span class="promo-price">${promo.textContent}</span>
                            <del class="original-price">${original.textContent}</del>
                        `;
                    } else {
                        priceHtml = price.innerHTML;
                    }
                }

                document.querySelector('#product-modal .modal-body').innerHTML = `
                    <img src="${img ? img.src : ''}" alt="${img ? img.alt : ''}" style="width:100%;border-radius:12px;margin-bottom:1rem;">
                    <h3 style="margin:0 0 0.5rem 0;">${title ? title.textContent : ''}</h3>
                    <div style="font-size:1.2rem;margin-bottom:0.5rem;">${rating ? rating.textContent : ''}</div>
                    <div style="font-size:1.1rem;font-weight:bold;margin-bottom:1.2rem;">${priceHtml}</div>
                `;
                modal.style.display = 'flex';
            });
        });

        const closeModal = () => { modal.style.display = 'none'; };
        modal.querySelector('.modal-close').onclick = closeModal;
        modal.querySelector('.modal-backdrop').onclick = closeModal;
    }
});