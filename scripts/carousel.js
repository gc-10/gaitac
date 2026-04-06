/*
Array che contiene tutti i dati delle slide.
Ogni oggetto rappresenta una slide del carosello e per ciascuna slide salviamo:
- img: il percorso dell'immagine da mostrare al centro;
- sfondo: lo sfondo del carosello;
- link: il sito da aprire;
- alt: il testo alternativo dell'immagine.
*/
const slides = [
    {
        img: "images/websites/tenutaTigliano.png",
        sfondo: "white",
        link: "https://www.tenutatigliano.it",
        alt: "Tenuta Tigliano"
    }
    /* Si tengono le immagini, nel caso si vogliano mettere altri siti in futuro (DA CAMBIARE ROBA ALL'INTERNO 🛑🛑🛑)
    ,
    {
        img: "images/websites/immagine2.jpg",
        sfondo: "#d9d9d9",
        link: "https://www.sito2.it",
        alt: "Sito 2"
    }
    ,
    {
        img: "images/websites/immagine3.jpg",
        sfondo: "url('images/websites/sfondo3.jpg') center/cover no-repeat",
        link: "https://www.sito3.it",
        alt: "Sito 3"
    }*/
];

/*
Variabile che tiene traccia della slide attualmente visualizzata.
Parte da 0, quindi all'inizio verra mostrata la prima immagine dell'array.
*/
let indiceAttuale = 0;

// Recupera dall'HTML il contenitore del carosello e verrà utilizzato per cambiare dinamicamente lo sfondo.
const carosello = document.querySelector(".carosello");

// Recupera dall'HTML l'elemento <img> del carosello e verrà utilizzato per cambiare dinamicamente immagine e testo alt.
const immagineCarosello = document.getElementById("immagineCarosello");

// Recupera dall'HTML il link/bottone sotto al carosello e verrà utilizzato per cambiare dinamicamente l'indirizzo del sito da aprire.
const bottoneLink = document.getElementById("bottoneLink");

/*
Funzione che aggiorna il contenuto del carosello; ogni volta che cambia l'indice, questa funzione:
- cambia l'immagine mostrata;
- aggiorna il testo alternativo;
- aggiorna il link del bottone;
- aggiorna lo sfondo del carosello.
*/
function aggiornaCarosello() {
    const slide = slides[indiceAttuale];

    immagineCarosello.src = slide.img;
    immagineCarosello.alt = slide.alt;
    bottoneLink.href = slide.link;
    carosello.style.background = slide.sfondo;
}

/*
Funzione che cambia slide.
Riceve un parametro chiamato direzione:
- 1 = vai avanti;
- -1 = vai indietro.
*/
function cambiaSlide(direzione) {
    indiceAttuale += direzione;

    if (indiceAttuale < 0) {
        indiceAttuale = slides.length - 1;
    }

    if (indiceAttuale >= slides.length) {
        indiceAttuale = 0;
    }

    aggiornaCarosello();
}

/*
Richiama subito la funzione all'avvio della pagina.
Serve per mostrare immediatamente la prima immagine e impostare il primo link.
*/
aggiornaCarosello();
