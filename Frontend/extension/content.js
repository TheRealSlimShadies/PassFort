// This function will inject the credentials into the form fields
function autofillCredentials(credentials) {
    const emailField = document.querySelector('#text, [type="text"]');
    const passwordField = document.querySelector('#password, [type="password"]');
    
    if (emailField && credentials.username) {
        emailField.value = credentials.username; // Set the username
    }

    if (passwordField && credentials.password) {
        passwordField.value = credentials.password; // Set the password
        passwordField.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
    }
}

// Listen for messages sent from popup.js to inject credentials
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'AUTOFILL_CREDENTIALS') {
        autofillCredentials(request.credentials);
    }
});
