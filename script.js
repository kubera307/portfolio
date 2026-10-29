/* =========================================================
   KUBERA B — PORTFOLIO INTERACTION LOGIC
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------------------
       1. MOBILE MENU TOGGLE
    --------------------------------------------------------- */
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isActive = navLinks.classList.toggle("active");
            menuBtn.setAttribute("aria-expanded", String(isActive));
            menuBtn.textContent = isActive ? "✕" : "☰";
        });

        // Close mobile menu after clicking any nav link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.textContent = "☰";
            });
        });
    }

    /* ---------------------------------------------------------
       2. SCROLL REVEAL ANIMATIONS
    --------------------------------------------------------- */
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

    /* ---------------------------------------------------------
       3. NAVBAR ACTIVE SECTION HIGHLIGHT & BACKGROUND
    --------------------------------------------------------- */
    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a:not(.nav-cta)");

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar blur and border opacity
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.background = "rgba(7, 10, 16, 0.95)";
                navbar.style.borderColor = "rgba(255, 255, 255, 0.14)";
                navbar.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.6)";
            } else {
                navbar.style.background = "rgba(7, 10, 16, 0.82)";
                navbar.style.borderColor = "rgba(255, 255, 255, 0.08)";
                navbar.style.boxShadow = "0 15px 50px rgba(0, 0, 0, 0.4)";
            }
        }

        // Active link spy
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });

        // Back to top button visibility
        const backToTopBtn = document.getElementById("backToTop");
        if (backToTopBtn) {
            if (scrollY > 350) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    /* ---------------------------------------------------------
       4. BACK TO TOP BUTTON
    --------------------------------------------------------- */
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ---------------------------------------------------------
       5. DYNAMIC FOOTER YEAR
    --------------------------------------------------------- */
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ---------------------------------------------------------
       6. COPY EMAIL QUICK ACTION
    --------------------------------------------------------- */
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", async () => {
            const email = "kkubera307@gmail.com";
            try {
                await navigator.clipboard.writeText(email);
                const originalText = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = "✓ Copied!";
                copyEmailBtn.style.borderColor = "var(--green)";
                copyEmailBtn.style.color = "var(--green)";
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalText;
                    copyEmailBtn.style.borderColor = "";
                    copyEmailBtn.style.color = "";
                }, 2000);
            } catch (err) {
                window.location.href = `mailto:${email}`;
            }
        });
    }

});
