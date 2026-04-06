// Selezioniamo tutti i link presenti dentro la parte destra della navbar che puntano alle varie sezioni della pagina e nel menu a tendina.
const navLinks = document.querySelectorAll('.navbar-2 a, .mobile-menu a');

// Selezioniamo tutte le sezioni principali da monitorare durante lo scroll.
const sections = document.querySelectorAll('.section-page');

// Funzione unica per aggiornare il link attivo nel menu desktop e mobile.
function setActiveLink(targetId) {
    // Rimuoviamo la classe "active" e l'attributo "aria-current" da tutti i link.
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });

    /* 
    Aggiungiamo la classe "active" e l'attributo "aria-current" solo ai link che corrispondono alla sezione attiva.
    Il fatto che sia attiva sia nella navbar desktop che in quella mobile è gestito dal selettore CSS che cerca entrambi i contesti. 
    */
    document.querySelectorAll(`.navbar-2 a[href="#${targetId}"], .mobile-menu a[href="#${targetId}"]`).forEach(link => {
        link.classList.add('active');
        link.setAttribute('aria-current', 'location');
    });
}

// Per ogni link del menu aggiungiamo la gestione dello scroll fluido al click.
navLinks.forEach(anchor => {

    /* 
    Per ogni link del navbar e del menu mobile aggiungiamo un listener sul click.
    Quando l'utente clicca, eseguiamo uno scroll personalizzato invece di lasciare fare al browser il comportamento standard dell'ancoraggio.
    */
    anchor.addEventListener('click', function (e) {
        /* 
        Blocchiamo il comportamento normale del link.
        Senza questa riga, il browser farebbe subito il salto diretto alla sezione, annullando l'effetto di scroll graduale che vogliamo ottenere.
        */
        e.preventDefault();

        // Recuperiamo l'href del link cliccato.
        const targetId = this.getAttribute('href');

        // Se il link non punta a una sezione interna, interrompiamo la logica personalizzata.
        if (!targetId || !targetId.startsWith('#')) {
            return;
        }

        // Aggiorniamo subito il link attivo quando l'utente clicca.
        setActiveLink(targetId.replace('#', ''));

        // Cerchiamo nell'HTML l'elemento che corrisponde a quell'id.
        const targetElement = document.querySelector(targetId);
        
        /* 
        Controlliamo che l'elemento esista davvero prima di procedere.
        Questo evita errori nel caso in cui il link punti a un id inesistente.
        */
        if (targetElement) {
 
            /*
            Selezioniamo la navbar per misurarne l'altezza reale in pixel.
            Usiamo `offsetHeight` perché restituisce l'altezza completa dell'elemento visibile.
            */
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            /* 
            Avviamo la funzione di scroll lento, costruita sotto, con i parametri passati:
            - `targetElement`: la sezione verso cui vogliamo andare;
            - `700`: la durata dell'animazione in millisecondi;
            - `navbarHeight`: l'offset da sottrarre per non coprire il contenuto con la navbar.
            */
            smoothScrollTo(targetElement, 700, navbarHeight);
        }
    });
});

// Durante lo scroll a mano aggiorniamo il link attivo in base alla sezione visibile colorando il link corrispondente.
function updateActiveLinkOnScroll() {
    // Calcoliamo un punto di riferimento che si trova appena sotto la navbar fissa.
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;   // Se la navbar non esiste, usiamo 0 per evitare errori, altrimenti usiamo la sua altezza reale.
    const referencePoint = window.scrollY + navbarHeight + 1;   // Aggiungiamo 1 pixel per assicurarci di superare la linea della navbar e considerare la sezione come attiva solo quando è effettivamente visibile.

    let currentSectionId = '';   // Variabile per tenere traccia dell'id della sezione attiva.

    // Iteriamo su tutte le sezioni per trovare quella attiva in base al punto di riferimento.
    sections.forEach(section => {
        // Se il punto di riferimento è maggiore o uguale alla posizione superiore della sezione, consideriamo quella sezione come attiva.
        if (referencePoint >= section.offsetTop) {   // offsetTop restituisce la distanza in pixel tra la parte superiore della sezione e la parte superiore del documento.
            currentSectionId = section.id;
        }
    });

    // Se abbiamo trovato una sezione attiva, aggiorniamo i link del menu con l'id della sezione.
    if (currentSectionId) {
        setActiveLink(currentSectionId);
    }
}

// Aggiungiamo i listener per aggiornare il link attivo durante lo scroll, quando la finestra viene ridimensionata (per ricalcolare le posizioni) e al caricamento della pagina (per impostare correttamente il link attivo se si parte da una posizione non in cima).
window.addEventListener('scroll', updateActiveLinkOnScroll, { passive: true });
window.addEventListener('resize', updateActiveLinkOnScroll);
window.addEventListener('load', updateActiveLinkOnScroll);

/* 
Funzione che realizza manualmente uno scroll animato verso un elemento; i parametri sono:
- `element`: elemento HTML destinazione;
- `duration`: durata totale dell'animazione in millisecondi;
- `offset`: spazio da sottrarre alla destinazione finale (serve per compensare l'altezza della navbar fissa). 
*/
function smoothScrollTo(element, duration, offset) {

    /*
    Salviamo la posizione verticale attuale della pagina al momento del click, cioè la posizione di partenza dell'animazione.
    `window.pageYOffset` indica quanti pixel abbiamo già scrollato dall'alto. 
    */
    const startPosition = window.pageYOffset;

    /* 
    Calcoliamo la posizione finale da raggiungere.
    `element.getBoundingClientRect().top` restituisce la distanza tra l'elemento e la parte visibile alta della finestra.
    Sommando `startPosition`, trasformiamo quella distanza in una posizione assoluta rispetto all'intera pagina.
    Infine sottraiamo `offset` per tenere conto della navbar fissa; così la sezione si fermerà subito sotto la barra, non dietro.
    */
    const targetPosition = element.getBoundingClientRect().top + startPosition - offset;

    /*
    Calcoliamo di quanti pixel in totale ci dobbiamo spostare.
    Se il numero è positivo, stiamo andando verso il basso, altrimenti stiamo andando verso l'alto.
    */
    const distance = targetPosition - startPosition;

    // Variabile che conterrà il tempo iniziale dell'animazione; all'inizio è `null` perché il primo frame non è ancora partito.
    let startTime = null;

    /*
    Funzione interna che verrà richiamata più volte da `requestAnimationFrame`.
    `currentTime` è un timestamp automatico fornito dal browser.
    */
    function animation(currentTime) {

        // Al primo frame salviamo il tempo di partenza perchè ci permetterà di sapere in seguito quanto tempo è passato.
        if (startTime === null) startTime = currentTime;

        // Calcoliamo quanto tempo è trascorso dall'inizio dell'animazione.
        const timeElapsed = currentTime - startTime;
        
        /*
        Calcoliamo la nuova posizione da raggiungere in questo frame.
        La funzione `ease(...)` non restituisce direttamente "quanto manca", ma la posizione esatta in cui la pagina deve stare in questo momento, creando un movimento morbido che accelera e poi rallenta.
        */
        const run = ease(timeElapsed, startPosition, distance, duration);
        
        /*
        Spostiamo effettivamente la pagina alla posizione calcolata.
        `0` indica che non cambiamo l'asse orizzontale e `run` è il nuovo valore verticale.
        */
        window.scrollTo(0, run);
        
        // Se non abbiamo ancora raggiunto la durata totale dell'animazione, chiediamo al browser di eseguire un nuovo frame; questo crea il movimento progressivo.
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    /*
    Funzione di easing che serve a rendere il movimento più naturale, cioè invece di andare a velocità costante, parte più dolcemente, accelera nella parte centrale e rallenta prima di fermarsi; i parametri sono:
    - `t`: tempo trascorso;
    - `b`: posizione iniziale;
    - `c`: distanza totale da percorrere;
    - `d`: durata totale.
    */
    function ease(t, b, c, d) {

        // Normalizziamo il tempo dividendolo per metà durata; questo ci permette di gestire separatamente la prima metà dell'animazione e la seconda metà.
        t /= d / 2;

        // Prima metà dell'animazione: il movimento accelera in modo graduale.
        if (t < 1) return c / 2 * t * t + b;

        // Seconda metà dell'animazione: il movimento rallenta gradualmente fino a fermarsi.
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    /*
    Avviamo l'animazione chiedendo al browser il primo frame.
    Da qui in poi la funzione `animation(...)` verrà richiamata più volte fino a completare lo scroll.
    */
    requestAnimationFrame(animation);
}
