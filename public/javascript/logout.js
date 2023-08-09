// Function to handle the logout action.
async function logout() {
    // Send a POST request to the '/api/users/logout' endpoint to log out the user.
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check if the response status is OK (200).
    if (response.ok) {
        // Redirect the user to the homepage after logging out.
        document.location.replace('/');
    } else {
        // Display an alert with the response status text in case of an error.
        alert(response.statusText);
    }
}

// Add an event listener to the logout button's click event.
document.querySelector('#logout').addEventListener('click', logout);