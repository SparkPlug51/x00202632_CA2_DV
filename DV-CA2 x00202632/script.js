// Custom JS for portfolio site

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.navbar a.nav-link[href^="#"]');
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const navbar = document.querySelector(".navbar");

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                event.preventDefault();

                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - (navbarHeight - 10);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight active nav link based on scroll position
    const setActiveLink = () => {
        const scrollPos = window.pageYOffset;
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        let currentSectionId = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 40;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            const linkTarget = link.getAttribute("href").substring(1);
            if (linkTarget === currentSectionId) {
                link.classList.add("active-section");
            } else {
                link.classList.remove("active-section");
            }
        });
    };

    window.addEventListener("scroll", setActiveLink);
    setActiveLink(); // run once on load
});

// Auto-update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Copy-to-clipboard for contact modal
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".copy-btn");
  if (!btn) return;

  const text = btn.getAttribute("data-copy") || "";
  const status = document.getElementById("copyStatus");

  const setStatus = (msg) => { if (status) status.textContent = msg; };

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    const old = btn.textContent;
    btn.textContent = "Copied!";
    setStatus(`Copied: ${text}`);

    setTimeout(() => {
      btn.textContent = old;
      setStatus("");
    }, 1200);
  } catch {
    setStatus("Could not copy — please copy manually.");
  }
});