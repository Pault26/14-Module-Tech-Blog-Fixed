// Function to handle submitting a new post.
async function newFormHandler(event) {
    event.preventDefault(); // Prevent the default behavior of the form submission.

    // Get the values of the new post's title and content input fields.
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    // Send a POST request to the '/api/posts' endpoint to create a new post.
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check if the response status is OK (200).
    if (response.ok) {
        // Redirect the user to the dashboard page after successfully creating the new post.
        document.location.replace('/dashboard');
    } else {
        // Display an alert with the response status text in case of an error.
        alert(response.statusText);
    }
}

// Add an event listener to the new post form's submission.
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);