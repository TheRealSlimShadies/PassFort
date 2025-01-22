const API_BASE_URL = 'http://localhost:8000';

async function checkAuthStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/authenticated/`, {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            showLabelsContainer();
            fetchVaultLabels();
        } else {
            showLoginContainer();
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
        showLoginContainer();
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/login/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            showLabelsContainer();
            fetchVaultLabels();
        } else {
            document.getElementById('loginError').textContent = 'Invalid credentials';
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('loginError').textContent = 'Connection error';
    }
}

async function fetchVaultLabels() {
    try {
        const response = await fetch(`${API_BASE_URL}/vault/labels/`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const labels = await response.json();
            displayLabels(labels);
        } else if (response.status === 401) {
            // Try to refresh the token
            const refreshResponse = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
                method: 'POST',
                credentials: 'include'
            });
            
            if (refreshResponse.ok) {
                // Try fetching labels again after successful refresh
                return fetchVaultLabels();
            } else {
                showLoginContainer();
            }
        }
    } catch (error) {
        console.error('Error fetching labels:', error);
    }
}

async function fetchCredentials(labelName) {
    try {
        const response = await fetch(`${API_BASE_URL}/vault/labels/${labelName}/credentials/`, {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const credentials = await response.json();
            displayCredentials(labelName, credentials);
        } else if (response.status === 401) {
            // Try to refresh the token
            const refreshResponse = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
                method: 'POST',
                credentials: 'include'
            });
            
            if (refreshResponse.ok) {
                // Try fetching credentials again after successful refresh
                return fetchCredentials(labelName);
            } else {
                showLoginContainer();
            }
        }
    } catch (error) {
        console.error('Error fetching credentials:', error);
    }
}

function showLoginContainer() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('labelsContainer').style.display = 'none';
    document.getElementById('credentialsContainer').style.display = 'none';
}

function showLabelsContainer() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('labelsContainer').style.display = 'block';
    document.getElementById('credentialsContainer').style.display = 'none';
}

function displayLabels(labels) {
    const labelsList = document.getElementById('labelsList');
    labelsList.innerHTML = '';
    
    labels.forEach(label => {
        const div = document.createElement('div');
        div.className = 'label-item';
        div.textContent = label.name;
        
        div.addEventListener('click', () => {
            fetchCredentials(label.name);
        });
        
        labelsList.appendChild(div);
    });
}

function displayCredentials(labelName, credentials) {
    document.getElementById('selectedLabelName').textContent = `${labelName} Credentials`;
    const credentialsList = document.getElementById('credentialsList');
    credentialsList.innerHTML = '';
    
    credentials.forEach(cred => {
        const div = document.createElement('div');
        div.className = 'credential-item';
        div.innerHTML = `
            Username: ${cred.username}<br>
            Password: <span class="password-text">••••••••</span>
            <button class="show-password" data-password="${cred.password}">Show</button>
            <button class="use-credentials">USE</button>
        `;
        
        // Show/Hide Password Button
        div.querySelector('.show-password').addEventListener('click', function () {
            const passwordText = div.querySelector('.password-text');
            if (this.textContent === 'Show') {
                passwordText.textContent = this.dataset.password; // Decrypted password from the backend
                this.textContent = 'Hide';
            } else {
                passwordText.textContent = '••••••••';
                this.textContent = 'Show';
            }
        });
        
        div.querySelector('.use-credentials').addEventListener('click', () => {
            const credentials = {
                username: cred.username,
                password: cred.password
            };

            // Send message to content.js to autofill the credentials
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { type: 'AUTOFILL_CREDENTIALS', credentials });
            });
        });

        credentialsList.appendChild(div);
    });
    
    document.getElementById('labelsContainer').style.display = 'none';
    document.getElementById('credentialsContainer').style.display = 'block';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    document.getElementById('backToLabels').addEventListener('click', () => {
        document.getElementById('labelsContainer').style.display = 'block';
        document.getElementById('credentialsContainer').style.display = 'none';
    });
});
