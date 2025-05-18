function transitionToPage(url, type = "fade") {
    document.body.classList.remove("fade-in", "fade-out", "slide-out", "scale-out");
    document.body.classList.add(`${type}-out`);
    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

// Entry animation 
window.addEventListener("pageshow", () => {
    document.body.classList.add("trans-enter");
    setTimeout(() => {
        document.body.classList.add("trans-enter-active");
        document.body.classList.remove("trans-enter");
    }, 10);
});

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("fade-in");

    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
        });
    }

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (
                this.hostname === window.location.hostname &&
                !this.classList.contains('active')
            ) {
                e.preventDefault();
                transitionToPage(this.href, "fade");
            }
            if (window.innerWidth <= 768 && nav) {
                nav.classList.remove('active');
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && nav) {
            nav.classList.remove('active');
        }
    });
});