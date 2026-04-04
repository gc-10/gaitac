# GAITAC

GAITAC e una landing page statica in italiano, pensata per presentare un professionista, un'attivita o un piccolo brand in modo chiaro e pulito.

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

## Come aprirlo in locale

Per modifiche rapide puoi aprire direttamente `index.html` nel browser.

Se preferisci usare un server locale:

```powershell
python -m http.server 8000
```

Poi apri `http://localhost:8000`.

## Cosa conviene personalizzare subito

In `index.html` ti consiglio di aggiornare queste cose per prime:

- titolo e descrizione della pagina
- logo, favicon e immagini
- testi delle sezioni
- email del form contatti
- link social e dati nel footer
- posizione della mappa

## Note utili prima di pubblicare

- Il form invia i messaggi tramite FormSubmit: se vuoi riceverli su un'altra email, cambia l'`action` del form.
- La mappa usa Google Maps con un `iframe`: puoi sostituire la localita attuale con quella reale.
- I link `pages/privacy` e `pages/cookies` sono presenti nel footer, ma le relative pagine non sono nel repository: vanno create prima della pubblicazione.
- Il file `.htaccess` contiene una Content Security Policy piuttosto rigida. Se lasci attivi FormSubmit e Google Maps, potrebbe essere necessario aggiornarla.

## Pubblicazione

Per mettere online il sito:

1. carica i file mantenendo la struttura delle cartelle;
2. verifica che il server supporti `.htaccess`, se vuoi usare quelle regole;
3. controlla che il form, la mappa e i link funzionino davvero;
4. fai un ultimo test da mobile.

## In breve

Questo progetto e una buona base pronta da personalizzare. Se vuoi usarlo davvero online, il passaggio importante non e "installare qualcosa", ma rifinire contenuti, immagini, contatti e dettagli legali.
