# GAITAC

GAITAC e una landing page statica in italiano, pensata per presentare dei progetti di sviluppo WEB.

Non ci sono dipendenze da installare e non serve nessun framework: qui si lavora direttamente su HTML, CSS, immagini e JavaScript.

## Cosa trovi dentro

- una pagina unica con navigazione tra sezioni
- menu mobile
- scroll fluido
- carosello progetti
- form contatti con FormSubmit
- mappa Google Maps
- file `.htaccess` per redirect HTTPS e alcune regole base di sicurezza

## File principali

- `index.html`: struttura della pagina e contenuti
- `styles/style.css`: stile principale
- `styles/style-mobile.css`: adattamenti per mobile
- `scripts/main.js`: logica base del menu
- `scripts/effectsScrolling.js`: scroll e link attivi
- `scripts/notifyForm.js`: gestione del form
- `scripts/carousel.js`: carosello dei progetti

Poi apri `http://localhost:8000`.

## Note utili prima di pubblicare

- Il form invia i messaggi tramite FormSubmit.
- La mappa usa Google Maps con un `iframe`.
- I link `pages/privacy` e `pages/cookies` sono presenti nel footer.
- Il file `.htaccess` contiene una Content Security Policy piuttosto rigida. 

