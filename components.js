/* ==========================================================================
   CONFIGURAZIONE MULTILINGUA E PERCORSI
   ========================================================================== */

// 1. Capiamo in che lingua siamo guardando la cartella nell'URL
const isEnglish = window.location.pathname.includes('/en/');
const lang = isEnglish ? 'eng' : 'ita';

// 2. Poiché i file HTML sono dentro /it/ o /en/, per uscire e trovare 
// le cartelle CSS, img e il file components.js dobbiamo sempre usare '../'
const pathPrefix = '../';

// 3. Dizionario delle traduzioni
const translations = {
    ita: {
        home: "Home",
        crew: "Chi siamo",
        what: "Cosa facciamo",
        exp: "Esperienze",
        contact: "Contatti",
        privacy: "Policy per la Privacy",
        usefulLinks: "Link Utili",
        credits: "Realizzato dagli studenti con HTML & CSS & JS",
        projectDesc: "Progetto didattico a cura degli studenti del TEAM dell'istituto GOBETTI VOLTA che partecipano al progetto STEM RACING",
        schoolName: "Istituto Statale di Istruzione Superiore<br> “Piero Gobetti – Alessandro Volta”"
    },
    eng: {
        home: "Home",
        crew: "About Us",
        what: "Project & Goals",
        exp: "Experiences",
        contact: "Contact Us",
        privacy: "Privacy Policy",
        usefulLinks: "Useful Links",
        credits: "Developed by students using HTML, CSS & JS",
        projectDesc: "Educational project curated by the GOBETTI VOLTA team students participating in the STEM RACING project",
        schoolName: "Piero Gobetti – Alessandro Volta<br>High School - Florence, Italy"
    }
};

const t = translations[lang];

// 4. Determiniamo il nome della pagina corrente per lo switch della lingua
// (es. se sono in Pag1.html, lo switch mi manderà alla Pag1.html dell'altra lingua)
const currentPage = window.location.pathname.split("/").pop() || "index.html";

/* ==========================================================================
   COSTRUZIONE HEADER (DINAMICO)
   ========================================================================== */

const headerHTML = `
    <header>
        <div class="header-container">
            <button class="menu-btn" id="hamburger">&#9776;</button>
            <img src="${pathPrefix}img/logo_small.png" alt="Logo" class="logo-piccolo">
            <div class="logo-text">
                <h1>GOBETTI VOLTA CORSE</h1>
                <p>${isEnglish ? 'Gobetti-Volta Project school year 2025/26' : 'Progetto Gobetti-Volta anno scolastico 2025/26'}</p>
            </div>
            
            <div class="header-socials">
                <div class="lang-switch">
                    <a href="${pathPrefix}it/${currentPage}" class="${lang === 'ita' ? 'active-lang' : ''}">ITA</a> | 
                    <a href="${pathPrefix}en/${currentPage}" class="${lang === 'eng' ? 'active-lang' : ''}">ENG</a>
                </div>
                <a href="https://www.instagram.com/gobettivoltacorse/" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="mailto:gobettivoltacorse@gmail.com"><i class="fas fa-envelope"></i></a>
            </div>

            <img src="${pathPrefix}img/logo_large.png" alt="Logo Esteso" class="logo-grande">
        </div>
    </header>
    <nav id="navbar-sticky">
        <ul id="nav-menu">
            <li><a href="index.html">${t.home}</a></li>
            <li><a href="Pag1.html">${t.crew}</a></li>
            <li><a href="Pag2.html">${t.what}</a></li>
            <li><a href="Pag3.html">${t.exp}</a></li>
        </ul>
    </nav>
`;

/* ==========================================================================
   COSTRUZIONE FOOTER (DINAMICO)
   ========================================================================== */

const footerHTML = `
    <footer>
        <div class="footer-container">
            <div class="footer-column">
                <a href="mailto:gobettivoltacorse@gmail.com"><strong>${t.contact}</strong></a><br>
                ${t.schoolName}
            </div>
            <div class="footer-column">
                <a href="privacy-policy.html"><strong>${t.privacy}</strong></a><br>
                <span>${t.projectDesc}</span>
            </div>
            <div class="footer-column">
                <strong>© 2026</strong><br>
                <span>${t.credits}</span>
                <div class="footer-socials">
                    <a href="https://www.instagram.com/gobettivoltacorse/" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="mailto:gobettivoltacorse@gmail.com"><i class="fas fa-envelope"></i></a>
                </div>
            </div>
        </div>
    </footer>
`;

/* ==========================================================================
   FUNZIONI DI LOGICA (ANIMAZIONI, SCROLL, MONTAGGIO)
   ========================================================================== */

// Funzione per l'effetto "parcheggio" degli elementi
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.05 });
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

// Funzione principale che monta i pezzi
function mountComponents() {
    const hPlaceholder = document.getElementById('header-placeholder');
    const fPlaceholder = document.getElementById('footer-placeholder');

    if (hPlaceholder) hPlaceholder.innerHTML = headerHTML;
    if (fPlaceholder) fPlaceholder.innerHTML = footerHTML;

    // Logica Menu Hamburger
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('nav-menu');
    if (btn && menu) {
        btn.onclick = () => menu.classList.toggle('show');
    }

    // Logica Sticky Nav con riga oro (Stile Duca Pipe)
    const navElement = document.querySelector('nav');
    const headerElement = document.querySelector('header');
    if (navElement && headerElement) {
        const soglia = headerElement.offsetHeight;
        window.addEventListener('scroll', () => {
            if (window.scrollY > soglia) {
                navElement.classList.add('fixed-nav');
            } else {
                navElement.classList.remove('fixed-nav');
            }
        });
    }

    // Evidenzia la voce di menu della pagina attuale
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Avvia le animazioni e mostra il sito
    initAnimations();
    document.body.style.visibility = 'visible';
}

// Eseguiamo tutto al caricamento del DOM
window.addEventListener('DOMContentLoaded', mountComponents);
