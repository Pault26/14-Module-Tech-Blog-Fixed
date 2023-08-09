// Function to handle the signup form submission.
async function signupFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior.

    // Get the values of the username and password input fields.
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Check if both username and password are provided.
    if (username && password) {
        // Send a POST request to the '/api/users' endpoint to create a new user.
        const response = await fetch('/api/users', {
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
            // Redirect the user to the dashboard page.
            document.location.replace('/dashboard');
        } else {
            // Display an alert with the response status text in case of an error.
            alert(response.statusText);
        }
    }
}

// Add an event listener to the signup form's submission.
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);