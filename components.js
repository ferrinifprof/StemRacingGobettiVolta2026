/* ==========================================================================
   CONFIGURAZIONE MULTILINGUA E PERCORSI - CORRETTA (/en/)
   ========================================================================== */

// 1. Capiamo in che lingua siamo guardando se l'URL contiene '/en/'
const isEnglish = window.location.pathname.includes('/en/');
const lang = isEnglish ? 'en' : 'it';

// 2. Tutte le pagine sono in sottocartelle, quindi risaliamo sempre di un livello
const pathPrefix = '../';

// 3. Dizionario delle traduzioni
const translations = {
    it: {
        home: "Home",
        crew: "Chi siamo",
        what: "Cosa facciamo",
        exp: "Esperienze",
        contact: "Contatti",
        privacy: "Policy per la Privacy",
        credits: "Realizzato dagli studenti con HTML & CSS & JS",
        schoolName: "Istituto Statale di Istruzione Superiore<br> “Piero Gobetti – Alessandro Volta”"
    },
    en: {
        home: "Home",
        crew: "About Us",
        what: "Project & Goals",
        exp: "Experiences",
        contact: "Contact",
        privacy: "Privacy Policy",
        credits: "Developed by students using HTML & CSS & JS",
        schoolName: "ISIS “Piero Gobetti – Alessandro Volta”<br>High School - Florence, Italy"
    }
};

const t = translations[lang];

// 4. Pagina corrente per lo switch
const currentPage = window.location.pathname.split("/").pop() || "index.html";

/* ==========================================================================
   COSTRUZIONE HEADER
   ========================================================================== */

const headerHTML = `
    <header>
        <div class="header-container">
            <button class="menu-btn" id="hamburger">&#9776;</button>
            <img src="${pathPrefix}img/logo_small.png" alt="Logo" class="logo-piccolo">
            
            <div class="logo-text">
                <h1>GOBETTI VOLTA CORSE</h1>
                <p>${isEnglish ? 'Gobetti-Volta Project s.y. 2025/26' : 'Progetto Gobetti-Volta a.s. 2025/26'}</p>
            </div>
            
            <!-- NUOVO CONTENITORE STRUMENTI A DESTRA -->
            <div class="header-tools">
                <div class="header-socials">
                    <a href="https://www.instagram.com/gobettivoltacorse/" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="mailto:gobettivoltacorse@gmail.com"><i class="fas fa-envelope"></i></a>
                </div>
                
                <div class="lang-switch">
                    <a href="${pathPrefix}it/${currentPage}" class="${lang === 'it' ? 'active-lang' : ''}">ITA</a> | 
                    <a href="${pathPrefix}en/${currentPage}" class="${lang === 'en' ? 'active-lang' : ''}">ENG</a>
                </div>
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
   IL RESTO DEL CODICE (footerHTML, mountComponents, initAnimations)
   ========================================================================== */
// (Mantieni le funzioni identiche a prima, assicurandoti solo di usare ${t.credits} ecc. nel footer)

const footerHTML = `
    <footer>
        <div class="footer-container">
            <div class="footer-column">
                <a href="mailto:gobettivoltacorse@gmail.com"><strong>${t.contact}</strong></a><br>
                ${t.schoolName}
            </div>
            <div class="footer-column">
                <strong><a href="privacy-policy.html">${t.privacy}</a></strong><br>
                <span style="font-size:0.7rem">STEM RACING Project - Team Gobetti Volta</span>
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

function mountComponents() {
    document.getElementById('header-placeholder').innerHTML = headerHTML;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;

    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('nav-menu');

    if (btn && menu) {
        btn.onclick = () => menu.classList.toggle('show');
    }

    // Sticky logic
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

    // Active link highlighting
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    initAnimations();
    document.body.style.visibility = 'visible';
}

window.addEventListener('DOMContentLoaded', mountComponents);
