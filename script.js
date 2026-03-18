document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        
        htmlElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeIcon.textContent = '☀️';
            themeToggleBtn.innerHTML = '<span id="theme-icon">☀️</span> Light Mode';
        }
    } else {
        // Option to check OS preference (uncomment if you want default OS theme picking)
        /*
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        if (prefersDarkScheme.matches) {
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.innerHTML = '<span id="theme-icon">☀️</span> Light Mode';
        }
        */
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = htmlElement.getAttribute('data-theme');
        if (theme === 'dark') {
            
            htmlElement.removeAttribute('data-theme');
            themeToggleBtn.innerHTML = '<span id="theme-icon">🌙</span> Dark Mode';
            localStorage.setItem('theme', 'light');
        } else {
            
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.innerHTML = '<span id="theme-icon">☀️</span> Light Mode';
            localStorage.setItem('theme', 'dark');
        }
    });

    
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent standard page reload
            const data = new FormData(event.target);
            
            try {
                const response = await fetch(event.target.action, {
                    method: contactForm.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                    formStatus.style.color = "var(--primary-color)";
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    if (Object.hasOwn(errorData, 'errors')) {
                        formStatus.textContent = errorData["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = "Oops! There was a problem submitting your form";
                    }
                    formStatus.style.color = "red";
                }
            } catch (error) {
                formStatus.textContent = "Oops! There was a problem submitting your form";
                formStatus.style.color = "red";
            }
        });
    }
});
