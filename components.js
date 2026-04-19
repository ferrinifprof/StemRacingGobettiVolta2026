const headerHTML = `
    <header>
        <div class="header-container">
            <button class="menu-btn" id="hamburger">&#9776;</button>
            <img src="img/logo_small.png" alt="Logo" class="logo-piccolo">
            <div class="logo-text">
                <h1>GOBETTI VOLTA CORSE</h1>
                <p>Progetto Gobetti-Volta a.s. 2025/26</p>
            </div>
            
            <!-- SPOSTATE QUI: Accanto al logo grande -->
            <div class="header-socials">
                <a href="https://www.instagram.com/gobettivoltacorse/" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="mailto:gobettivoltacorse@gmail.com"><i class="fas fa-envelope"></i></a>
            </div>

            <img src="img/logo_large.png" alt="Logo Esteso" class="logo-grande">
        </div>
    </header>
    <nav id="navbar-sticky">
        <ul id="nav-menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="Pag1.html">Chi siamo</a></li>
            <li><a href="Pag2.html">Cosa facciamo</a></li>
            <li><a href="Pag3.html">Esperienze</a></li>
        </ul>
    </nav>
`;

const footerHTML = `
    <footer>
        <div class="footer-container">
            <div class="footer-column">
                <a href="mailto:gobettivoltacorse@gmail.com"><strong>Contatti</strong></a><br>
                Istituto Statale di Istruzione Superiore<br>
                “Piero Gobetti – Alessandro Volta”
            </div>
            <div class="footer-column">
                <strong><a href="privacy-policy.html">Policy per la Privacy</a></strong><br>
                <span>Progetto didattico a cura degli studenti del TEAM dell'istituto<br> GOBETTI VOLTA che partecipano al progetto STEM RACING</span>
            </div>
            <div class="footer-column">
                <strong>© 2026</strong><br>
                <span>Realizzato dagli studenti con HTML & CSS & JS</span>
                   <div class="footer-socials">
                    <a href="https://www.instagram.com/gobettivoltacorse/" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="mailto:gobettivoltacorse@gmail.com"><i class="fas fa-envelope"></i></a>
                </div>
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
    const hPlaceholder = document.getElementById('header-placeholder');
    const fPlaceholder = document.getElementById('footer-placeholder');

    if (hPlaceholder) hPlaceholder.innerHTML = headerHTML;
    if (fPlaceholder) fPlaceholder.innerHTML = footerHTML;

    // --- LOGICA MENU HAMBURGER ---
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('nav-menu');
    if (btn && menu) {
        btn.onclick = () => menu.classList.toggle('show');
    }

    // --- LOGICA MENU STICKY DINAMICO (Stile Duca Pipe) ---
    const navElement = document.querySelector('nav');
    const headerElement = document.querySelector('header');
    
    // Calcoliamo l'altezza totale (header + nav) oltre la quale il menu deve riapparire
    const soglia = headerElement.offsetHeight + navElement.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > soglia) {
            // Se abbiamo superato l'header, aggiungi la classe per farlo riapparire fisso
            navElement.classList.add('fixed-nav');
        } else {
            // Se torniamo in cima, torna allo stato normale
            navElement.classList.remove('fixed-nav');
        }
    });
    const links = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname.split("/").pop();
    const currentPage = (currentPath === "" || currentPath === "index.html") ? "index.html" : currentPath;

    links.forEach(link => {
        // Se il link corrisponde alla pagina attuale, aggiungi la classe 'active'
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    initAnimations();
    document.body.style.visibility = 'visible';
}       

window.addEventListener('DOMContentLoaded', mountComponents);
