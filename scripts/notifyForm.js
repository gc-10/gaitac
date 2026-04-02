/* Aggiunta di un listener relativo al formo di contatto, quando il DOM è completamente caricato per assicurarsi che gli elementi siano disponibili. */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const headerText = document.querySelector("#formContattaci > p");   // Si prende il testo "Scrivici pure, risponderemo il prima possibile" per poterlo modificare in caso di invio corretto del messaggio.

    // Verifico che il form e il testo siano presenti prima di aggiungere l'event listener.
    if(form && headerText){
        /* Aggiungo un event listener per l'evento "submit" del form.
           Quando il form viene inviato, blocco il comportamento predefinito del form (che ricaricherebbe la pagina) e raccolgo i dati del form.
           Perciò si usa una funzione asincrona per poter gestire l'invio dei dati al servizio FormSubmit e mostrare un messaggio di conferma all'utente.
           Inoltre, quest'ultima serve per poter gestire bene gli errori con l'utilizzo di un blocco try...catch */
        form.addEventListener("submit", async (e) => {
            e.preventDefault();   // Blocco del comportamento del form.
            const data = new FormData(form);   // Creazione di un oggetto FormData che raccoglie i dati del form (anche eventuali file) pronti per essere inviati tramite fetch.

            try {
                // Invio dati al servizio FormSubmit
                await fetch(form.action, {
                    method: "POST",
                    body: data
                });

                
                form.reset();   // Reset del form dopo l'invio per svuotare i campi e prepararlo per un eventuale nuovo messaggio.

                const originalText = headerText.textContent;   // Salvataggio del testo originale per poterlo ripristinare.

                
                headerText.textContent = "Messaggio inviato correttamente";   // Sostituzione del testo con il messaggio di conferma.

                // Stile CSS per rendere il messaggio più evidente.
                headerText.style.color = "lightgreen";
                headerText.style.marginTop = "20px";
                headerText.style.padding = "5px 15px";
                headerText.style.borderRadius = "25px";
                headerText.style.fontWeight = "bold";
                headerText.style.textAlign = "center";
                headerText.style.transition = "opacity 1s ease, transform 1s ease";
                headerText.style.opacity = "1";
                headerText.style.transform = "translateY(-20px)";

                // Animazione di comparsa del messaggio con fade-in e movimento verso il basso.
                setTimeout(() => {
                    headerText.style.opacity = "1";
                    headerText.style.transform = "translateY(0)";
                }, 500);
            // Dopo 4 secondi ripristino il testo originale con fade-out.
            setTimeout(() => {
                headerText.style.opacity = "0";
                headerText.style.transform = "translateY(-20px)";

                // Aspettiamo che la transizione di 1 secondo finisca davvero
                // prima di cambiare di nuovo il testo e farlo riapparire.
                setTimeout(() => {
                    headerText.textContent = originalText;
                    headerText.style.opacity = "1";
                    headerText.style.transform = "translateY(0)";
                    headerText.style.backgroundColor = "";
                    headerText.style.color = "";
                    headerText.style.padding = "";
                    headerText.style.borderRadius = "";
                    headerText.style.fontWeight = "";
                    headerText.style.fontStyle = "";
                    headerText.style.textAlign = "";
                }, 1000);

            }, 4000);

            } catch (err) {
                alert("❌ Errore nell'invio del messaggio");
            }
        });
    }
});
