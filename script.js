function transitionToPage(url, type = "fade") {
    document.body.classList.remove("fade-in", "fade-out", "slide-out", "scale-out");
    document.body.classList.add(`${type}-out`);
    setTimeout(() => {
      window.location.href = url;
    }, 400); 
  }
  window.addEventListener("pageshow", () => {
    document.body.classList.add("trans-enter");
    setTimeout(() => {
      document.body.classList.add("trans-enter-active");
      document.body.classList.remove("trans-enter");
    }, 10);
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("fade-in");
  
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function (e) {
        if (
          this.hostname === window.location.hostname &&
          !this.classList.contains('active')
        ) {
          e.preventDefault();
          transitionToPage(this.href, "fade");
        }
      });
    });
  });

  function transitionToPage(url, type = "fade") {
    document.body.classList.remove("fade-in", "fade-out", "slide-out", "scale-out");
    document.body.classList.add(`${type}-out`);
    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

window.addEventListener("pageshow", () => {
    document.body.classList.add("trans-enter");
    setTimeout(() => {
        document.body.classList.add("trans-enter-active");
        document.body.classList.remove("trans-enter");
    }, 10);
});

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("fade-in");

    // Responsive nav menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
        });
    }

    // Hide nav on link click (mobile)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (
                this.hostname === window.location.hostname &&
                !this.classList.contains('active')
            ) {
                e.preventDefault();
                transitionToPage(this.href, "fade");
            }
            // Hide nav after click on mobile
            if (window.innerWidth <= 768 && nav) {
                nav.classList.remove('active');
            }
        });
    });

    // Optional: close nav if window resized to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && nav) {
            nav.classList.remove('active');
        }
    });
});