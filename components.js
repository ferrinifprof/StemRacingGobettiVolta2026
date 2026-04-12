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
                Istituto Statale di Istruzione Superiore<br> “Piero Gobetti – Alessandro Volta”
            </div>
            <div class="footer-column">
                <strong><a href="privacy-policy.html">Privacy Policy</a></strong><br>
                <span>Progetto didattico a cura degli studenti del TEAM dell'istituto GOBETTI VOLTA che partecipano al progetto STEM RACING</span>
            </div>
            <div class="footer-column">
                © 2026 Realizzato dagli studenti<br> con HTML & CSS & JS
            </div>
        </div>
    </footer>
`;

// 1. IL SENSORE DELLE ANIMAZIONI
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Rimuove la classe quando esci (così l'effetto si ripete tornando su)
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

// 2. IL MONTAGGIO DEI PEZZI
function mountComponents() {
    const hPlaceholder = document.getElementById('header-placeholder');
    const fPlaceholder = document.getElementById('footer-placeholder');

    if (hPlaceholder) hPlaceholder.innerHTML = headerHTML;
    if (fPlaceholder) fPlaceholder.innerHTML = footerHTML;

    // ATTIVAZIONE HAMBURGER (Solo dopo che l'header è stato iniettato!)
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('nav-menu');

    if (btn && menu) {
        btn.onclick = function() {
            menu.classList.toggle('show');
            btn.innerHTML = menu.classList.contains('show') ? '&times;' : '&#9776;';
        };
        
        // Chiudi menu al click sui link
        document.querySelectorAll('#nav-menu a').forEach(link => {
            link.onclick = () => {
                menu.classList.remove('show');
                btn.innerHTML = '&#9776;';
            };
        });
    }

    // ATTIVAZIONE ANIMAZIONI
    initAnimations();

    // ACCENDI LE LUCI
    document.body.style.visibility = 'visible';
}

window.addEventListener('DOMContentLoaded', mountComponents);
