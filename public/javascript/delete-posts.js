// Function to handle the delete post action.
async function deleteFormHandler(event) {
    event.preventDefault(); // Prevent the default behavior of the click event.

    // Get the post ID from the URL.
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Send a DELETE request to the '/api/posts/${post_id}' endpoint to delete the post.
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    });

    // Check if the response status is OK (200).
    if (response.ok) {
        // Redirect the user to the dashboard page after successfully deleting the post.
        document.location.replace('/dashboard');
    } else {
        // Display an alert with the response status text in case of an error.
        alert(response.statusText);
    }
}

// Add an event listener to the delete post button's click event.
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);