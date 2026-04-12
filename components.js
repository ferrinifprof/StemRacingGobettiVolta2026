const headerHTML = `
    <header>
        <div class="header-container">
            <button class="menu-btn" id="hamburger">&#9776;</button>
            <img src="img/logo_small.png" alt="Logo" class="logo-piccolo">
            <div class="logo-text">
                <h1>GOBETTI VOLTA CORSE</h1>
                <p>Progetto Gobetti-Volta a.s. 2025/26</p>
            </div>
            <img src="img/logo_large.png" alt="Logo Esteso" class="logo-grande">
        </div>
    </header>
    <nav>
        <ul id="nav-menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="Pag1.html">Chi siamo</a></li>
            <li><a href="Pag2.html">Cosa facciamo e obiettivi</a></li>
            <li><a href="Pag3.html">Esperienze</a></li>
        </ul>
    </nav>
`;

const footerHTML = `
    <footer>
        <div class="footer-container">
            <div class="footer-column">
                <a href="mailto:gobettivoltacorse@gmail.com"><strong>Contatti</strong></a><br>
                ISIS Gobetti-Volta
            </div>
            <div class="footer-column">
                <strong><a href="privacy-policy.html">Privacy Policy</a></strong><br>
                <span>Progetto didattico STEM RACING</span>
            </div>
            <div class="footer-column">
                © 2026 Realizzato dagli studenti
            </div>
        </div>
    </footer>
`;

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.05 }); // Soglia molto bassa per attivazione immediata

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

function mountComponents() {
    document.getElementById('header-placeholder').innerHTML = headerHTML;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;

    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('nav-menu');

    if (btn && menu) {
        btn.onclick = () => menu.classList.toggle('show');
    }

    initAnimations();
    document.body.style.visibility = 'visible';
}

window.addEventListener('DOMContentLoaded', mountComponents);
