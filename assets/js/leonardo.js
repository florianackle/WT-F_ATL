document.addEventListener('DOMContentLoaded', function() {
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');
    var messageInput = document.getElementById('message');
    var submitButton = document.getElementById('submit-button');
    var contactForm = document.getElementById('contact-form');
    var agbCheckbox = document.getElementById('agb');
    var countryCodeSelect = document.getElementById('country-code');

    function validateEmail() {
        var emailValue = emailInput.value;
        var emailValid = emailInput.checkValidity();
        var emailError = document.getElementById('emailError');
    
        if (!emailValid) {
            if (!emailValue.includes('@')) {
                emailError.textContent = 'Die E-Mail-Adresse muss ein @-Zeichen enthalten.';
            } else {
                emailError.textContent = 'Ungültige E-Mail-Adresse';
            }
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
        return emailValid;
    }

    function validatePhone() {
        var phoneValid = /^[\d\s\-()+]{9,15}$/.test(phoneInput.value);
        document.getElementById('phoneError').style.display = phoneValid ? 'none' : 'block';
        return phoneValid;
    }

    function validateMessage() {
        var messageValid = messageInput.value.trim() !== '';
        document.getElementById('messageError').style.display = messageValid ? 'none' : 'block';
        return messageValid;
    }

    function updateSubmitButtonState() {
        submitButton.disabled = !(validateEmail() && validatePhone() && validateMessage() && agbCheckbox.checked);
    }

    function updatePhonePrefix() {
        var selectedPrefix = countryCodeSelect.value;
        var currentPhoneValue = phoneInput.value;

        // Entfernen Sie die alte Vorwahl, falls vorhanden
        var phoneWithoutPrefix = currentPhoneValue.replace(/^(\+\d{2,3})?/, '');
        phoneInput.value = selectedPrefix + phoneWithoutPrefix;
    }

    emailInput.addEventListener('blur', function() {
        validateEmail();
        updateSubmitButtonState();
    });

    phoneInput.addEventListener('blur', function() {
        validatePhone();
        updateSubmitButtonState();
    });

    messageInput.addEventListener('blur', function() {
        validateMessage();
        updateSubmitButtonState();
    });

    agbCheckbox.addEventListener('change', updateSubmitButtonState);

    countryCodeSelect.addEventListener('change', updatePhonePrefix);

    // Stellen Sie sicher, dass die Vorwahl beim Start eingefügt wird
    updatePhonePrefix();

    function disableFormInputs() {
        emailInput.disabled = true;
        phoneInput.disabled = true;
        messageInput.disabled = true;
        countryCodeSelect.disabled = true;
        agbCheckbox.disabled = true; // Deaktiviert die AGB-Checkbox
        document.getElementById('newsletter').disabled = true; // Deaktiviert die Newsletter-Checkbox
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite

        if (validateEmail() && validatePhone() && validateMessage() && agbCheckbox.checked) {
            // Hier können Sie Code hinzufügen, um die Daten zu senden, z.B. mit AJAX

            // Ändern des Button-Textes und der Farbe nach dem "Senden"
            submitButton.textContent = 'Gesendet';
            submitButton.style.backgroundColor = '#4CAF50';
            submitButton.disabled = true; // Optional: Button deaktivieren

            // Deaktivieren der Formularfelder
            disableFormInputs();
        }
    });

});
