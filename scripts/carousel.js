/* 
Array che contiene tutti i dati delle slide.
Ogni oggetto rappresenta una slide del carosello.
Per ciascuna slide salviamo:
- img: il percorso dell'immagine
- link: il sito da aprire
- alt: il testo alternativo dell'immagine
*/
const slides = [
    {
        imgDesktop: "images/websites/tenutaTigliano.png",
        imgMobile: "images/websites/tenutaTigliano-mobile.png",
        link: "https://www.tenutatigliano.it",
        alt: "Tenuta Tigliano"
    }
    /*
    ,
    {
        img: "images/wesites/immagine2.jpg",
        link: "https://www.sito2.it",
        alt: "Sito 2"
    }
    ,
    {
        img: "images/websites/immagine3.jpg",
        link: "https://www.sito3.it",
        alt: "Sito 3"   
    }*/
];

/* 
Variabile che tiene traccia della slide attualmente visualizzata.
Parte da 0, quindi all'inizio verrà mostrata la prima immagine dell'array.
*/
let indiceAttuale = 0;

/* 
Recupera dall'HTML l'elemento <img> del carosello.
Lo useremo per cambiare dinamicamente immagine e testo alt.
*/
const immagineCarosello = document.getElementById("immagineCarosello");

/* 
Recupera dall'HTML il link/bottone sotto al carosello.
Lo useremo per cambiare dinamicamente l'indirizzo del sito da aprire.
*/
const bottoneLink = document.getElementById("bottoneLink");

/* 
Funzione che aggiorna il contenuto del carosello.
Ogni volta che cambia l'indice, questa funzione:
- cambia l'immagine mostrata
- aggiorna il testo alternativo
- aggiorna il link del bottone
*/
function aggiornaCarosello() {

    const slide = slides[indiceAttuale];
    const schermoPiccolo = window.matchMedia("(max-width: 767px)").matches;

    /* 
    Imposta il percorso dell'immagine corrente.
    Prende il valore img dalla slide corrispondente all'indice attuale.
    */
    immagineCarosello.src = schermoPiccolo ? slide.imgMobile : slide.imgDesktop;

    /* 
    Imposta il testo alternativo dell'immagine corrente.
    Utile per accessibilità e nel caso l'immagine non venga caricata.
    */
    immagineCarosello.alt = slide.alt;

    /* 
    Imposta il link del bottone in base alla slide corrente.
    Così il bottone apre il sito giusto.
    */
    bottoneLink.href = slide.link;
}

/* 
Funzione che cambia slide.
Riceve un parametro chiamato direzione:
- 1 = vai avanti
- -1 = vai indietro
*/
function cambiaSlide(direzione) {

    /* 
    Aggiorna l'indice sommando la direzione.
    Se direzione vale 1 si passa alla slide successiva.
    Se vale -1 si passa alla precedente.
    */
    indiceAttuale += direzione;

    /* 
    Se l'indice scende sotto 0, significa che eravamo sulla prima slide
    e abbiamo cliccato indietro.
    In quel caso andiamo all'ultima slide.
    */
    if (indiceAttuale < 0) {
        indiceAttuale = slides.length - 1;
    }

    /* 
    Se l'indice supera l'ultima posizione disponibile,
    significa che eravamo sull'ultima slide e abbiamo cliccato avanti.
    In quel caso torniamo alla prima slide.
    */
    if (indiceAttuale >= slides.length) {
        indiceAttuale = 0;
    }

    /* 
    Dopo aver aggiornato l'indice, aggiorniamo immagine e link visibili.
    */
    aggiornaCarosello();
}

/* 
Richiama subito la funzione all'avvio della pagina.
Serve per mostrare immediatamente la prima immagine e impostare il primo link.
Senza questa riga, all'inizio il carosello resterebbe vuoto.
*/
aggiornaCarosello();

window.addEventListener("resize", aggiornaCarosello);
