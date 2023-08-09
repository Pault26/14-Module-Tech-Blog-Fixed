// Function to handle the login form submission.
async function loginFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior.

    // Get the values of the username and password input fields.
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Check if both username and password are provided.
    if (username && password) {
        // Send a POST request to the '/api/users/login' endpoint to authenticate the user.
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the response status is OK (200).
        if (response.ok) {
            // Redirect the user to the dashboard page after successful login.
            document.location.replace('/dashboard');
        } else {
            // Display an alert with the response status text in case of an error.
            alert(response.statusText);
        }
    }
}

// Add an event listener to the login form's submission.
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);