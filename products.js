document.addEventListener('DOMContentLoaded', function() {
    // Filter products by category
    const select = document.getElementById('category');
    const cards = document.querySelectorAll('.product-card');
    select.addEventListener('change', function() {
        const value = select.value;
        cards.forEach(card => {
            if (value === 'all' || card.dataset.category === value) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });


    // Responsive product card columns
    function adjustProductLayout() {
        const productList = document.querySelector('.product-list');
        if (!productList) return;
        if (window.innerWidth <= 600) {
            productList.style.flexDirection = 'column';
            productList.style.alignItems = 'center';
        } else {
            productList.style.flexDirection = '';
            productList.style.alignItems = '';
        }
    }
    window.addEventListener('resize', adjustProductLayout);
    adjustProductLayout();

    // Optional: Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Product Detail Modal ---
    // Create modal element
    let modal = document.createElement('div');
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

    // Modal CSS (quick inline for demo, move to CSS file for production)
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

    // Show modal with product details
    cards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener('click', function() {
            const img = card.querySelector('img');
            const title = card.querySelector('h3');
            const rating = card.querySelectorAll('p')[0];
            const price = card.querySelectorAll('p')[1];

            document.querySelector('#product-modal .modal-body').innerHTML = `
                <img src="${img ? img.src : ''}" alt="${img ? img.alt : ''}" style="width:100%;border-radius:12px;margin-bottom:1rem;">
                <h3 style="margin:0 0 0.5rem 0;">${title ? title.textContent : ''}</h3>
                <div style="font-size:1.2rem;margin-bottom:0.5rem;">${rating ? rating.textContent : ''}</div>
                <div style="font-size:1.1rem;font-weight:bold;margin-bottom:1.2rem;">${price ? price.textContent : ''}</div>
            `;
            modal.style.display = 'flex';
        });
    });

    // Close modal on close button or backdrop click
    modal.querySelector('.modal-close').onclick = closeModal;
    modal.querySelector('.modal-backdrop').onclick = closeModal;
    function closeModal() {
        modal.style.display = 'none';
    }
});