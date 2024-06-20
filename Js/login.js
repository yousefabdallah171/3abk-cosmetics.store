function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        // Show "Please fill out this field" message for empty fields
        var form = document.getElementById("loginForm");
        form.reportValidity();
    } else {
        // Handle login logic here (e.g., submit form via AJAX)
        alert("Logging in...");
        // Replace with your login logic, like AJAX request to authenticate user
    }
}

function loginWithFacebook() {
    // Mock function for logging in with Facebook
    alert("Logging in with Facebook...");
}

function loginWithGoogle() {
  
    var redirectUri = 'http://localhost:3000/oauth2callback'; // Replace with your actual redirect URI

    var authUrl = 'https://accounts.google.com/o/oauth2/auth?' +
        'response_type=code&' +
        'client_id=' + clientId + '&' +
        'redirect_uri=' + encodeURIComponent(redirectUri) + '&' +
        'scope=profile email';

    // Open Google OAuth login popup
    var popupWindow = window.open(authUrl, '_blank', 'width=600,height=600');

    // Handle popup window close event to check for login success
    window.addEventListener('message', function (event) {
        if (event.origin === window.location.origin && event.data.type === 'google-oauth-response') {
            // Handle Google OAuth response here
            var authCode = event.data.code;
            exchangeCodeForToken(authCode);
            popupWindow.close();
        }
    });
}

function exchangeCodeForToken(code) {
    // Example of how you can exchange the authorization code for an access token
    // This step typically requires server-side code to securely exchange code for tokens
    // and authenticate the user. Below is just an example of how it might work.


    var clientSecret = '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';
    var redirectUri = 'http://localhost:3000/oauth2callback'; // Replace with your actual redirect URI

    var tokenEndpoint = 'https://oauth2.googleapis.com/token';

    var formData = new FormData();
    formData.append('code', code);
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('redirect_uri', redirectUri);
    formData.append('grant_type', 'authorization_code');

    fetch(tokenEndpoint, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Handle token response
            console.log(data);
            // Example: store access token securely and proceed with user authentication
        })
        .catch(error => {
            console.error('Error exchanging code for token:', error);
        });
}


// Function to validate form on submit
function validateForm(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example: Check credentials (you should implement your own secure authentication)
    if (username === 'admin' && password === 'admin') {
        // Set a flag or token indicating admin is logged in
        localStorage.setItem('isAdminLoggedIn', 'true');
        // Redirect to admin dashboard
        window.location.href = 'admin_dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Function for handling login with Facebook (dummy function for example)
function loginWithFacebook() {
    alert('Logging in with Facebook (dummy function for example)');
}

// Function for handling login with Google (dummy function for example)
function loginWithGoogle() {
    alert('Logging in with Google (dummy function for example)');
}
