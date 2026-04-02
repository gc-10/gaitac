# GAITAC

Landing page statica one-page in italiano, pensata come base semplice da personalizzare per un professionista, un'attivita o un piccolo brand.

Il progetto non usa framework o build tool: basta modificare HTML, CSS, immagini e JavaScript e pubblicare i file su un hosting statico o Apache.

## Cosa include

- Navbar fissa con navigazione interna tra sezioni
- Menu mobile con apertura/chiusura animata
- Scroll fluido verso le sezioni della pagina
- Evidenziazione del link attivo durante lo scroll
- Form contatti con invio tramite FormSubmit
- Sezione mappa con `iframe` Google Maps
- Footer con contatti, dati sensibili e social opzionali
- File `.htaccess` con redirect HTTPS e header di sicurezza base

## Struttura del progetto

```text
GAITAC/
|-- index.html
|-- .htaccess
|-- styles/
|   |-- style.css
|   `-- style-mobile.css
|-- scripts/
|   |-- main.js
|   |-- effectsScrolling.js
|   `-- notifyForm.js
`-- images/
    |-- logo.png
    |-- logo_footer.png
    `-- social/
        |-- icon-facebook.png
        |-- icon-instagram.png
        `-- icon-whatsapp.png
```

## File principali

- `index.html`: struttura della landing page, contenuti, form, footer e collegamenti agli asset.
- `styles/style.css`: stile desktop, layout generale, gradienti, form e footer.
- `styles/style-mobile.css`: adattamenti responsive e menu mobile.
- `scripts/main.js`: stato iniziale pagina e logica di apertura/chiusura menu mobile.
- `scripts/effectsScrolling.js`: scroll fluido e gestione del link attivo.
- `scripts/notifyForm.js`: invio asincrono del form e messaggio di conferma.
- `.htaccess`: redirect a HTTPS e policy di sicurezza per hosting Apache.

## Avvio locale

Non serve installare dipendenze.

Puoi:

1. aprire `index.html` direttamente nel browser per modifiche semplici;
2. usare un piccolo server statico locale, per esempio:

```powershell
python -m http.server 8000
```

Poi visita `http://localhost:8000`.

## Personalizzazione rapida

Prima di pubblicare, conviene aggiornare questi punti:

### 1. Meta e branding

Modifica in `index.html`:

- `<title>`
- `<meta name="description">`
- logo principale e logo footer
- favicon

Nota: il favicon attuale punta a `img/favicon.png`, ma nel repository esiste la cartella `images/`. Se userai la favicon, allinea il percorso.

### 2. Contenuti delle sezioni

Aggiorna i testi placeholder in:

- `#about`
- `#services`
- `#contacts`
- `#location`

### 3. Form contatti

Il form usa FormSubmit:

```html
<form id="form" action="https://formsubmit.co/postmaster@gaitac.it" method="post">
```

Se vuoi ricevere i messaggi su un altro indirizzo:

- sostituisci l'email nell'attributo `action`;
- aggiorna eventualmente `_subject`;
- testa un invio reale dopo la pubblicazione.

### 4. Mappa

La mappa e incorporata tramite:

```html
https://www.google.com/maps?q=Toscana,Italia&output=embed
```

Puoi sostituire la query con sede, studio o area operativa reale.

### 5. Footer e link legali

Aggiorna:

- email e recapiti
- eventuali numeri di telefono
- link social
- link a privacy e cookie policy

Attualmente `index.html` rimanda a:

- `pages/privacy`
- `pages/cookies`

Queste pagine non sono presenti nel repository, quindi vanno create prima della pubblicazione.

## Nota importante sulla sicurezza HTTP

Il file `.htaccess` applica una Content Security Policy molto restrittiva. Cosi com'e, puo bloccare servizi esterni gia usati nella pagina, in particolare:

- FormSubmit per l'invio del form
- Google Maps nell'`iframe`

Se pubblichi su Apache con `.htaccess` attivo, verifica la policy prima del rilascio.

Un esempio minimo da adattare potrebbe essere:

```apache
Header always set Content-Security-Policy "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; object-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; form-action 'self' https://formsubmit.co; frame-src https://www.google.com https://www.google.com/maps;"
```

Se vuoi mantenere una policy stretta, aggiorna solo i domini davvero necessari.

## Deployment

Per pubblicare il sito:

1. carica tutti i file mantenendo la stessa struttura di cartelle;
2. verifica che il server supporti `.htaccess` se vuoi usare redirect e header Apache;
3. controlla che HTTPS sia attivo;
4. testa menu mobile, form, link interni, mappa e link legali.

## Checklist prima di andare online

- Sostituiti titolo e descrizione
- Inseriti logo e favicon corretti
- Rimossi i testi placeholder
- Aggiornata email del form
- Testato l'invio del messaggio
- Aggiornata la mappa
- Creati i percorsi privacy/cookies
- Verificata la CSP in `.htaccess`
- Controllata la resa su mobile

## Stack

- HTML5
- CSS3
- JavaScript vanilla
- Apache `.htaccess`

## Stato attuale del template

Il repository e gia una buona base funzionante, ma contiene ancora alcuni placeholder e note operative nel markup. Il README quindi va letto come guida di personalizzazione prima del rilascio finale.
