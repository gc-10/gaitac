// Comportamento iniziale della pagina.
window.onload = function () {
    /*
    Si porta la pagina in cima al caricamento, per non rimanere a metà durante l'avvio.
    Al browser viene detto di non ripristinare automaticamente la posizione di scroll quando si carica o ricarica questa pagina.
    */
    history.scrollRestoration = 'manual';

    // All'inizio, metto l'elemento #about colorato di rosso per predefinito sia del menu desktop che di quello mobile.
    const aboutLink = document.querySelector('.navbar-2 a[href="#about"]');
    const mobileAboutLink = document.querySelector('.mobile-menu a[href="#about"]');
    if (aboutLink) {
        aboutLink.classList.add('active');
    }
    if (mobileAboutLink) {
        mobileAboutLink.classList.add('active');
    }
    // Al caricamento della pagina diamo l'effetto in ingresso dal basso verso l'alto della navar e delle sezioni interne.
    document.body.classList.add('page-loaded');
};



// Gestione apertura e chiusura del menu mobile.
const toggleButton = document.querySelector('.menu-toggle');   // Selezioniamo il pulsante che apre e chiude il menu mobile.
const mobileMenu = document.querySelector('.mobile-menu');   // Selezioniamo il contenitore del menu mobile.

// Aggiungiamo un event listener al pulsante e ogni volta che l'utente clicca sul bottone, eseguiamo la funzione.
toggleButton.addEventListener('click', () => {
    /* 
    Verifichiamo lo stato attuale PRIMA di cambiarlo.
    Controlla se il menu non ha ancora la classe open.
    Se non ce l’ha, isOpening diventa true, quindi significa che il prossimo click lo sta per aprire. 
    */
    const isOpening = !mobileMenu.classList.contains('open');

    // Se isOpening è true, significa che stiamo per aprire il menu, altrimenti lo stiamo per chiudere.
    if (isOpening) {
        // LOGICA APERTURA.
        mobileMenu.classList.remove('closing');
        mobileMenu.classList.add('open');
    } else {
        // LOGICA CHIUSURA.
        mobileMenu.classList.remove('open');
        mobileMenu.classList.add('closing');

        // Aspettiamo la fine dell'animazione (400ms) prima di togliere tutto.
        setTimeout(() => {
            mobileMenu.classList.remove('closing');
        }, 400); 
    }
    // Gestione pulsante in base allo stato se è aperto o chiuso per cambiare il valore del pulsante stesso.
    toggleButton.textContent = isOpening ? '✖' : '☰';
    toggleButton.classList.add('changing');
    toggleButton.setAttribute('aria-expanded', isOpening);

    setTimeout(() => {
        toggleButton.textContent = isOpening ? '✕' : '☰';
        toggleButton.classList.remove('changing');
    }, 150);
});


// Funzione che chiude il menu mobile.
function closeMobileMenu() {
    // Rimuoviamo la classe 'open' per far partire la chiusura del menu.
    mobileMenu.classList.remove('open');

    // Aggiungiamo la classe 'closing' per applicare l'animazione di chiusura del menu.
    mobileMenu.classList.add('closing');

    // Aggiorniamo aria-expanded a false perché il menu sta per chiudersi.
    toggleButton.setAttribute('aria-expanded', 'false');

    // Applichiamo la classe che anima il pulsante.
    toggleButton.classList.add('changing');

    // Dopo un piccolo ritardo cambiamo la X nell'icona del menu.
    setTimeout(() => {
        toggleButton.textContent = '☰';
        toggleButton.classList.remove('changing');
    }, 150);

    // Aspettiamo la fine dell'animazione del menu prima di togliere la classe 'closing'.
    setTimeout(() => {
        mobileMenu.classList.remove('closing');
    }, 400);
}

// Selezioniamo tutti i link presenti dentro il menu mobile in modo da poterli gestire e chiudere il menu con un effetto dopo il click sui link.
document.querySelectorAll('.mobile-menu a').forEach(link => {
    // Per ogni link aggiungiamo un event listener sul click.
    link.addEventListener('click', () => {
        // Aspettiamo mezzo secondo prima di chiudere il menu mobile.
        setTimeout(() => {
            // Dopo 200ms richiamiamo la funzione che chiude il menu in modo da avere il menu animato.
            closeMobileMenu();
        }, 200);
    });
});
