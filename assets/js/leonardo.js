// Warten Sie, bis das DOM (Document Object Model) vollständig geladen ist
document.addEventListener('DOMContentLoaded', function () {
    // Erfassen Sie die HTML-Elemente, die Sie benötigen
    var emailInput = document.getElementById('email'); // Das E-Mail-Eingabefeld
    var phoneInput = document.getElementById('phone'); // Das Telefonnummer-Eingabefeld
    var messageInput = document.getElementById('message'); // Das Nachrichten-Eingabefeld
    var submitButton = document.getElementById('submit-button'); // Der Absende-Button
    var contactForm = document.getElementById('contact-form'); // Das Kontaktformular
    var agbCheckbox = document.getElementById('agb'); // Die AGB-Checkbox
    var countryCodeSelect = document.getElementById('country-code'); // Die Ländervorwahl-Auswahl

    // Funktion zur Überprüfung der E-Mail-Adresse
    function validateEmail() {
        var emailValue = emailInput.value; // Den E-Mail-Wert erfassen
        var emailValid = emailInput.checkValidity(); // Überprüfen, ob die E-Mail gültig ist
        var emailError = document.getElementById('emailError'); // Das Fehlermeldungs-Element für die E-Mail

        if (!emailValid) {
            if (!emailValue.includes('@')) {
                emailError.textContent = 'Die E-Mail-Adresse muss ein @-Zeichen enthalten.';
            } else {
                emailError.textContent = 'Ungültige E-Mail-Adresse';
            }
            emailError.style.display = 'block'; // Fehlermeldung anzeigen
        } else {
            emailError.style.display = 'none'; // Fehlermeldung ausblenden, wenn die E-Mail gültig ist
        }
        return emailValid; // Gibt zurück, ob die E-Mail gültig ist oder nicht
    }

    // Funktion zur Überprüfung der Telefonnummer
    function validatePhone() {
        var phoneValid = /^[\d\s\-()+]{9,15}$/.test(phoneInput.value); // Regulärer Ausdruck für gültige Telefonnummern
        document.getElementById('phoneError').style.display = phoneValid ? 'none' : 'block'; // Fehlermeldung anzeigen/ausblenden
        return phoneValid; // Gibt zurück, ob die Telefonnummer gültig ist oder nicht
    }

    // Funktion zur Überprüfung der Nachricht
    function validateMessage() {
        var messageValid = messageInput.value.trim() !== ''; // Überprüfen, ob die Nachricht nicht leer ist
        document.getElementById('messageError').style.display = messageValid ? 'none' : 'block'; // Fehlermeldung anzeigen/ausblenden
        return messageValid; // Gibt zurück, ob die Nachricht gültig ist oder nicht
    }

    // Funktion zur Aktualisierung des Absende-Button-Zustands
    function updateSubmitButtonState() {
        submitButton.disabled = !(validateEmail() && validatePhone() && validateMessage() && agbCheckbox.checked);
        // Der Button wird deaktiviert, wenn eine der Bedingungen nicht erfüllt ist
    }

    // Funktion zur Aktualisierung der Ländervorwahl
    function updatePhonePrefix() {
        var selectedPrefix = countryCodeSelect.value; // Die ausgewählte Vorwahl
        var currentPhoneValue = phoneInput.value; // Die aktuelle Telefonnummer

        // Entfernen Sie die alte Vorwahl, falls vorhanden
        var phoneWithoutPrefix = currentPhoneValue.replace(/^(\+\d{2,3})?/, '');
        phoneInput.value = selectedPrefix + phoneWithoutPrefix; // Fügen Sie die ausgewählte Vorwahl hinzu
    }

    // Ereignishandler für das E-Mail-Eingabefeld (Verlassen des Feldes)
    emailInput.addEventListener('blur', function () {
        validateEmail(); // E-Mail überprüfen
        updateSubmitButtonState(); // Aktualisieren Sie den Button-Zustand
    });

    // Ereignishandler für das Telefonnummer-Eingabefeld (Verlassen des Feldes)
    phoneInput.addEventListener('blur', function () {
        validatePhone(); // Telefonnummer überprüfen
        updateSubmitButtonState(); // Aktualisieren Sie den Button-Zustand
    });

    // Ereignishandler für das Nachrichten-Eingabefeld (Verlassen des Feldes)
    messageInput.addEventListener('blur', function () {
        validateMessage(); // Nachricht überprüfen
        updateSubmitButtonState(); // Aktualisieren Sie den Button-Zustand
    });

    // Ereignishandler für die Änderung der AGB-Checkbox
    agbCheckbox.addEventListener('change', updateSubmitButtonState);

    // Ereignishandler für die Änderung der Ländervorwahl
    countryCodeSelect.addEventListener('change', updatePhonePrefix);

    // Stellen Sie sicher, dass die Vorwahl beim Start eingefügt wird
    updatePhonePrefix();

    // Funktion zum Deaktivieren der Formularfelder nach dem Absenden
    function disableFormInputs() {
        emailInput.disabled = true;
        phoneInput.disabled = true;
        messageInput.disabled = true;
        countryCodeSelect.disabled = true;
        agbCheckbox.disabled = true; // Deaktiviert die AGB-Checkbox
        document.getElementById('newsletter').disabled = true; // Deaktiviert die Newsletter-Checkbox
    }

    // Ereignishandler für das Absenden des Kontaktformulars
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite bei Absenden

        if (validateEmail() && validatePhone() && validateMessage() && agbCheckbox.checked) {
            // Hier können Sie Code hinzufügen, um die Daten zu senden, z.B. mit AJAX

            // Ändern des Button-Textes und der Farbe nach dem "Senden"
            submitButton.textContent = 'Gesendet';
            submitButton.style.backgroundColor = '#4CAF50'; // Grüne Hintergrundfarbe
            submitButton.disabled = true; // Optional: Button deaktivieren

            // Deaktivieren der Formularfelder
            disableFormInputs();
        }
    });

});
